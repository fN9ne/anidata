import "./Anime.scss";

import Loader from "../../components/Loader/Loader";
import Content from "./components/Content";

import { useParams } from "react-router-dom";
import { getAnime } from "../../functions";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { setAnimeAction } from "../../redux/reducers";
import { opacity } from "../../animations";
import { AnimatePresence, motion } from "framer-motion";

const Anime = () => {
	const [fetching, setFetching] = useState(true);

	const dispatch = useDispatch();

	const params = useParams();

	useEffect(() => {
		getAnime(params.id)
			.then((response) => dispatch(setAnimeAction(response.data)))
			.finally(() => setTimeout(() => setFetching(false), 350));
	}, []); // eslint-disable-line

	return (
		<div className="anime">
			<AnimatePresence mode="wait" initial={false}>
				{fetching && (
					<motion.div key="loader" className="anime__loader" {...opacity}>
						<Loader condition={fetching} />
					</motion.div>
				)}
				{!fetching && (
					<motion.div key="content" className="anime__container" {...opacity}>
						<Content />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Anime;
