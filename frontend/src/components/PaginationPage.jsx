// @ts-check
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumber = () => {
    const pages = [];
    const visiblePages = [];

    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }

    if (showLeftEllipsis) {
      visiblePages.push(1);
      visiblePages.push("start-ellipsis");
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (showRightEllipsis) {
      visiblePages.push("end-ellipsis");
      visiblePages.push(totalPages);
    }

    visiblePages.forEach((page, index) => {
      if (page === "start-ellipsis" || page === "end-ellipsis") {
        pages.push(
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis className="text-gray-500" />
          </PaginationItem>
        );
      } else {
        const isActive = currentPage === page;
        pages.push(
          <PaginationItem key={page}>
            <PaginationLink
              isActive={isActive}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              className={`px-3 py-1 rounded-md transition-colors duration-200 cursor-default ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    });
    return pages;
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent className="flex gap-1 items-center text-sm">
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className="text-gray-400 cursor-default hover:text-white px-2 py-1 rounded-md hover:bg-gray-800 transition-colors"
          />
        </PaginationItem>

        {renderPageNumber()}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className="text-gray-400 cursor-default hover:text-white px-2 py-1 rounded-md hover:bg-gray-800 transition-colors"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationPage;
