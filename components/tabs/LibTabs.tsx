"use client"
import {FC, useEffect, useRef, useState} from "react";

interface TabType {
    name: string;
    label: string;
}

export interface props {
    tabs: TabType[],
    onTabEmit?: any,
}

const LibTabs: FC<props> = ({tabs, onTabEmit}) => {
    const [isActive, setIsActive] = useState(0);
    const onTabClicked = (item: TabType, index: number) => {
        setIsActive(index)
        onTabEmit(item)
    }
    return (
        <div className="flex border-2 border-primary-100 rounded-lg overflow-hidden divide-x-2 divide-x-reverse divide-primary-100">
            {
                tabs.map((item: TabType, index: number) => {
                    return <button className={`transition font-bold grow p-2 ${isActive === index ? "bg-primary-100 text-light-100" : ""}`} key = {index} onClick={() => onTabClicked(item, index)}>{item.label}</button>
                })
            }
        </div>
    );
};

export default LibTabs;