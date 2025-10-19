import {useEffect, useState} from "react";

export const removeNavigation = () => {
    const newUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, '', newUrl);
}

export const addNavigation = (state: string) => {
    window.location.hash = state;
}


export const onHashChanges = () => {
    const [isHashChanged, setIsHashChanged] = useState(false)
    useEffect(() => {
        const handleHashChange = (e) => {
            if(window.location.hash !== "#modal") {
                setIsHashChanged(true);
            } else {
                setIsHashChanged(false);
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [])
    return isHashChanged
};