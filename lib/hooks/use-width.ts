import {useEffect, useState} from "react";

export const useWidth = () => {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);
    const handleResize = () => setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    return width;
};