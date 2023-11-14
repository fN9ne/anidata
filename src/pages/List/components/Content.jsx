import Item from "./Item";

import { useSelector } from "react-redux";

const Content = () => {
	const { data } = useSelector((state) => state.yourAnime);

	return (
		<div className="animelist__track">
			{data.map((item, key) => (
				<Item key={key} data={item} />
			))}
		</div>
	);
};

export default Content;
