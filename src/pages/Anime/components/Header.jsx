import { useSelector } from "react-redux";

const Header = () => {
	const data = useSelector((state) => state.anime.data);

	const setTypeClassName = (type) => {
		switch (type) {
			case null:
				return "type_blank";
			default:
				return "type_" + type.toLowerCase();
		}
	};

	const setTypeText = (type) => {
		switch (type) {
			case null:
				return "?";
			case "Movie":
				return "MOV";
			case "Special":
				return "SP";
			case "Music":
				return "MUS";
			default:
				return type;
		}
	};

	return (
		<div className="anime__header">
			<div>
				<div className={`anime__type type ${setTypeClassName(data.type)}`}>{setTypeText(data.type)}</div>
				<h2 title={data.title_english ? data.title_english : data.title}>
					{data.title_english ? data.title_english : data.title}
				</h2>
			</div>
			<div>
				<h4 title={data.title}>{data.title}</h4>
			</div>
		</div>
	);
};

export default Header;
