import { useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../img/icons/search.svg";

import "./Search.scss";
import { useEffect, useState } from "react";

const Search = ({ onSubmit }) => {
	const { search } = useSelector((state) => state.catalog);

	const [value, setValue] = useState(search);

	useEffect(() => {
		setValue(search);
	}, [search]);

	return (
		<form
			action="#"
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit(event.target.search.value);
			}}
			className="search"
		>
			<input
				type="text"
				name="search"
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
				}}
				onBlur={(event) => onSubmit(event.target.value)}
				placeholder="Type anywhere to search"
				className="search__input"
			/>
			<button className="search__submit">
				<SearchIcon />
			</button>
		</form>
	);
};

export default Search;
