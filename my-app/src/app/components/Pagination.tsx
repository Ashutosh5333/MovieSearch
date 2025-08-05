"use client";
import { FC } from "react";
import { motion } from "framer-motion";
import { PaginationProps } from "../types/Types";

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <motion.div
    className="flex justify-center mt-10 gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-4 py-2 rounded-lg bg-[#353535] text-white hover:bg-red-700 transition disabled:opacity-50"
    >
      Prev
    </button>
    <span className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-lg">
      {currentPage} / {totalPages}
    </span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      className="px-4 py-2 rounded-lg bg-[#353535] text-white hover:bg-red-700 transition disabled:opacity-50"
    >
      Next
    </button>
  </motion.div>
);

export default Pagination;
