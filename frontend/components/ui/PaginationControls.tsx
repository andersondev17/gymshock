// components/ui/PaginationControls.tsx
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    maxVisiblePages?: number;
}

const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
    maxVisiblePages = 5
}: PaginationControlsProps) => {
    // No pagination needed if only one page
    if (totalPages <= 1) return null;

    // Generate page numbers with ellipsis logic for many pages
    const getPageNumbers = () => {
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is less than max visible
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Calculate visible page range with ellipsis
        const leftSiblingIndex = Math.max(currentPage - 1, 1);
        const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

        const shouldShowLeftEllipsis = leftSiblingIndex > 2;
        const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

        // Always show first and last pages
        if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            // Show ellipsis on both sides
            return [1, 'ellipsis-left', leftSiblingIndex, currentPage, rightSiblingIndex, 'ellipsis-right', totalPages];
        }

        if (shouldShowLeftEllipsis) {
            // Show ellipsis only on left
            return [1, 'ellipsis-left', ...Array.from({ length: maxVisiblePages - 2 }, (_, i) => totalPages - (maxVisiblePages - 3) + i)];
        }

        if (shouldShowRightEllipsis) {
            // Show ellipsis only on right
            return [...Array.from({ length: maxVisiblePages - 2 }, (_, i) => i + 1), 'ellipsis-right', totalPages];
        }

        // Default case: show first max visible pages
        return Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination className={className}>
            <PaginationContent className="flex-wrap gap-1 justify-center">
                {/* Previous button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        className={`transition-colors ${currentPage === 1 ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
                            }`}
                    />
                </PaginationItem>

                {/* Page numbers with ellipsis */}
                {pageNumbers.map((pageNumber, i) => (
                    pageNumber === 'ellipsis-left' || pageNumber === 'ellipsis-right' ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={i}>
                            <PaginationLink
                                onClick={() => onPageChange(pageNumber as number)}
                                isActive={currentPage === pageNumber}
                                className={`transition-colors hover:bg-gray-100 ${currentPage === pageNumber ? 'bg-red-500 text-white hover:bg-red-600' : ''
                                    }`}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    )
                ))}

                {/* Next button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        aria-disabled={currentPage === totalPages}
                        className={`transition-colors ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : 'cursor-pointer'
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControls;