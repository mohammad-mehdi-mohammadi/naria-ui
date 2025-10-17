"use client"
import {FC, useEffect, useState} from "react";
import ArrowRight from "@/assets/icons/angle-right.svg";
import ArrowLeft from "@/assets/icons/angle-left.svg";
import {generateUuid} from '@/utils/generate-uuid';

export interface props {
    theme?: "primary" | "secondary" | "warning" | "infoLight" | "dangerLight" | "infoLink" | "outlineSecondary" | "outlinePrimary";
    activeTheme?: "primary" | "secondary" | "warning" | "infoLight" | "dangerLight" | "infoLink" | "outlineSecondary" | "outlinePrimary";
    size?: "md" | "sm";
    totalCount: number;
    pageSize: number;
    onPageChange: any;
    selectedPage?: any;
}

const sizes = {
    sm: "text-xs h-8 min-w-8",
    md: "text-sm h-10 min-w-10"
}
const sizesArrow = {
    sm: "w-2.5",
    md: "w8"
}

export const buttonThemes = {
    primary: `border border-transparent bg-primary-100 text-white hover:bg-primary-200 focus:bg-primary-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    secondary: `border border-transparent bg-secondary-100 text-white hover:bg-secondary-200 focus:bg-secondary-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    success: `border border-transparent bg-success-100 text-white hover:bg-success-200 focus:bg-success-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    warning: `border border-transparent bg-warning-100 text-dark-100 hover:bg-warning-200 focus:bg-warning-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    infoLight: `border border-transparent bg-info-100/10 text-info-100 hover:brightness-80 focus:brightness-80 hover:border-info-100 focus:border-info-100 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    dangerLight: `border border-transparent bg-danger-300 text-danger-100 hover:bg-danger-400 focus:bg-danger-400 hover:border-danger-100 focus:border-danger-100 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    infoLink: `text-info-100 hover:text-info-200 focus:text-info-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    outlinePrimary: `border border-primary-100 text-primary-100 hover:bg-primary-300 focus:bg-primary-300 disabled:text-grey-300 disabled:cursor-not-allowed`,
    outlineSecondary: `border border-secondary-100 text-secondary-100 enabled:hover:bg-grey-200 focus:bg-grey-200 disabled:text-grey-300 disabled:border-grey-200 disabled:fill-grey-200 disabled:cursor-not-allowed`,
}
export const activeThemes = {
    primary: `border border-transparent bg-primary-100 text-white hover:bg-primary-200 focus:bg-primary-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    secondary: `border border-transparent bg-secondary-100 text-white hover:bg-secondary-200 focus:bg-secondary-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    success: `border border-transparent bg-success-100 text-white hover:bg-success-200 focus:bg-success-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    warning: `border border-transparent bg-warning-100 !text-dark-100 hover:bg-warning-200 focus:bg-warning-200 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    infoLight: `border border-transparent bg-info-100/10 text-info-100 hover:brightness-80 focus:brightness-80 hover:border-info-100 focus:border-info-100 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    dangerLight: `border border-transparent bg-danger-300 text-danger-100 hover:bg-danger-400 focus:bg-danger-400 hover:border-danger-100 focus:border-danger-100 disabled:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    infoLink: `text-info-100 hover:text-info-200 focus:text-info-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
    outlinePrimary: `transition duration-200 ease border border-primary-100 text-primary-100 hover:bg-primary-300 focus:bg-primary-300 disabled:text-grey-300 disabled:cursor-not-allowed`,
    outlineSecondary: `border border-secondary-100 text-secondary-100 hover:bg-grey-200 focus:bg-grey-200 disabled:text-grey-300 disabled:cursor-not-allowed`,
}
export const dotsThemes = {
    outlineSecondary: `text-secondary-100`,
}
export const arrowThemes = {
    outlineSecondary: `fill-secondary-100`,
}

const LibPagination: FC<props> = ({
                                      totalCount,
                                      pageSize,
                                      onPageChange,
                                      selectedPage,
                                      activeTheme = "primary",
                                      theme = "primary",
                                      size = "md"
                                  }) => {
    const [selected, setSelected] = useState(1);
    const [pagesCount, setPagesCount] = useState(1);
    const [list, setList] = useState([]);
    const onPaginationClicked = (item: number) => {
        setSelected(item);
        onPageChange(+item);
    };
    useEffect(() => {
        onPagesCountHandler();
    }, [totalCount]);
    useEffect(() => {
        setSelected(1);
        onPagesCountHandler();
    }, [pageSize]);
    const onPagesCountHandler = () => {
        const totalPages =
            totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
        setPagesCount(totalPages);
    };
    useEffect(() => {
        generatePages();
    }, [selected, pagesCount, totalCount]);
    useEffect(() => {
        if (selectedPage) {
            setSelected(selectedPage);
        }
    }, [selectedPage]);

    const generatePages = () => {
        const list: any = [];
        if (totalCount > 0) {
            list.push(
                <button
                    className={`rounded-lg flex items-center justify-center ${buttonThemes[theme]} ${sizes[size]} ${arrowThemes[theme]}`}
                    disabled={selected === 1}
                    onClick={() => onPaginationClicked(selected - 1)}
                    key={generateUuid()}>
                    <ArrowRight className={`${sizesArrow[size]}`}/>
                </button>
            );
            if (pagesCount <= 5) {
                for (let i = 1; i <= pagesCount; i++) {
                    list.push(
                        <button
                            className={`rounded-lg flex items-center justify-center ${sizes[size]} ${selected === i ? activeThemes[activeTheme] : buttonThemes[theme]}`}

                            onClick={() => onPaginationClicked(i)}
                            key={generateUuid()}
                        >
                            {i}
                        </button>
                    );
                }
            } else {
                if (selected > pagesCount - 3) {
                    list.push(
                        <button
                            className={`rounded-lg flex items-center justify-center ${sizes[size]} ${selected === 1 ? activeThemes[activeTheme] : buttonThemes[theme]}`}
                            onClick={() => onPaginationClicked(1)}
                            key={generateUuid()}
                        >
                            {1}
                        </button>
                    );
                    list.push(
                        <div
                            className={`rounded-lg flex items-center justify-center ${dotsThemes[theme]} ${sizes[size]}`}
                            key={generateUuid()}>
                            ...
                        </div>
                    );
                    for (let i = pagesCount - 3; i <= pagesCount; i++) {
                        list.push(
                            <button
                                className={`rounded-lg flex items-center justify-center ${sizes[size]} ${selected === i ? activeThemes[activeTheme] : buttonThemes[theme]}`}
                                onClick={() => onPaginationClicked(i)}
                                key={generateUuid()}
                            >
                                {i}
                            </button>
                        );
                    }
                } else {
                    const maxPage = selected < 3 ? 4 : selected + 2;
                    const fromPage = selected < 3 ? 1 : selected - 1;
                    for (let i = fromPage; i <= maxPage; i++) {
                        list.push(
                            <button
                                className={`rounded-lg flex items-center justify-center ${sizes[size]} ${selected === i ? activeThemes[activeTheme] : buttonThemes[theme]}`}
                                onClick={() => onPaginationClicked(i)}
                                key={generateUuid()}
                            >
                                {i}
                            </button>
                        );
                    }
                    list.push(
                        <div
                            className={`rounded-lg flex items-center justify-center ${dotsThemes[theme]} ${sizes[size]}`}
                            key={generateUuid()}>
                            ...
                        </div>
                    );
                    list.push(
                        <button
                            className={`rounded-lg flex items-center justify-center ${sizes[size]} ${selected === pagesCount ? activeThemes[activeTheme] : buttonThemes[theme]}`}
                            onClick={() => onPaginationClicked(pagesCount)}
                            key={generateUuid()}
                        >
                            {pagesCount}
                        </button>
                    );
                }
            }
            list.push(
                <button
                    className={`rounded-lg flex items-center justify-center ${buttonThemes[theme]} ${sizes[size]} ${arrowThemes[theme]}`}
                    disabled={selected === pagesCount}
                    onClick={() => onPaginationClicked(selected + 1)}
                    key={generateUuid()}
                >
                    <ArrowLeft className={`${sizesArrow[size]}`}/>
                </button>
            );
        }
        setList(list);
    };
    return (
        <div className="flex items-center justify-center rounded-xl gap-2">
            {list}
        </div>
    );
};

export default LibPagination;