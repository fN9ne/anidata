import { useSelector } from "react-redux";

const Trailer = () => {
	const data = useSelector((data) => data.anime.data);

	return (
		data.trailer.embed_url && (
			<div className="anime-trailer">
				<h2>Trailer</h2>
				<div className="anime-trailer__body">
					<iframe
						src={data.trailer.embed_url}
						title="YouTube video player"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe>
				</div>
			</div>
		)
	);
};

export default Trailer;
