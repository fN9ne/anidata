import { useDispatch, useSelector } from "react-redux";
import {
	catalogActions,
	setAnimeToRemove,
	toggleAnime,
	togglePending,
	toggleRemoveAnimeModalAction,
} from "../../../redux/reducers";
import { useNavigate } from "react-router-dom";

const ListItem = ({ interactiveFilterChange, data }) => {
	const yourAnimeList = useSelector((state) => state.user.content);

	const filterGenres = useSelector((state) => state.catalog.filter.genres.content);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const genres = [...data.genres, ...data.themes, ...data.demographics].map((genre) => genre.name);

	const isAnimeAdded = (id) => {
		return yourAnimeList.includes(id);
	};

	const handleToggleAnime = () => {
		if (!isAnimeAdded(data.mal_id)) {
			dispatch(toggleAnime(data.mal_id));
			dispatch(togglePending(true));
		} else {
			dispatch(setAnimeToRemove({ name: data.title_english ? data.title_english : data.title, id: data.mal_id }));
			dispatch(toggleRemoveAnimeModalAction(true));
		}
	};

	const setType = () => {
		dispatch(catalogActions.setType(data.type));
		interactiveFilterChange.setState(true);
	};

	const setGenre = (genre) => {
		dispatch(catalogActions.toggleGenre(genre));
		interactiveFilterChange.setState(true);
	};

	const setTitle = (string) => {
		dispatch(catalogActions.setSearch(string));
	};

	return (
		<div className="catalog-item">
			<div className="catalog-item__wrapper">
				<div onClick={() => navigate(`/app/anime/${data.mal_id}`)} className="catalog-item__image">
					<img src={data.images.webp.large_image_url} alt="anime_poster" />
				</div>
				<div className="catalog-item__body">
					<div className="catalog-item__header">
						<div>
							<div onClick={setType} className={`catalog-item__type type ${setTypeClassName(data.type)}`}>
								{setTypeText(data.type)}
							</div>
							<h2
								onClick={() => setTitle(data.title_english ? data.title_english : data.title)}
								title={data.title_english ? data.title_english : data.title}
							>
								{data.title_english ? data.title_english : data.title}
							</h2>
						</div>
						<div>
							<div className="catalog-item__year year">
								{data.year ? data.year : data.aired.prop.from.year ? data.aired.prop.from.year : "WHEN?"}
							</div>
							<h4 onClick={() => setTitle(data.title)} title={data.title}>
								{data.title}
							</h4>
						</div>
					</div>
					<div className="catalog-item-genres">
						<h3>GENRES</h3>
						<div className="catalog-item-genres__content">
							{genres.length !== 0 ? (
								genres.map((genre, key) => (
									<div
										onClick={() => setGenre(genre)}
										key={key}
										className={`catalog-item-genres__item${
											filterGenres.includes(genre) ? " catalog-item-genres__item_active" : ""
										}`}
									>
										{genre}
									</div>
								))
							) : (
								<div className="catalog-item-genres__item">?</div>
							)}
						</div>
					</div>
					<div className="catalog-item__footer">
						<div className="catalog-item__prop">
							<h3>EPISODES</h3>
							<div>{data.episodes ? data.episodes : "?"}</div>
						</div>
						<div className="catalog-item__prop">
							<h3>STATUS</h3>
							<div>{setStatus(data.status)}</div>
						</div>
						<div className="catalog-item__prop">
							<h3>SORUCE</h3>
							<div>{data.source ? data.source : "?"}</div>
						</div>
					</div>
					<div className="catalog-item__buttons">
						<button
							onClick={handleToggleAnime}
							className={`catalog-item__button button ${!isAnimeAdded(data.mal_id) ? "button_lightblue" : "button_red	"}`}
						>
							{!isAnimeAdded(data.mal_id) ? "ADD" : "REMOVE"}
						</button>
						<button onClick={() => navigate("/app/list")} className="catalog-item__button button">
							YOUR ANIME
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListItem;
