import { useDispatch, useSelector } from "react-redux";
import {
	yourAnimeClearFilter,
	yourAnimeCloseSelectboxes,
	yourAnimeGenresSelectbox,
	yourAnimeSetGenres,
	yourAnimeSetStatus,
	yourAnimeSetType,
	yourAnimeStatusSelectbox,
	yourAnimeTypeSelectbox,
} from "../../redux/reducers";

import Layout from "./Layout";
import FilterItem from "./FilterItem";

import { genres, status, types } from "../../functions";

const ListFilter = () => {
	const dispatch = useDispatch();
	const filterState = useSelector((state) => state.yourAnime.filter);

	const closeSelectboxes = (event) => {
		if (!event.target.closest(".selectbox")) {
			dispatch(yourAnimeCloseSelectboxes());
		}
	};
	const clearFilter = () => {
		dispatch(yourAnimeClearFilter());
	};

	return (
		<Layout onClick={(event) => closeSelectboxes(event)} clear={clearFilter}>
			<FilterItem
				title="Genres"
				list={genres()}
				value={filterState.genres.content}
				onItemClick={(value) => dispatch(yourAnimeSetGenres(value))}
				selectbox={{
					isSelectboxActive: filterState.genres.active,
					setSelectboxActive: (value) => dispatch(yourAnimeGenresSelectbox(value)),
				}}
			/>
			<FilterItem
				title="Type"
				list={types()}
				value={filterState.type.content}
				onItemClick={(value) => dispatch(yourAnimeSetType(value))}
				selectbox={{
					isSelectboxActive: filterState.type.active,
					setSelectboxActive: (value) => dispatch(yourAnimeTypeSelectbox(value)),
				}}
			/>
			<FilterItem
				title="Status"
				list={status()}
				value={filterState.status.content}
				onItemClick={(value) => dispatch(yourAnimeSetStatus(value))}
				selectbox={{
					isSelectboxActive: filterState.status.active,
					setSelectboxActive: (value) => dispatch(yourAnimeStatusSelectbox(value)),
				}}
			/>
		</Layout>
	);
};

export default ListFilter;
