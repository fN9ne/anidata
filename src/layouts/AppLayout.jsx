import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AnimatePage from "../components/AnimatePage";

const AppLayout = () => {
	return (
		<AnimatePage className="app">
			<Sidebar />
			<Outlet />
		</AnimatePage>
	);
};

export default AppLayout;
