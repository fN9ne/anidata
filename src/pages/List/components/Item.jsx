import { useDispatch, useSelector } from "react-redux";
import Status from "./Status";
import { changeContent, setAnimeToRemove, togglePending, toggleRemoveAnimeModalAction } from "../../../redux/reducers";
import Dropdown from "./Dropdown";

const Item = ({ data }) => {
	const dispatch = useDispatch();

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

	const id = data.mal_id;
	const genres = [...data.genres, ...data.themes, ...data.demographics].map((genre) => genre.name);

	const content = useSelector((state) => state.user.content);
	const contentData = content.filter((item) => item.id === id)[0];

	const status = contentData ? contentData.status.slice(0, 1).toUpperCase() + contentData.status.slice(1) : "";
	const stoppedAt = contentData ? contentData.statusOptions.stoppedAt : "";
	const episodes = data.episodes ? data.episodes : "?";

	const episodesList = Array.from({ length: episodes }, (_, index) => `${index + 1} Episode`);

	const changeStoppedAt = (episode) => {
		const newContent = content.map((item) => {
			if (item.id === id) {
				return {
					...item,
					isFavourite: false,
					statusOptions: {
						stoppedAt: Number(episode.match(/\d+/)[0]),
					},
				};
			}

			return item;
		});

		dispatch(changeContent(newContent));
		dispatch(togglePending(true));
	};

	return (
		<div className="animelist-item">
			<div className="animelist-item__wrapper">
				<div className="animelist-item__image">
					<img src={data.images.webp.large_image_url} alt={data.title} />
				</div>
				<div className="animelist-item__body">
					<div className="animelist-item__header">
						<div>
							<div className={`animelist-item__type type ${setTypeClassName(data.type)}`}>{setTypeText(data.type)}</div>
							<h2 title={data.title_english ? data.title_english : data.title}>
								{data.title_english ? data.title_english : data.title}
							</h2>
						</div>
						<div>
							<div className="animelist-item__year year">{data.year ? data.year : data.year}</div>
							<h4 title={data.title}>{data.title}</h4>
						</div>
					</div>
					<div className="animelist-item-genres">
						<h3>GENRES</h3>
						<ul className="animelist-item-genres__content">
							{genres.map((genre, key) => (
								<li key={key} className="animelist-item-genres__item">
									{genre}
								</li>
							))}
						</ul>
					</div>
					<div className="animelist-item__footer">
						<div className="animelist-item__props">
							<div className="animelist-item__prop">
								<h3>STATUS</h3>
								<Status status={status} id={id} />
							</div>
							{status === "In progress" && (
								<div className="animelist-item__prop">
									<h3>STOPPED AT</h3>
									<Dropdown
										onClick={(episode) => changeStoppedAt(episode)}
										className="animelist-dropdown__button_progress"
										buttonText={`${stoppedAt}/${episodes} Episode`}
										list={episodesList}
									/>
								</div>
							)}
							{status === "In plans" && (
								<div className="animelist-item__prop">
									<h3>EPISODES</h3>
									<div className="animelist-item__prop-text animelist-item__prop-text_plans">{episodes} Episodes</div>
								</div>
							)}
						</div>
						<button
							onClick={() => {
								dispatch(setAnimeToRemove({ name: data.title_english ? data.title_english : data.title, id: data.mal_id }));
								dispatch(toggleRemoveAnimeModalAction(true));
							}}
							className="button button_red"
						>
							REMOVE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;
