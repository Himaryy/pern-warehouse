import { useMemo, useState } from "react";

export const usePagination = (data, itemsPerPage = 3) => {
  const [currentPage, setCurrenPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const onPageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrenPage(page);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    onPageChange,
  };
};
