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
        <div className="flex justify-center items-center">
            <div className="inline-flex bg-gymshock-dark-800/60 backdrop-blur-xl rounded-xl shadow-gymshock-elevated p-2 border border-gymshock-dark-700/40">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2.5 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-all duration-200 ${currentPage === 1
                        ? 'text-gymshock-dark-500 cursor-not-allowed'
                        : 'text-gymshock-dark-200 hover:bg-gymshock-dark-700/60 hover:text-white'
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
                            className={`w-11 h-11 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-all duration-200 ${currentPage === 1
                                ? 'bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 text-white shadow-gymshock-glow'
                                : 'text-gymshock-dark-200 hover:bg-gymshock-dark-700/60 hover:text-white'
                                }`}
                        >
                            1
                        </button>
                        {pageButtons[0] > 2 && (
                            <span className="w-11 h-11 flex items-center justify-center text-gymshock-dark-400">...</span>
                        )}
                    </>
                )}

                {/* Page numbers */}
                {pageButtons.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-11 h-11 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-all duration-300 ${currentPage === page
                            ? 'bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 text-white shadow-gymshock-glow scale-110'
                            : 'text-gymshock-dark-200 hover:bg-gymshock-dark-700/60 hover:text-white hover:scale-105'
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page */}
                {pageButtons[pageButtons.length - 1] < totalPages && (
                    <>
                        {pageButtons[pageButtons.length - 1] < totalPages - 1 && (
                            <span className="w-11 h-11 flex items-center justify-center text-gymshock-dark-400">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`w-11 h-11 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-all duration-200 ${currentPage === totalPages
                                ? 'bg-gradient-to-r from-gymshock-primary-500 to-gymshock-primary-600 text-white shadow-gymshock-glow'
                                : 'text-gymshock-dark-200 hover:bg-gymshock-dark-700/60 hover:text-white'
                                }`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2.5 rounded-lg mx-1 flex items-center justify-center font-medium text-sm transition-all duration-200 ${currentPage === totalPages
                        ? 'text-gymshock-dark-500 cursor-not-allowed'
                        : 'text-gymshock-dark-200 hover:bg-gymshock-dark-700/60 hover:text-white'
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