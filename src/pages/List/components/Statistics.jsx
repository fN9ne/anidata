import StatisticsItem from "./StatisticsItem";

import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as DropDownIcon } from "../../../img/icons/dropdown.svg";
import { ReactComponent as TotalAnimeIcon } from "../../../img/icons/your_anime.svg";
import { ReactComponent as EyeIcon } from "../../../img/icons/eye.svg";
import { ReactComponent as InProgressIcon } from "../../../img/icons/progress.svg";
import { ReactComponent as PlansIcon } from "../../../img/icons/plans.svg";
import { AnimatePresence, motion } from "framer-motion";
import { toggleStatisticsVisibleAction } from "../../../redux/reducers";

const Statistics = () => {
	const data = useSelector((state) => state.user.content);

	const dispatch = useDispatch();

	const { statisticsVisible } = useSelector((state) => state.yourAnime);

	const getAnimeAmountByStatus = (status) => data.filter((item) => item.status === status).length;
	const toggleStatisticsVisibility = () => dispatch(toggleStatisticsVisibleAction(!statisticsVisible));

	const list = [
		[{ icon: <TotalAnimeIcon />, num: data.length, desc: "total anime in list", tag: "total" }],
		[
			{ icon: <EyeIcon />, num: getAnimeAmountByStatus("Watched"), desc: "watched anime", tag: "watched" },
			{ icon: <InProgressIcon />, num: getAnimeAmountByStatus("In progress"), desc: "anime in progress", tag: "progress" },
			{ icon: <PlansIcon />, num: getAnimeAmountByStatus("In plans"), desc: "anime in plans", tag: "plans" },
		],
	];

	return (
		<div className="animelist-statistics">
			<div
				onClick={toggleStatisticsVisibility}
				className={`animelist-statistics__header${!statisticsVisible ? " animelist-statistics__header_hidden" : ""}`}
			>
				<h2>Statistics</h2>
				<DropDownIcon />
			</div>
			<AnimatePresence>
				{statisticsVisible && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="animelist-statistics__content"
					>
						{list.map((block, key) => (
							<div key={key} className="animelist-statistics__block">
								{block.map((item, key) => (
									<StatisticsItem tag={item.tag} key={key} icon={item.icon} num={item.num} desc={item.desc} />
								))}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Statistics;
