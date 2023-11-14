import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { authorizeUserAction, catalogActions, closeAllModalsAction, resetYourAnimeState, togglePending } from "./redux/reducers";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth/Auth";
import List from "./pages/List/List";
import Logout from "./components/Modal/Logout";
import Catalog from "./pages/Catalog/Catalog";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./layouts/AppLayout";
import { api } from "./functions";
import RemoveAnime from "./components/Modal/RemoveAnime";
import Anime from "./pages/Anime/Anime";

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutActive = useSelector((state) => state.modal.logoutActive);
	const removeAnimeActive = useSelector((state) => state.modal.removeAnimeActive);

	const { username, pending, content } = useSelector((state) => state.user);

	const [controller, setController] = useState(null);

	useEffect(() => {
		const userdata = JSON.parse(localStorage.getItem("user"));

		if (userdata) {
			dispatch(authorizeUserAction({ username: userdata.username, content: userdata.content }));
		} else {
			navigate("/auth");
		}
	}, []); // eslint-disable-line

	useEffect(() => {
		const close = (event) => {
			if (event.keyCode === 27) {
				dispatch(closeAllModalsAction());
				dispatch(catalogActions.closeSelectboxes);
			}
		};

		document.body.addEventListener("keydown", close);

		return () => document.body.removeEventListener("keydown", close);
	}, []); // eslint-disable-line

	useEffect(() => {
		window.onbeforeunload = pending ? () => false : null;

		if (pending) {
			if (controller) {
				controller.abort();
			}

			const newController = new AbortController();
			setController(newController);

			api("GET", undefined, newController.signal)
				.then((response) => {
					const users = response.record.filter((user) => user.username !== username);
					const currentUser = response.record.filter((user) => user.username === username)[0];

					const body = [
						...users,
						{
							...currentUser,
							content: content,
						},
					];

					api("PUT", body).finally(() => {
						setController(null);
						dispatch(togglePending(false));
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [pending, content]); // eslint-disable-line

	return (
		<main className="content">
			<AnimatePresence mode="wait" initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Navigate to="auth" />} />
					<Route path="auth" element={<Auth />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<Navigate to="list" />} />
						<Route path="list" element={<List />} />
						<Route path="catalog" element={<Catalog />} />
						<Route path="anime/:id" element={<Anime />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
			<AnimatePresence mode="wait" initial={false}>
				{logoutActive && <Logout />}
			</AnimatePresence>
			<AnimatePresence mode="wait" initial={false}>
				{removeAnimeActive && <RemoveAnime />}
			</AnimatePresence>
		</main>
	);
};

export default App;
