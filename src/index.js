import "./scss/null.scss";
import "./scss/index.scss";

import App from "./App";
import store from "./redux/store";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const Root = () => (
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);

ReactDOM.createRoot(document.querySelector(".wrapper")).render(<Root />);
