const DetailsItem = ({ label, value }) => {
	return (
		<li className={`anime-details__item${label === "Genres" ? " anime-details__item_genres" : ""}`}>
			<div className="anime-details__label">{label}</div>
			<div className="anime-details__value">
				{label !== "Genres" ? (
					value
				) : (
					<ul className="anime-details__genres">
						{value.map((genre, key) => (
							<li key={key} className="anime-details__genre">
								{genre}
							</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
};

export default DetailsItem;
