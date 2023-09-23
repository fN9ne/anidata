import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { authorizeUserAction } from "./redux/reducers";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Auth from "./pages/Auth/Auth";
import List from "./pages/List/List";
import Logout from "./components/Modal/Logout";
import Catalog from "./pages/Catalog/Catalog";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./layouts/AppLayout";

const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutActive = useSelector((state) => state.modal.logoutActive);

	useEffect(() => {
		const userdata = JSON.parse(localStorage.getItem("user"));

		if (userdata) {
			dispatch(authorizeUserAction({ username: userdata.username, content: userdata.content }));
		} else {
			navigate("/auth");
		}
	}, []);

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
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
			<AnimatePresence mode="wait" initial={false}>
				{logoutActive && <Logout />}
			</AnimatePresence>
		</main>
	);
};

export default App;
