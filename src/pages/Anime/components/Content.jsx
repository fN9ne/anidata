import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../../img/icons/back.svg";

import Header from "./Header";
import Details from "./Details";
import Synopsis from "./Synopsis";
import Trailer from "./Trailer";
import { setAnimeToRemove, toggleAnime, togglePending, toggleRemoveAnimeModalAction } from "../../../redux/reducers";

const Content = () => {
	const data = useSelector((state) => state.anime.data);
	const { content } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isAnimeAdded = content.map((item) => item.id).includes(data.mal_id);

	const handleToggleAnime = () => {
		if (!isAnimeAdded) {
			dispatch(toggleAnime(data.mal_id));
			dispatch(togglePending(true));
		} else {
			dispatch(setAnimeToRemove({ name: data.title_english ? data.title_english : data.title, id: data.mal_id }));
			dispatch(toggleRemoveAnimeModalAction(true));
		}
	};

	return (
		<>
			<div onClick={() => navigate(-1)} className="anime__back">
				<BackIcon />
				<span>Go back</span>
			</div>
			<div className="anime__wrapper">
				<div className="anime__content">
					<div className="anime__main">
						<div className="anime__image">
							<img src={data.images.webp.large_image_url} alt="anime poster" />
						</div>
						<div className="anime__body">
							<Header />
							<Trailer />
							<Details />
							<Synopsis />
							<div className="anime__buttons">
								<button onClick={handleToggleAnime} className={`button ${!isAnimeAdded ? "button_lightblue" : "button_red"}`}>
									{!isAnimeAdded ? "ADD YO YOUR ANIME" : "REMOVE FROM YOUR ANIME"}
								</button>
								<button onClick={() => navigate("/app/list")} className="button">
									YOUR ANIME
								</button>
							</div>
						</div>
					</div>
					<div className="anime__body">
						<Header />
						<Details />
						<Synopsis />
						<div className="anime__buttons">
							<button onClick={handleToggleAnime} className={`button ${!isAnimeAdded ? "button_lightblue" : "button_red"}`}>
								{!isAnimeAdded ? "ADD YO YOUR ANIME" : "REMOVE FROM YOUR ANIME"}
							</button>
							<button onClick={() => navigate("/app/list")} className="button">
								YOUR ANIME
							</button>
						</div>
					</div>
					<Trailer />
				</div>
			</div>
		</>
	);
};

export default Content;
