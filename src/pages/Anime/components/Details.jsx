import DetailsItem from "./DetailsItem";

import { months } from "../../../functions";
import { useSelector } from "react-redux";

const Details = () => {
	const data = useSelector((state) => state.anime.data);

	const setStatus = (status) => {
		switch (status) {
			case "Finished Airing":
				return "Finished";
			case "Currently Airing":
				return "Ongoing";
			case "Not yet aired":
				return "Upcoming";
			default:
				return "?";
		}
	};

	const getDate = ({ day, month, year }) => {
		if (day !== null && month !== null && year !== null) {
			return `${day} ${months(month)} ${year}`;
		} else {
			return "?";
		}
	};

	const genres = [...data.genres, ...data.themes, ...data.demographics];

	const list = [
		{ label: "Episodes", value: data.episodes ? data.episodes : "?" },
		{ label: "Status", value: setStatus(data.status) },
		{ label: "Start date", value: getDate(data.aired.prop.from) },
		{ label: "End date", value: getDate(data.aired.prop.to) },
		{ label: "Source", value: data.source ? data.source : "?" },
		{ label: "Rating", value: data.rating ? data.rating : "?" },
		{
			label: "Studios",
			value: data.studios.length !== 0 ? [data.studios.map((studio) => studio.name)] : "?",
		},
		{ label: "Genres", value: genres.length !== 0 ? genres.map((genre) => genre.name) : ["?"] },
	];

	return (
		<ul className="anime-details">
			{list.map((item, key) => (
				<DetailsItem key={key} label={item.label} value={item.value} />
			))}
		</ul>
	);
};

export default Details;
