import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as ArrowsIcon } from "../../img/icons/arrows.svg";
import { ReactComponent as CheckmarkIcon } from "../../img/icons/checkmark2.svg";
import { opacity, scaleDown } from "../../animations";
import { useDispatch } from "react-redux";
import { catalogActions } from "../../redux/reducers";

const FilterItem = ({ title, list, value, selectbox, onItemClick }) => {
	const { isSelectboxActive, setSelectboxActive } = selectbox;

	const dispatch = useDispatch();

	return (
		<div className="filter-item">
			<h3>{title}</h3>
			<div className="selectbox">
				<div
					onClick={() => {
						dispatch(catalogActions.closeSelectboxes());
						setSelectboxActive(!isSelectboxActive);
					}}
					className="selectbox__field"
				>
					<AnimatePresence mode="wait" initial={false}>
						{value.length > 0 ? (
							<motion.div
								key="value"
								{...opacity}
								className="selectbox__value"
								title={Array.isArray(value) ? value.join(", ") : value}
							>
								{Array.isArray(value) ? value.join(", ") : value}
							</motion.div>
						) : (
							<motion.div key="placeholder" {...opacity} className="selectbox__placeholder">
								Select {title.toLowerCase()}
							</motion.div>
						)}
					</AnimatePresence>
					<ArrowsIcon />
				</div>
				<AnimatePresence>
					{isSelectboxActive && (
						<motion.div {...scaleDown} className={`selectbox__content${list.length > 6 ? " selectbox__content_big" : ""}`}>
							<div className="selectbox__wrapper">
								<ul className="selectbox__track">
									{list.map((item, key) => (
										<li
											onClick={() => onItemClick(item)}
											className={`selectbox__item${
												Array.isArray(value)
													? value.includes(item)
														? " selectbox__item_active"
														: ""
													: value === item
													? " selectbox__item_active"
													: ""
											}`}
											key={key}
										>
											<div className="selectbox__checkmark">
												<CheckmarkIcon />
											</div>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default FilterItem;
