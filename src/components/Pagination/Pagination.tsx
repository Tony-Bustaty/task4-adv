import { useMemo } from "react";
import { useSearchParams } from "react-router";
import "./Pagination.css"
interface PaginationProps {
  totalPages: number;
}

function Pagination({ totalPages }: PaginationProps) {
  function getPaginationRange(
    currentPage: number,
    totalPages: number,
    visibleCount = 3,
  ) {
  if (totalPages <= visibleCount + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range = [];
  range.push(1); 

  
  let start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, start + visibleCount - 1);


  if (end - start + 1 < visibleCount) {
    start = Math.max(2, end - visibleCount + 1);
  }
  for (let i = start; i <= end; i++) range.push(i);

  if (end < totalPages - 1) range.push('...');

  range.push(totalPages);

  return range;


  }
  function onClickHandler(page:number) {
     setSearchParams({ page: page.toString() })
   
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
    const range = useMemo(
    () => getPaginationRange(currentPage, totalPages, 3),
    [currentPage, totalPages]
  )
  const paginationRange = getPaginationRange(currentPage, totalPages);
  console.log(paginationRange)
  return (
    <div className="pagination">
      {range.map((page) =>
        page === "..." ? (
          <button

            className={`btn-range`}
            
          >
            <p>...</p>
          </button>
        ) : (
          <button
          key={page}
            className={`btn-range ${currentPage ===page  ? "active" : ""}`}
            onClick={()=>onClickHandler((page as number))}
          >
            <p>{page}</p>
          </button>
        ),
      )}
    </div>
  );
}

export default Pagination;
