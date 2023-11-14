const StatisticsItem = ({ icon, num, desc, tag }) => {
	return (
		<div className={`animelist-statistics__item animelist-statistics__item_${tag}`}>
			<div className="animelist-statistics__main">
				<div className="animelist-statistics__icon">{icon}</div>
				<div className="animelist-statistics__num">{num}</div>
			</div>
			<div className="animelist-statistics__desc">{desc}</div>
		</div>
	);
};

export default StatisticsItem;
