import "./Pagination.scss";

import { ReactComponent as ArrowIcon } from "../../img/icons/paginationArrow.svg";

const Pagination = ({ maxPages, page, events, fetching }) => {
	const { prev, next } = events;

	return (
		<div className="pagination">
			<button disabled={page === 1 || fetching} onClick={prev} className="pagination__arrow pagination__arrow_prev">
				<ArrowIcon />
				<span>Prev Page</span>
			</button>
			<div className="pagination__display">{page}</div>
			<button disabled={maxPages === page || fetching} onClick={next} className="pagination__arrow pagination__arrow_next">
				<span>Next Page</span>
				<ArrowIcon />
			</button>
		</div>
	);
};

export default Pagination;
