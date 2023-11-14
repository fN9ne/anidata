import "./Catalog.scss";

import List from "./components/List";
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import Statusbar from "../../components/Statusbar/Statusbar";
import CatalogFilter from "../../components/Filter/CatalogFilter";
import CatalogPagination from "./components/CatalogPagination";
import NotFound from "./components/NotFound";

import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { catalogActions } from "../../redux/reducers";
import { useEffect, useState } from "react";
import { anidb, genres, status } from "../../functions";
import { opacity } from "../../animations";

const Catalog = () => {
	const { page, result, search, filter, fetching } = useSelector((state) => state.catalog);

	const dispatch = useDispatch();

	const searchSubmit = (value) => dispatch(catalogActions.setSearch(value));

	const [isFilterChanged, setFilterChanged] = useState(false);
	const [isInteractiveFilterChanged, setInteractiveFilterChanged] = useState(false);

	const [firstLoad, setFirstLoad] = useState(false);

	const getResults = () => {
		dispatch(catalogActions.setFetching(true));
		anidb({
			search,
			page,
			genres: filter.genres.content.map((genre) => genres(genre)),
			type: filter.type.content,
			status: status(filter.status.content),
		})
			.then((response) => {
				dispatch(catalogActions.setResult(response.data));
				dispatch(catalogActions.setMaxPages(response.pagination.last_visible_page));
				setFirstLoad(true);
			})
			.then(() => setTimeout(() => dispatch(catalogActions.setFetching(false)), 350));
	};

	useEffect(() => {
		if (result.length === 0) {
			getResults();
		} else {
			setFirstLoad(true);
		}
	}, []);

	useEffect(() => {
		if (isInteractiveFilterChanged) {
			getResults();
			dispatch(catalogActions.setPage(1));
			setInteractiveFilterChanged(false);
		}
	}, [isInteractiveFilterChanged]); // eslint-disable-line

	useEffect(() => {
		if (firstLoad) {
			getResults();
			dispatch(catalogActions.setPage(1));
		}
	}, [search]); // eslint-disable-line

	useEffect(() => {
		if (firstLoad) {
			getResults();
		}
	}, [page]);

	useEffect(() => {
		if (filter.active) {
			setFilterChanged(true);
		}
	}, [filter.genres.content, filter.type.content, filter.status.content]); // eslint-disable-line

	useEffect(() => {
		if (isFilterChanged) {
			getResults();
			setFilterChanged(false);
			dispatch(catalogActions.setPage(1));
		}
	}, [filter.active]); // eslint-disable-line

	return (
		<div className="catalog">
			<Search onSubmit={searchSubmit} />
			<Statusbar
				title="Catalog"
				activities={
					<CatalogFilter interactiveFilterChange={{ state: isInteractiveFilterChanged, setState: setInteractiveFilterChanged }} />
				}
				pagination={<CatalogPagination />}
			/>
			<AnimatePresence mode="wait" initial={false}>
				{fetching && (
					<motion.div {...opacity} transition={{ duration: 0.15 }} key="loader" className="catalog__loader">
						<Loader condition={fetching} />
					</motion.div>
				)}
				{!fetching && result.length !== 0 && (
					<motion.div className="catalog__list" {...opacity} transition={{ duration: 0.15 }} key="list">
						<List interactiveFilterChange={{ state: isInteractiveFilterChanged, setState: setInteractiveFilterChanged }} />
					</motion.div>
				)}
				{!fetching && result.length === 0 && (
					<motion.div className="catalog-notfound" {...opacity} transition={{ duration: 0.15 }} key="notfound">
						<NotFound />
					</motion.div>
				)}
			</AnimatePresence>
			<CatalogPagination />
		</div>
	);
};

export default Catalog;
