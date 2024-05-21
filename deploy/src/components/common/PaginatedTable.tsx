import { useState } from 'react';

type PaginatedTableProps = {
  headers: React.ReactNode[];
  data: React.ReactNode[][];
};

const PaginatedTable = ({ headers, data }: PaginatedTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table headers={headers} data={currentPageData} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedTable;

type TableProps = {
  headers: React.ReactNode[];
  data: React.ReactNode[][];
};

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = [];
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 5) {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goToPreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const goToFirstPage = () => {
    onPageChange(1);
  };

  const goToLastPage = () => {
    onPageChange(totalPages);
  };

  const goToPage = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="my-4 flex items-center justify-center">
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'
        } rounded-l border border-gray-300 px-3 py-1`}
      >
        {'<<'}
      </button>
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'
        } border border-gray-300 px-3 py-1`}
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`${
            currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-200'
          } border border-gray-300 px-3 py-1`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'
        } border border-gray-300 px-3 py-1`}
      >
        {'>'}
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'
        } rounded-r border border-gray-300 px-3 py-1`}
      >
        {'>>'}
      </button>
    </div>
  );
};
