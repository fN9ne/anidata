import "./List.scss";

import { ReactComponent as FullscreenIcon } from "../../img/icons/fullscreen.svg";

import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import Content from "./components/Content";
import Statusbar from "../../components/Statusbar/Statusbar";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	addYourAnimeDataAction,
	setYourAnimeDataAction,
	setYourAnimeFetchingAction,
	setYourAnimeSearchAction,
	toggleYourAnimeFullscreenAction,
} from "../../redux/reducers";

import { AnimatePresence, motion } from "framer-motion";

import { opacity } from "../../animations";
import { useNavigate } from "react-router-dom";

import Statistics from "./components/Statistics";
import ListFilter from "../../components/Filter/ListFilter";

const List = () => {
	const { fetching, data, filter } = useSelector((state) => state.yourAnime);
	const { content, loaded, authorized } = useSelector((state) => state.user);

	const ids = content.map((item) => item.id);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const searchSubmit = (value) => dispatch(setYourAnimeSearchAction(value));

	const [controller, setController] = useState(null);

	const fetchData = async (id) => {
		try {
			const newController = new AbortController();

			setController(newController);

			// await new Promise((resolve) => setTimeout(resolve, 350));
			const response = await fetch("https://api.jikan.moe/v4/anime/" + id, {
				signal: newController.signal,
			});

			if (response.ok) {
				const data = await response.json();

				return data.data;
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
	};

	const fetchDataForIds = async (ids) => {
		let noFetchedData = [];

		const fetchPromises = ids.map(async (id) => {
			if (data.some((item) => item.id === id) || noFetchedData.includes(id)) {
				return null;
			}

			const fetchedData = await fetchData(id);

			if (fetchedData) {
				dispatch(addYourAnimeDataAction(fetchedData));
			} else {
				noFetchedData.push(id);
			}
		});

		await Promise.all(fetchPromises);

		console.log(noFetchedData);

		if (noFetchedData.length > 0) {
			setTimeout(async () => {
				await fetchDataForIds(noFetchedData).then(() => {
					setTimeout(() => dispatch(setYourAnimeFetchingAction(false)), 350);
				});
			}, 2000);
		} else {
			setTimeout(() => dispatch(setYourAnimeFetchingAction(false)), 350);
		}
	};

	useEffect(() => {
		if (!authorized && controller) {
			controller.abort();
		}
	}, [authorized]);

	useEffect(() => {
		dispatch(setYourAnimeFetchingAction(true));

		if (content.length > 0 && data.length !== content.length) {
			if (data.length === 0) {
				fetchDataForIds(ids);
			} else {
				const idsInData = data.map((item) => item.mal_id);
				const idsForFetch = ids.filter((item) => !idsInData.includes(item));
				fetchDataForIds(idsForFetch);
			}
		}

		if (data.length > content.length) {
			const newData = data.filter((item) => ids.includes(item.mal_id));
			dispatch(setYourAnimeDataAction(newData));
		}

		setTimeout(() => {
			if (content.length === 0 && loaded) {
				dispatch(setYourAnimeFetchingAction(false));
			}
		}, 100);
	}, [content]); // eslint-disable-line

	return (
		<div className="animelist">
			<Search onSubmit={searchSubmit} />
			<Statistics />
			<Statusbar
				title="Your anime"
				activities={
					<>
						<ListFilter />
						<button onClick={() => dispatch(toggleYourAnimeFullscreenAction(true))} className="statusbar__fullscreen">
							<FullscreenIcon />
						</button>
					</>
				}
			/>
			<AnimatePresence mode="wait" initial={false}>
				{fetching && (
					<motion.div key="loader" className="animelist-loader" {...opacity}>
						<div className="animelist-loader__text">
							Anime uploaded{" "}
							<span>
								{data.length}/{content.length}
							</span>
						</div>
						<div className="animelist-loader__bar">
							<div className="animelist-loader__line" style={{ width: `${data.length / (content.length / 100)}%` }}></div>
						</div>
					</motion.div>
				)}
				{!fetching && content.length !== 0 && (
					<motion.div key="content" className="animelist__content" {...opacity}>
						<Content />
					</motion.div>
				)}
				{!fetching && content.length === 0 && (
					<motion.div key="content" className="animelist__empty" {...opacity}>
						<div>So far, your anime list is empty, to replenish it, rather go to the catalog!</div>
						<button onClick={() => navigate("/app/catalog")} className="button button_lightblue">
							OPEN CATALOG
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default List;
