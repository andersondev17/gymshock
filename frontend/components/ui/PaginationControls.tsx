import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxPageButtons?: number;
}

const PaginationControls = ({ currentPage, totalPages, onPageChange, maxPageButtons = 5 }: PaginationControlsProps) => {

    // Logic to determine which page buttons to show
    const getPageButtons = () => {
        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = startPage + maxPageButtons - 1;

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageButtons = getPageButtons();

    return (
        <div className="flex justify-center items-center ">
            <div className="inline-flex bg-white rounded-lg shadow-md p-1 border border-gray-100">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg mx-1 flex items-center justify-center font-medium text-sm ${currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                        }`}
                    aria-label="Previous page"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* First page */}
                {pageButtons[0] > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className={`w-10 h-10 rounded-lg mx-1 flex items-center justify-center font-medium text-sm ${currentPage === 1
                                ? 'bg-red-600 text-white'
                                : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                                }`}
                        >
                            1
                        </button>
                        {pageButtons[0] > 2 && (
                            <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                        )}
                    </>
                )}

                {/* Page numbers */}
                {pageButtons.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-colors duration-300 ${currentPage === page
                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                            : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page */}
                {pageButtons[pageButtons.length - 1] < totalPages && (
                    <>
                        {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
                            <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`w-10 h-10 rounded-lg mx-1 flex items-center justify-center font-medium text-sm ${currentPage === totalPages
                                ? 'bg-red-600 text-white'
                                : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                                }`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg mx-1 flex items-center justify-center font-medium text-sm ${currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                        }`}
                    aria-label="Next page"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default PaginationControls;