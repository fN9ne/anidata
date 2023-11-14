import { useSelector } from "react-redux";

const Synopsis = () => {
	const data = useSelector((state) => state.anime.data);

	const synopsis = data.synopsis ? [data.synopsis.trim().split("\n\n")[0]] : ["Synopsis not found c:"];
	return (
		<div className="anime__synopsis">
			{synopsis.map((paragraph, key) => (
				<p key={key}>{paragraph}</p>
			))}
		</div>
	);
};

export default Synopsis;
