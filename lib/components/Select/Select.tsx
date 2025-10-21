import {FC, useEffect, useState} from "react";
import AngleDown from "../../../src/assets/icons/angle-down.svg?react";
import Close from '../../../src/assets/icons/close.svg?react';
import {useWidth} from "../../../hooks/use-width";
import Loading from "../../../shared/loading/Loading";
import './select.scss';
import {addNavigation, removeNavigation} from "../../utils/navigator";

export interface props {
    options?: any[];
    label?: string | "label";
    title: string;
    value?: string | "value";
    api?: any;
    maxHeight?: string;
    hasError?: string | null;
    selected?: any;
    placeholder?: string;
    onSelectChange?: any;
}

export const Select: FC<props> = ({
                                      options,
                                      label,
                                      hasError,
                                      title,
                                      value,
                                      api,
                                      maxHeight = "max-h-64",
                                      selected,
                                      placeholder,
                                      onSelectChange
                                  }) => {
    const getDeviceWidth = useWidth();
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [localSelected, setLocalSelected] = useState(null);
    const [localOptions, setLocalOptions] = useState(null);
    useEffect(() => {
        if (api) {
            setIsLoading(true);
            api().then((res) => {
                setIsLoading(false);
                setLocalOptions(res?.data?.message ? [] : res.data);
            })
        }
    }, [api]);
    useEffect(() => {
        if (getDeviceWidth < 1024) {

            if (isShow) {
                addNavigation('select');
                document.body.style.overflow = 'hidden';
            } else {

                if (window.location.hash && !document.referrer.includes('#')) {
                    removeNavigation();
                }
                document.body.style.overflow = 'auto';
            }
        }
    }, [isShow]);

    useEffect(() => {
        if (label?.length) {
            setLocalSelected(localOptions?.find(item => item[label] === selected));
        } else {
            setLocalSelected(selected);
        }
    }, [selected, localOptions]);

    useEffect(() => {
        if (options?.length) {
            setLocalOptions(options)
        }
    }, [options]);

    const onToggle = () => {
        setIsShow(prevState => !prevState);
    }
    const onToggleEvent = (e) => {
        if (e?.target?.className.toString()?.includes('backdrop-select')) {
            onToggle()
        }
    }
    const onSelect = (item) => {
        setLocalSelected(item);
        onToggle();
        if(onSelectChange) {
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
    return (
        <div className="naria-select">
            <label
                className={`cursor-pointer
                ${hasError && "!text-danger-100"}`}>
                <span className={``}>{title}</span>
                <button type="button"
                        className={`relative z-20 flex items-center mt-1 text-base justify-between gap-2 w-full
                         ${localSelected ? "text-dark-100" : "text-grey-300"}
                         ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"}`}
                        onClick={onToggle}>
                    {
                        localSelected ? (
                            value?.length ? localSelected[value] : localSelected
                        ) : (placeholder?.length ? placeholder : "Select")
                    } <AngleDown
                    className={`w-4 h-4 transition ease duration-200 ${!isShow ? "rotate-0" : "rotate-180"}`}/>
                </button>
            </label>

            {
                isShow ? (
                    <div
                        className={`wrapper ${getDeviceWidth < 1024 ? "mobile" : ""}`}>
                        <div
                            className={`list ${getDeviceWidth < 1024 ? "mobile" : `desktop ${maxHeight}`}`}>
                            {
                                api && isLoading ? (
                                    <div className="py-10 flex justify-center">
                                        <Loading size="w-7 h-7"/>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            getDeviceWidth < 1024 ? (
                                                <div className="sticky top-0 text-left">
                                                    <button className="p-3" onClick={onToggle}>
                                                        <Close className="w-6"/>
                                                    </button>
                                                </div>
                                            ) : undefined
                                        }
                                        {
                                            localOptions?.map((item, index) => {
                                                return (
                                                    <button type="button" onClick={() => onSelect(item)}
                                                            key={index.toString()}
                                                            className={`text-right py-2.5 px-4 text-base hover:bg-grey-100 rounded-lg ${getActiveClass(item)}`}>
                                                        {value?.length ? item[value] : item}
                                                    </button>
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>
                        <div
                            className={`backdrop-select`}
                            onClick={onToggleEvent}>

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