import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import AnimatePage from "../components/AnimatePage";

const AppLayout = () => {
	return (
		<AnimatePage className="app">
			<Sidebar />
			<div className="body">
				<Outlet />
			</div>
		</AnimatePage>
	);
};

export default AppLayout;
