import {FC, useEffect, useRef, useState} from "react";
import AngleDown from "../../../assets/icons/angle-down.svg?react";
import Close from '../../../assets/icons/close.svg?react';
import Search from '../../../assets/icons/search.svg?react';
import {useWidth} from "../../../hooks/use-width";
import Loading from "../../../shared/loading/Loading";
import './select.scss';
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import useClickOutside from "../../../hooks/click-outside";

interface Pagination {
    page?: number;
    pageLabel?: string;
    size?: number;
    sizeLabel?: string;
}

interface SDS extends Pagination {
    isLoading?: boolean;
}

export interface props {
    options?: any[];
    label?: string;
    title: string;
    value?: string;
    api?: string;
    hasError?: string | null;
    selected?: any;
    placeholder?: string;
    disabled?: boolean;
    pagination?: Pagination;
    optionFilterLabel?: string;
    hasSearch?: boolean;
    classNames?: {
        wrapper: string;
        label?: string;
        title?: string;
        button?: string;
        input?: string;
        listWrapper?: string;
        list?: string;
        option?: string;
    };
    onSelectChange?: any;
}

export const Select: FC<props> = ({
                                      options,
                                      label,
                                      hasError,
                                      title,
                                      value,
                                      api,
                                      selected,
                                      placeholder,
                                      disabled = false,
                                      pagination,
                                      optionFilterLabel,
                                      hasSearch = false,
                                      classNames = {
                                          wrapper: "",
                                          label: "",
                                          title: "",
                                          button: "",
                                          input: "",
                                          listWrapper: "",
                                          list: "",
                                          option: "",
                                      },
                                      onSelectChange
                                  }) => {
    let isSubscribed = true;
    const getDeviceWidth = useWidth();

    const isHashChanged = onHashChanges('#select');
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [localSelected, setLocalSelected] = useState<string | null>(null);
    const [localOptions, setLocalOptions] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [localPagination, setLocalPagination] = useState<SDS>({
        page: 1,
        pageLabel: 'page',
        size: 20,
        sizeLabel: 'size',
        isLoading: false
    });
    const localApi = useRef<string | undefined>(undefined);
    const wrapperRef = useRef(undefined);
    const handlerRef = useRef(undefined);

    const getData = async () => {
        if (localApi?.current) {
            try {
                const response = await fetch(localApi?.current);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(error.message);
            }
        }

    }

    useEffect(() => {
        return () => {
            isSubscribed = false;
        };
    }, [])
    useEffect(() => {
        if (api?.length) {
            localApi.current = api;
            if (localApi.current.includes(pagination?.pageLabel || 'page')) {
                const url = new URL(api);
                url.searchParams.set(pagination?.pageLabel || 'page', (pagination?.page || localPagination.page).toString());
                url.searchParams.set(pagination?.sizeLabel || 'size', (pagination?.size || localPagination.size).toString());
                localApi.current = url.href;
            }
            setIsLoading(true);
            getData().then((res) => {
                if (isSubscribed) {
                    setIsLoading(false);
                    setLocalOptions(res);
                }
            })
        }
    }, [api, pagination]);

    useEffect(() => {
        if (localPagination.isLoading) {
            if (localApi.current.includes(pagination?.pageLabel || 'page')) {
                const url = new URL(localApi.current);
                url.searchParams.set(pagination?.pageLabel || 'page', (localPagination.page).toString());
                localApi.current = url.href;
            }
            getData().then((res) => {
                if (isSubscribed) {
                    setIsLoading(false);
                    setLocalPagination({
                        ...localPagination,
                        isLoading: false
                    })
                    setLocalOptions([
                        ...localOptions,
                        ...res
                    ]);
                }
            })
        }
    }, [localPagination]);
    useEffect(() => {
        if (getDeviceWidth < 768) {
            if (isShow) {
                addNavigation('select');
                document.body.style.overflow = 'hidden';
                handlerRef.current?.focus();
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation();
                }
                document.body.style.overflow = 'auto';
            }
        }
    }, [isShow]);

    useEffect(() => {
        if (selected && options?.length) {
            if (options?.find(item => item[label] === selected)) {
                setLocalSelected(options?.find(item => item[label] === selected));
            } else {
                setLocalSelected(selected);
            }
        }
    }, [selected]);

    useEffect(() => {
        if (localSelected) {
            if (hasSearch) {
                if (value?.length && localOptions?.find(item => item[label] === localSelected[label])) {
                    setSearchTerm(localOptions?.find(item => item[label] === localSelected[label])[value] || '');
                } else {
                    setSearchTerm(localSelected);
                }
            }
        }
    }, [localSelected]);

    useEffect(() => {
        if (isHashChanged) {
            setIsShow(false)
        }
    }, [isHashChanged])


    useEffect(() => {
        if (options?.length) {
            setLocalOptions(options)
        }
    }, [options]);

    const onToggle = () => {
        if (hasSearch) {
            setLocalOptions(options)
        }
        setIsShow(prevState => !prevState);
    }
    const onClose = () => {
        if (hasSearch) {
            setLocalOptions(options)
            if (typeof localSelected === "string") {
                setSearchTerm(localSelected);
            } else {
                setSearchTerm(localSelected ? localSelected[value] : "")
            }
        }
        setIsShow(false);
    }
    const onSelect = (item) => {
        if (hasSearch) {
            if (value?.length) {
                setSearchTerm(item[value]);
            } else {
                setSearchTerm(item);
            }
        }
        setLocalSelected(item);
        onToggle();
        if (onSelectChange) {
            onSelectChange(item);
        }
    }

    const getActiveClass = (item) => {
        if (!localSelected) {
            return "";
        }
        if (label?.length && item[label] === localSelected[label]) {
            return "bg-grey-100"
        }
        if (item === localSelected) {
            return "bg-grey-100"
        }
    }
    const onScroll = (e) => {
        if (api?.length && localOptions?.length && !localPagination.isLoading) {
            const bottom = e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight - 100;

            if (bottom) {
                setLocalPagination({
                    page: localPagination.page + 1,
                    isLoading: true
                })
            }
        }

    }
    const onSearch = (e) => {
        const tempList = e?.target?.value?.length ? options.filter(val => typeof val === "object" ? val[(optionFilterLabel?.length ? optionFilterLabel : value)].includes(e?.target?.value) : val.includes(e?.target?.value)) : options
        setLocalOptions(tempList)
        setSearchTerm(e?.target?.value)
        if (!isShow) {
            setIsShow(true)
        }
    }
    useClickOutside(wrapperRef, handlerRef, onClose);
    return (
        <div className={`nariaSelect ${disabled ? 'nariaSelect-disabled' : ''} ${classNames?.wrapper}`}
             data-prop="wrapper">
            <label
                className={`cursor-pointer
                ${hasError && "!text-danger-100"}
                ${classNames?.label}`} data-prop="label">
                <span className={classNames?.title} data-prop="title">{title}</span>
                {
                    hasSearch ? (
                        <div className="nariaSearchInput">
                            <input ref={handlerRef}
                                   placeholder={placeholder?.length ? placeholder : "Select"}
                                   className={`${localSelected ? "text-dark-100" : "text-grey-300"} 
                                ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"} ${classNames?.input}`}
                                   value={searchTerm}
                                   disabled={disabled} type="text" onClick={onToggle} onChange={onSearch}
                                   data-prop="input"/>
                            {
                                isShow ? (
                                    <Search
                                        className="nariaSearchIcon"/>
                                ) : (
                                    <AngleDown
                                        className={`nariaArrowIcon ${isShow ? "nariaArrowIcon-rotate-180" : ""}`}/>
                                )
                            }


                        </div>
                    ) : (
                        <button type="button"
                                ref={handlerRef}
                                disabled={disabled}
                                className={`nariaHandler ${localSelected ? "text-dark-100" : "text-grey-300"} 
                                ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"} ${classNames?.button}`}
                                data-prop="button"
                                onClick={onToggle}>
                            {
                                localSelected ? (
                                    value?.length ? localSelected[value] : localSelected
                                ) : (placeholder?.length ? placeholder : "Select")
                            } <AngleDown
                            className={`nariaArrowIcon ${isShow ? "nariaArrowIcon-rotate-180" : ""}`}/>
                        </button>
                    )
                }

            </label>

            {
                isShow ? (
                    <div
                        className={`nariaListWrapper ${getDeviceWidth < 768 ? "nariaListWrapper-mobile" : ""} ${classNames?.listWrapper}`}
                        data-prop="listWrapper"
                        ref={wrapperRef}>
                        <div
                            className={`nariaList ${getDeviceWidth < 768 ? "nariaList-mobile" : `nariaList-desktop`} ${classNames?.list}`}
                            data-prop="input"
                            onScroll={onScroll}>
                            {
                                api && isLoading ? (
                                    <div className="nariaLoadingWrapper">
                                        <Loading/>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            getDeviceWidth < 768 ? (
                                                <div className="nariaSelectMobileHeader">
                                                    {
                                                        hasSearch ? (
                                                            <div className="nariaSearchInput">
                                                                <input ref={handlerRef}
                                                                       placeholder={placeholder?.length ? placeholder : "Select"}
                                                                       className={`${localSelected ? "text-dark-100" : "text-grey-300"} 
                                                               ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"} ${classNames?.input}`}
                                                                       data-prop="input"
                                                                       value={searchTerm}
                                                                       disabled={disabled} type="text"
                                                                       onChange={onSearch}/>
                                                                <Search
                                                                    className="nariaSearchIcon"/>
                                                            </div>
                                                        ) : undefined
                                                    }
                                                    <button className="p-3" onClick={onClose} disabled={disabled}>
                                                        <Close className="w-6"/>
                                                    </button>
                                                </div>
                                            ) : undefined
                                        }
                                        {
                                            localOptions?.length ? (
                                                <>
                                                    {
                                                        localOptions?.map((item, index) => {
                                                            return (
                                                                <button type="button" onClick={() => onSelect(item)}
                                                                        disabled={disabled}
                                                                        key={index.toString()}
                                                                        className={`${classNames?.option} ${getActiveClass(item)}`}
                                                                        data-prop="option">
                                                                    {value?.length ? item[value] : item}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                <div>
                                                    No Data
                                                </div>
                                            )
                                        }


                                        {
                                            localPagination.isLoading ? (
                                                <div className="nariaLoadingMoreWrapper">
                                                    <Loading/>
                                                </div>
                                            ) : undefined
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                ) : undefined
            }
            {
                hasError &&
                <p className="text-xs mt-1 text-danger-100">{hasError}</p>
            }

        </div>
    );
};