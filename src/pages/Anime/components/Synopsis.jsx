import { useSelector } from "react-redux";

const Synopsis = () => {
	const data = useSelector((state) => state.anime.data);

	const synopsis = [data.synopsis.trim().split("\n\n")[0]];
	return (
		<div className="anime__synopsis">
			{synopsis.map((paragraph, key) => (
				<p key={key}>{paragraph}</p>
			))}
		</div>
	);
};

export default Synopsis;
