import { useEffect, useRef, useState } from "react";
import { opacity, scaleDown, slideDown } from "../../../animations";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = ({ className, buttonText, list, onClick }) => {
	const [isActive, setActive] = useState(false);

	const buttonClassNames = {
		Watched: "animelist-dropdown__button_watched",
		"In progress": "animelist-dropdown__button_progress",
		"In plans": "animelist-dropdown__button_plans",
	};

	const buttonRef = useRef();
	const contentRef = useRef();

	useEffect(() => {
		const tracking = () => {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const contentRect = contentRef.current.getBoundingClientRect();

			if (window.innerHeight - 50 < buttonRect.top + buttonRect.height + contentRect.height + 4) {
				contentRef.current.style.cssText = `
					top: ${buttonRect.top - 4 - contentRect.height}px;
					left: ${buttonRect.left + buttonRect.width / 2 - contentRect.width / 2}px;
				`;
			} else {
				contentRef.current.style.cssText = `
					top: ${buttonRect.top + buttonRect.height + 4}px;
					left: ${buttonRect.left + buttonRect.width / 2 - contentRect.width / 2}px;
				`;
			}
		};

		const observer = new ResizeObserver(tracking);

		if (isActive) observer.observe(document.body);

		return () => observer.disconnect();
	}, [isActive]);

	return (
		<div className="animelist-dropdown">
			<div
				ref={buttonRef}
				onClick={() => setActive((prev) => !prev)}
				className={`animelist-dropdown__button ${buttonClassNames[buttonText] || className}${
					isActive ? " animelist-dropdown__button_active" : ""
				}`}
			>
				{buttonText}
			</div>
			<AnimatePresence>
				{isActive && (
					<motion.div
						{...opacity}
						className="animelist-dropdown__content"
						onClick={(event) => {
							if (!event.target.closest(".animelist-dropdown__body")) setActive(false);
						}}
					>
						<motion.div
							{...slideDown}
							ref={contentRef}
							className={`animelist-dropdown__body${list.length > 6 ? " animelist-dropdown__body_big" : ""}`}
						>
							<div className="animelist-dropdown__list">
								<ul className="animelist-dropdown__track">
									{list.map((item, key) => (
										<li
											key={key}
											onClick={() => {
												onClick(item);
												setActive(false);
											}}
											className={`animelist-dropdown__item${item === buttonText ? " animelist-dropdown__item_active" : ""}`}
										>
											<div className="animelist-dropdown__radio"></div>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;
