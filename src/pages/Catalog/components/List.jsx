import { useSelector } from "react-redux";
import ListItem from "./ListItem";

const List = ({ interactiveFilterChange }) => {
	const { result } = useSelector((state) => state.catalog);

	return (
		<div className="catalog__track">
			{result.map((item, key) => (
				<ListItem interactiveFilterChange={interactiveFilterChange} data={item} key={key} />
			))}
		</div>
	);
};

export default List;
