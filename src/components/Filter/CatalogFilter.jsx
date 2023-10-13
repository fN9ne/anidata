import Layout from "./Layout";
import FilterItem from "./FilterItem";
import { useDispatch, useSelector } from "react-redux";
import { catalogActions } from "../../redux/reducers";
import { genres, status, types } from "../../functions";

const CatalogFilter = ({ interactiveFilterChange }) => {
	const dispatch = useDispatch();

	const filterState = useSelector((state) => state.catalog.filter);

	const closeSelectboxes = (event) => {
		if (!event.target.closest(".selectbox")) {
			dispatch(catalogActions.closeSelectboxes());
		}
	};

	const clearFilter = () => {
		dispatch(catalogActions.clearFilter());
		interactiveFilterChange.setState(true);
	};

	return (
		<Layout onClick={(event) => closeSelectboxes(event)} clear={clearFilter}>
			<FilterItem
				title="Genres"
				list={genres()}
				value={filterState.genres.content}
				onItemClick={(value) => dispatch(catalogActions.toggleGenre(value))}
				selectbox={{
					isSelectboxActive: filterState.genres.active,
					setSelectboxActive: (value) => dispatch(catalogActions.toggleGenresSelectbox(value)),
				}}
			/>
			<FilterItem
				title="Type"
				list={types()}
				value={filterState.type.content}
				onItemClick={(value) => dispatch(catalogActions.setType(value))}
				selectbox={{
					isSelectboxActive: filterState.type.active,
					setSelectboxActive: (value) => dispatch(catalogActions.toggleTypeSelectbox(value)),
				}}
			/>
			<FilterItem
				title="Status"
				list={status()}
				value={filterState.status.content}
				onItemClick={(value) => dispatch(catalogActions.setStatus(value))}
				selectbox={{
					isSelectboxActive: filterState.status.active,
					setSelectboxActive: (value) => dispatch(catalogActions.toggleStatusSelectbox(value)),
				}}
			/>
		</Layout>
	);
};

export default CatalogFilter;
