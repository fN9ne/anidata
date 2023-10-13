import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import { catalogActions } from "../../../redux/reducers";

const CatalogPagination = () => {
	const { page, maxPages, fetching } = useSelector((state) => state.catalog);
	const dispatch = useDispatch();

	const prev = () => (page !== 1 ? dispatch(catalogActions.setPage(page - 1)) : null);

	const next = () => (maxPages !== page ? dispatch(catalogActions.setPage(page + 1)) : null);

	return <Pagination fetching={fetching} maxPages={maxPages} page={page} events={{ prev: prev, next: next }} />;
};

export default CatalogPagination;
