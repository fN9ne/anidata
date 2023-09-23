import { motion } from "framer-motion";
import { opacity } from "../animations";

const AnimatePage = (props) => {
	return <motion.div {...props} {...opacity} />;
};

export default AnimatePage;
