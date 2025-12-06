import {FC, useEffect, useRef, useState} from "react";
import AngleDown from "../../assets/icons/angle-down.svg?react";
import Close from '../../assets/icons/close.svg?react';
import Search from '../../assets/icons/search.svg?react';
import './select.scss';
import useClickOutside from "../../hooks/click-outside";
import {useWidth} from "../../hooks/use-width";
import {addNavigation, onHashChanges, removeNavigation} from "../../utils/navigator";
import {Loading} from "../Loading";
import {generateRandom} from "../../utils/generate-random";
import {Portal} from "../Portal";

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
    backdrop: "opaque" | "blur" | "transparent";
    classNames?: {
        root: string;
        label?: string;
        title?: string;
        button?: string;
        searchInput?: string;
        listRoot?: string;
        list?: string;
        option?: string;
        optionActive?: string;
        mobileHeader?: string;
        errorText?: string;
        searchInputRoot?: string;
        iconRoot?: string;
        closeIcon?: string;
        arrowIcon?: string;
        searchIcon?: string;
        backdrop?: string;
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
                                      backdrop = "opaque",
                                      classNames = {
                                          root: "",
                                          label: "",
                                          title: "",
                                          button: "",
                                          searchInput: "",
                                          listRoot: "",
                                          list: "",
                                          option: "",
                                          optionActive: "",
                                          mobileHeader: "",
                                          errorText: "",
                                          searchInputRoot: "",
                                          iconRoot: "",
                                          closeIcon: "",
                                          arrowIcon: "",
                                          searchIcon: "",
                                          backdrop: "",
                                      },
                                      onSelectChange
                                  }) => {
    let isSubscribed = true;
    const getDeviceWidth = useWidth();
    const randomUUIDRef = useRef<string>(generateRandom(5));
    const isHashChanged = onHashChanges(`#select-` + randomUUIDRef.current);
    const [isOpen, setIsOpen] = useState(false);
    const [bounds, setBounds] = useState<{
        top: undefined | number,
        bottom: undefined | number,
        left: undefined | number,
        right: undefined | number,
        width: undefined | number,
        type: string,
        position: string
    }>({
        top: undefined,
        bottom: undefined,
        left: undefined,
        right: undefined,
        width: undefined,
        type: "fade-in-scale",
        position: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [localSelected, setLocalSelected] = useState<string | undefined>(undefined);
    const [localOptions, setLocalOptions] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState("");
    const [localPagination, setLocalPagination] = useState<SDS>({
        page: 1,
        pageLabel: 'page',
        size: 20,
        sizeLabel: 'size',
        isLoading: false
    });
    const localApi = useRef<string | undefined>(undefined);
    const listRef = useRef(undefined);
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
                console.error(error);
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
            if (isOpen) {
                addNavigation(`select-` + randomUUIDRef.current);
                document.body.style.overflow = 'hidden';
                handlerRef.current?.focus();
            } else {
                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation(`select-` + randomUUIDRef.current);
                }
                document.body.style.overflow = 'auto';
            }
        } else {
            if (!isOpen) {
                setBounds({
                    top: undefined,
                    bottom: undefined,
                    left: undefined,
                    right: undefined,
                    width: undefined,
                    type: "fade-in-scale",
                    position: ""
                })
            } else {
                setTimeout(() => {
                    update()
                }, 0)
            }
        }
    }, [isOpen]);
    const update = () => {
        if (handlerRef?.current && listRef.current) {
            const isRtl = document.documentElement?.getAttribute('dir') === 'rtl';
            const rect = listRef.current.getBoundingClientRect();
            const handlerRefRect = handlerRef.current.getBoundingClientRect();
            if (window.innerHeight - handlerRefRect.bottom > rect.height) {
                setBounds({
                    top: handlerRefRect.bottom + window.scrollY,
                    bottom: undefined,
                    left: !isRtl ? handlerRefRect.left : undefined,
                    right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                    width: handlerRefRect.width,
                    type: bounds.type,
                    position: "transform-origin-top-start"
                })
            } else {
                setBounds({
                    top: undefined,
                    bottom: window.innerHeight - handlerRefRect.top - window.scrollY,
                    left: !isRtl ? handlerRefRect.left : undefined,
                    right: isRtl ? (window.innerWidth || document.documentElement.clientWidth) - handlerRefRect.right : undefined,
                    width: handlerRefRect.width,
                    type: bounds.type,
                    position: "transform-origin-bottom-start"
                })
            }
        }
    };
    useEffect(() => {
        if (selected && options?.length) {
            if (options?.find(item => item[label] === selected)) {
                setLocalSelected(options?.find(item => item[label] === selected));
            } else {
                setLocalSelected(selected);
            }
        } else if (localSelected !== undefined) {
            setLocalSelected(undefined);
            setSearchTerm("")
        }
    }, [selected]);
    useEffect(() => {
        document.addEventListener('scroll', update, {capture: true});
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("resize", update);
            document.removeEventListener('scroll', update, {capture: true});
        };
    }, [update]);
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
            setIsOpen(false)
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
        setIsOpen(prevState => !prevState);
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
        setIsOpen(false);
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
            return `naria-select__option--active ${classNames?.optionActive}`
        }
        if (item === localSelected) {
            return `naria-select__option--active ${classNames?.optionActive}`
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
        if (!isOpen) {
            setIsOpen(true)
        }
    }
    useClickOutside(listRef, handlerRef, onClose);
    return (
        <div className={`naria-select ${disabled ? 'naria-select--disabled' : ''} ${classNames?.root}`}
             data-class-prop="root">
            <label
                className={`naria-select__label ${hasError && "naria-select__label--error"} ${classNames?.label}`}
                data-class-prop="label">
                <span className={`naria-select__title ${classNames?.title}`} data-class-prop="title">{title}</span>
                {
                    hasSearch ? (
                        <div className={`naria-select__search-input-root ${classNames.searchInputRoot}`}
                             data-class-prop="searchInputRoot">
                            <input ref={handlerRef}
                                   placeholder={placeholder?.length ? placeholder : "Select"}
                                   className={`naria-select__search-input ${localSelected ? "naria-select__search-input--selected" : ""}
                                   ${hasError && "naria-select__search-input--error"} ${classNames?.searchInput}`}
                                   value={searchTerm}
                                   disabled={disabled} type="text" onClick={onToggle} onChange={onSearch}
                                   data-class-prop="searchInput"/>
                            <div className={`naria-select__icon-root ${classNames?.iconRoot}`}
                                 data-class-prop="iconRoot">
                                {
                                    isOpen ? (
                                        <div className={`naria-select__search-icon ${classNames?.searchIcon}`}
                                             data-class-prop="searchIcon">
                                            <Search/>
                                        </div>
                                    ) : (
                                        <div
                                            className={`naria-select__arrow-icon ${classNames?.arrowIcon} ${isOpen ? "naria-select__arrow-icon--rotate-180" : ""}`}
                                            data-class-prop="arrowIcon">
                                            <AngleDown/>
                                        </div>
                                    )
                                }
                            </div>


                        </div>
                    ) : (
                        <button type="button"
                                ref={handlerRef}
                                disabled={disabled}
                                className={`naria-select__handler ${localSelected ? "select__handler--selected" : ""} 
                                ${hasError && "select__handler--error"} ${classNames?.button}`}
                                data-class-prop="button"
                                onClick={onToggle}>
                            {
                                localSelected ? (
                                    value?.length ? localSelected[value] : localSelected
                                ) : (placeholder?.length ? placeholder : "Select")
                            }
                            <div className={`naria-select__icon-root ${classNames?.iconRoot}`}
                                 data-class-prop="iconRoot">
                                <div
                                    className={`naria-select__arrow-icon ${classNames?.arrowIcon} ${isOpen ? "naria-select__arrow-icon--rotate-180" : ""}`}
                                    data-class-prop="arrowIcon">
                                    <AngleDown/>
                                </div>
                            </div>

                        </button>
                    )
                }

            </label>

            {
                isOpen ? (
                    <Portal>
                        {
                            getDeviceWidth < 768 ? (
                                <div
                                    className={`naria-select__list-root naria-select__list-root--mobile ${classNames?.listRoot} ${backdrop !== 'transparent' ? `backdrop--${backdrop}` : ''}`}
                                    data-class-prop="listRoot">
                                    <div
                                        className={`naria-select__list naria-select__list--mobile ${classNames?.list}`}
                                        data-class-prop="input"
                                        ref={listRef}
                                        onScroll={onScroll}>
                                        {
                                            api && isLoading ? (
                                                <div className="naria-select__loading-root">
                                                    <div className="naria-select__loading">
                                                        <Loading/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div
                                                        className={`naria-select__header--mobile ${classNames?.mobileHeader}`}
                                                        data-class-prop="mobileHeader">
                                                        {
                                                            hasSearch ? (
                                                                <div
                                                                    className={`naria-select__search-input-root ${classNames.searchInputRoot}`}
                                                                    data-class-prop="searchInputRoot">
                                                                    <input ref={handlerRef}
                                                                           placeholder={placeholder?.length ? placeholder : "Select"}
                                                                           className={`naria-select__search-input ${localSelected ? "naria-select__search-input--selected" : ""} 
                                                                       ${classNames?.searchInput} ${hasError && "naria-select__search-input--error"}`}
                                                                           data-class-prop="input"
                                                                           value={searchTerm}
                                                                           disabled={disabled} type="text"
                                                                           onChange={onSearch}/>
                                                                    <div
                                                                        className={`naria-select__icon-root ${classNames?.iconRoot}`}
                                                                        data-class-prop="iconRoot">
                                                                        <div className="naria-select__search-icon"
                                                                             data-class-prop="searchIcon">
                                                                            <Search/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : undefined
                                                        }
                                                        <button
                                                            className={`naria-select__close-icon ${classNames?.closeIcon}`}
                                                            onClick={onClose} disabled={disabled}
                                                            data-class-prop="closeIcon">
                                                            <Close/>
                                                        </button>
                                                    </div>
                                                    {
                                                        localOptions?.length ? (
                                                            <>
                                                                {
                                                                    localOptions?.map((item, index) => {
                                                                        return (
                                                                            <button type="button" onClick={() => onSelect(item)}
                                                                                    disabled={disabled}
                                                                                    key={index.toString()}
                                                                                    className={`naria-select__option ${classNames?.option} ${getActiveClass(item)}`}
                                                                                    data-class-prop="option"
                                                                                    data-class-prop-active="optionActive">
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
                                                            <div className="naria-select__loading-more-root">
                                                                <div className="naria-select__loading-more">
                                                                    <Loading/>
                                                                </div>
                                                            </div>
                                                        ) : undefined
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div

                                    className={`naria-select__list-root ${classNames?.listRoot}`}
                                    data-class-prop="listRoot">
                                    <div
                                        className={`naria-select__list naria-select__list--desktop ${classNames?.list} ${bounds.type} ${bounds.position}`}
                                        data-class-prop="input"
                                        style={{
                                            bottom: bounds.bottom !== undefined ? bounds.bottom : "unset",
                                            top: bounds.top !== undefined ? bounds.top : "unset",
                                            left: bounds.left !== undefined ? bounds.left : "unset",
                                            right: bounds.right !== undefined ? bounds.right : "unset",
                                            maxWidth: bounds.width !== undefined ? bounds.width : "unset",
                                        }}
                                        ref={listRef}
                                        onScroll={onScroll}>
                                        {
                                            api && isLoading ? (
                                                <div className="naria-select__loading-root">
                                                    <div className="naria-select__loading">
                                                        <Loading/>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {
                                                        localOptions?.length ? (
                                                            <>
                                                                {
                                                                    localOptions?.map((item, index) => {
                                                                        return (
                                                                            <button type="button" onClick={() => onSelect(item)}
                                                                                    disabled={disabled}
                                                                                    key={index.toString()}
                                                                                    className={`naria-select__option ${classNames?.option} ${getActiveClass(item)}`}
                                                                                    data-class-prop="option"
                                                                                    data-class-prop-active="optionActive">
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
                                                            <div className="naria-select__loading-more-root">
                                                                <div className="naria-select__loading-more">
                                                                    <Loading/>
                                                                </div>
                                                            </div>
                                                        ) : undefined
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Portal>
                ) : undefined
            }
            {
                hasError &&
                <p className={`naria-select--error-text ${classNames?.errorText}`}
                   data-class-prop="errorText">{hasError}</p>
            }

        </div>
    );
};


// <div
//
//     className={`naria-select__list-root ${getDeviceWidth < 768 ? "naria-select__list-root--mobile" : ""} ${classNames?.listRoot} `}
//     data-class-prop="listRoot"
//     ref={rootRef}>
//     <div
//         className={`naria-select__list ${getDeviceWidth < 768 ? "naria-select__list--mobile" : `naria-select__list--desktop`} ${classNames?.list}`}
//         data-class-prop="input"
//         onScroll={onScroll}>
//         {
//             api && isLoading ? (
//                 <div className="naria-select__loading-root">
//                     <div className="naria-select__loading">
//                         <Loading/>
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     {
//                         getDeviceWidth < 768 ? (
//                             <div
//                                 className={`naria-select__header--mobile ${classNames?.mobileHeader}`}
//                                 data-class-prop="mobileHeader">
//                                 {
//                                     hasSearch ? (
//                                         <div
//                                             className={`naria-select__search-input-root ${classNames.searchInputRoot}`}
//                                             data-class-prop="searchInputRoot">
//                                             <input ref={handlerRef}
//                                                    placeholder={placeholder?.length ? placeholder : "Select"}
//                                                    className={`naria-select__search-input ${localSelected ? "naria-select__search-input--selected" : ""}
//                                                                        ${classNames?.searchInput} ${hasError && "naria-select__search-input--error"}`}
//                                                    data-class-prop="input"
//                                                    value={searchTerm}
//                                                    disabled={disabled} type="text"
//                                                    onChange={onSearch}/>
//                                             <div
//                                                 className={`naria-select__icon-root ${classNames?.iconRoot}`}
//                                                 data-class-prop="iconRoot">
//                                                 <div className="naria-select__search-icon"
//                                                      data-class-prop="searchIcon">
//                                                     <Search/>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ) : undefined
//                                 }
//                                 <button
//                                     className={`naria-select__close-icon ${classNames?.closeIcon}`}
//                                     onClick={onClose} disabled={disabled}
//                                     data-class-prop="closeIcon">
//                                     <Close/>
//                                 </button>
//                             </div>
//                         ) : undefined
//                     }
//                     {
//                         localOptions?.length ? (
//                             <>
//                                 {
//                                     localOptions?.map((item, index) => {
//                                         return (
//                                             <button type="button" onClick={() => onSelect(item)}
//                                                     disabled={disabled}
//                                                     key={index.toString()}
//                                                     className={`naria-select__option ${classNames?.option} ${getActiveClass(item)}`}
//                                                     data-class-prop="option"
//                                                     data-class-prop-active="optionActive">
//                                                 {value?.length ? item[value] : item}
//                                             </button>
//                                         )
//                                     })
//                                 }
//                             </>
//                         ) : (
//                             <div>
//                                 No Data
//                             </div>
//                         )
//                     }
//
//
//                     {
//                         localPagination.isLoading ? (
//                             <div className="naria-select__loading-more-root">
//                                 <div className="naria-select__loading-more">
//                                     <Loading/>
//                                 </div>
//                             </div>
//                         ) : undefined
//                     }
//                 </>
//             )
//         }
//     </div>
// </div>