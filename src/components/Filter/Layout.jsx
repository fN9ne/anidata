import "./Filter.scss";
import { opacity, scaleDown } from "../../animations";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as FilterIcon } from "../../img/icons/filter.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { catalogActions } from "../../redux/reducers";

const Layout = ({ children, clear, onClick }) => {
	const isActive = useSelector((state) => state.catalog.filter.active);
	const setActive = (value) => dispatch(catalogActions.toggleFilter(value));

	const dispatch = useDispatch();

	const toggleFilter = () => setActive(!isActive);

	const closeFilter = (event) => {
		if (!event.target.closest(".filter__body")) {
			setActive(false);
			dispatch(catalogActions.closeSelectboxes());
		}
	};

	/* tracking */

	const buttonRef = useRef();
	const contentRef = useRef();

	useEffect(() => {
		const tracking = () => {
			const buttonRect = buttonRef.current.getBoundingClientRect();
			const contentRect = contentRef.current.getBoundingClientRect();

			if (window.innerWidth - 25 < buttonRect.left + buttonRect.width + contentRect.width) {
				contentRef.current.style.cssText = `
					top: ${buttonRect.top - 10}px;
					left: ${buttonRect.left - 4 - contentRect.width}px;
				`;
			} else {
				contentRef.current.style.cssText = `
					top: ${buttonRect.top - 10}px;
					left: ${buttonRect.left + 4 + buttonRect.width}px;
				`;
			}
		};

		const observer = new ResizeObserver(tracking);

		if (isActive) observer.observe(document.body);

		return () => observer.disconnect();
	}, [isActive]);

	useEffect(() => {
		const close = (event) => {
			if (event.keyCode === 27) {
				setActive(false);
				dispatch(catalogActions.closeSelectboxes());
			}
		};

		document.body.addEventListener("keydown", close);

		return () => document.body.removeEventListener("keydown", close);
	}, []);

	return (
		<>
			<button ref={buttonRef} onClick={toggleFilter} className={`filter-button${isActive ? " filter-button_active" : ""}`}>
				<FilterIcon />
			</button>
			<AnimatePresence>
				{isActive && (
					<motion.div
						onClick={(event) => {
							closeFilter(event);
							onClick(event);
						}}
						{...opacity}
						className="filter"
					>
						<motion.div {...scaleDown} ref={contentRef} className="filter__body">
							<div className="filter__content">{children}</div>
							<button onClick={clear} className="button button_lightseablue filter__clear">
								CLEAR
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Layout;
