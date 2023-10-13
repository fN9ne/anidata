import { useDispatch } from "react-redux";
import { catalogActions } from "../../../redux/reducers";

import Emoji from "../../../img/icons/sad_emoji.png";

const NotFound = () => {
	const dispatch = useDispatch();

	const clear = () => dispatch(catalogActions.setSearch(""));

	return (
		<div className="catalog-notfound__content">
			<div className="catalog-notfound__status">
				<span>4</span>
				<img src={Emoji} alt="sad_emoji" />
				<span>4</span>
			</div>
			<div className="catalog-notfound__text">Unfortunately, nothing was found for your request.</div>
			<button onClick={clear} className="button button_lightblue">
				CLEAR
			</button>
		</div>
	);
};

export default NotFound;
