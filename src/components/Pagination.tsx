import { ARTICLE_PAGE_LIMIT } from '../api/article';

interface PaginationProps {
  count: number;
  page: number;
  setPage: (page: number) => void;
}
export function Pagination({ count, page, setPage }: PaginationProps) {
  const pageCount = Math.ceil(count / ARTICLE_PAGE_LIMIT);
  let countArray = new Array(pageCount).fill('');

  return (
    <nav>
      <ul className="pagination">
        {countArray.map((_, index) => (
          <li
            key={index}
            className={page === index + 1 ? 'page-item active' : 'page-item'}
            onClick={() => setPage(index + 1)}
          >
            <a className="page-link" href="#">
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
