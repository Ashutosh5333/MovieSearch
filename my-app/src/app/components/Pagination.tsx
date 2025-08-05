"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { PaginationProps } from "../types/Types";

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <motion.div
      className="flex justify-center mt-8 gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Prev
      </button>

      <span className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
      >
        Next
      </button>
    </motion.div>
  );
};

export default Pagination;
