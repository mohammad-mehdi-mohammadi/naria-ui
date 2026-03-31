import React, {createContext, useContext} from "react";
import './pagination.scss';

export interface props {
    page: number;
    size: number;
    total: number;
    onPageChange: (value: number) => void;
    children?: React.ReactNode;
    classNames?: {
        root?: string;
    };
}


const PaginationContext = createContext<{
    page: number;
    totalPages: number;
    onPageChange: (value: number) => void;
} | null>(null);

export const Pagination: React.FC<props> = ({page, size, total, onPageChange, children, classNames}) => {
    const totalPages = Math.ceil(total / size);

    const value = {
        page,
        totalPages,
        onPageChange,
    };

    return (
        <PaginationContext.Provider value={value}>
            <div className={`naria-pagination ${classNames?.root || ""}`} data-class-prop="root">
                {children}
            </div>
        </PaginationContext.Provider>
    );
};

export const PaginationPrev = ({children, classNames}: { children?: React.ReactNode, classNames?: {
        prev?: string;
    }
}) => {
    const context = useContext(PaginationContext);
    if (!context) throw new Error("Pagination components must be used within Pagination");
    const {page, onPageChange} = context;
    return (
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 1}
                className = {`naria-pagination__prev ${classNames?.prev || ""}`}
                data-class-prop="prev">
            {children ? children : "Prev"}
        </button>
    );
};

export const PaginationNext = ({children, classNames}: { children?: React.ReactNode, classNames?: {
        next?: string;
    }
}) => {
    const context = useContext(PaginationContext);
    if (!context) throw new Error("Pagination components must be used within Pagination");
    const {page, totalPages, onPageChange} = context;
    return (
        <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className = {`naria-pagination__next ${classNames?.next || ""}`}
            data-class-prop="next"
        >
            {children ? children : "Next"}
        </button>
    );
};

export const PaginationPages = ({separator, classNames}: {
    separator?: React.ReactNode, classNames?: {
        page?: string;
        active?: string;
        separator?: string;
        pagesContainer?: string;
    }
}) => {
    const context = useContext(PaginationContext);
    if (!context) throw new Error("Pagination components must be used within Pagination");
    const {page, totalPages, onPageChange} = context;

    const getPageNumbers = () => {
        const pages: (number | React.ReactNode)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let left, right;
            if (page <= 2) {
                left = 2;
                right = 3;
            } else if (page >= totalPages - 1) {
                left = totalPages - 2;
                right = totalPages - 1;
            } else {
                left = page - 1;
                right = page + 1;
            }

            pages.push(1);

            if (left > 2) pages.push(separator ?? "...");

            for (let i = left; i <= right; i++) pages.push(i);

            if (right < totalPages - 1) pages.push(separator ?? "...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className = {`naria-pagination__pages-container ${classNames?.pagesContainer || ""}`}>
            {
                pageNumbers.map((p, idx) =>
                    typeof p === "number" ? (
                        <button
                            type="button"
                            key={p}
                            onClick={() => onPageChange(+p)}
                            aria-current={page === p ? "page" : undefined}
                            className={`naria-pagination__page ${classNames?.page || ""} ${page === p ? `naria-pagination__page--active ${classNames?.active || ""}` : ""}`}
                            data-class-prop="page"
                            data-class-prop-active="active"
                        >
                            {p}
                        </button>
                    ) : (
                        <span key={`separator-${idx}`} className = {`naria-pagination__separator ${classNames?.separator || ""}`} data-class-prop="separator">{p}</span>
                    )
                )
            }
        </div>
    );
};
export const PaginationContent = ({children, classNames}: {
    children?: React.ReactNode,
    classNames?: {
        content?: string;
    }
}) => {
    const context = useContext(PaginationContext);
    if (!context) throw new Error("Pagination components must be used within Pagination");
    return (
        <div className = {`naria-pagination__content ${classNames?.content || ""}`} data-class-prop="content">
            {typeof children === "function" ? children(context) : children}
        </div>
    );
};

Pagination.Prev = PaginationPrev;
Pagination.Next = PaginationNext;
Pagination.Content = PaginationContent;
Pagination.Pages = PaginationPages;
Pagination.displayName = 'Pagination';