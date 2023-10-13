import "./Statusbar.scss";

const Statusbar = ({ title, activities, pagination }) => {
	return (
		<div className="statusbar">
			<div className="statusbar__main">
				<h2>{title}</h2>
				<div className="statusbar__activities">{activities ? activities : null}</div>
			</div>
			{pagination ? pagination : null}
		</div>
	);
};

export default Statusbar;
