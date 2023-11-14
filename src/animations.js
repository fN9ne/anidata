export const opacity = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.2, ease: "easeInOut" },
};
export const scale = {
	initial: { opacity: 0, scale: 0.95 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.95 },
	transition: { duration: 0.35, ease: "easeInOut" },
};
export const scaleDown = {
	initial: { opacity: 0, scale: 0.95, y: -30 },
	animate: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.95, y: 30 },
	transition: { duration: 0.35, ease: "easeInOut" },
};
export const slideRight = {
	initial: { opacity: 0, x: 35 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 35 },
	transition: { duration: 0.35, ease: "easeInOut" },
};
export const slideDown = {
	initial: { opacity: 0, y: -30 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 30 },
	transition: { duration: 0.35, ease: "easeInOut" },
};
export const height = (height) => {
	return {
		initial: { opacity: 0, height: 0 },
		animate: { opacity: 1, height: height },
		exit: { opacity: 0, height: 0 },
		transition: { duration: 0.35, ease: "easeInOut" },
	};
};
