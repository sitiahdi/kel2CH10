import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import Script from "next/script";

import Navbar from "../components/navbar/navbar";

import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js" integrity="sha384-ODmDIVzN+pFdexxHEHFBQH3/9/vQ9uori45z4JjnFsRydbmQbmL5t1tQ0culUzyK" crossOrigin="anonymous" />
			<Navbar />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
