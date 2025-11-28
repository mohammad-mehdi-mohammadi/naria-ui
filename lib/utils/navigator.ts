import {useEffect, useState} from "react";

export const removeNavigation = (state: string) => {
    let newUrl;

    if(window.location.hash.includes("/")) {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`/#` + state, '')}`;
    } else {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`#` + state, '')}`;
    }
    window.history.replaceState(null, '', newUrl);
}

export const addNavigation = (state: string) => {
    if(!window.location.hash) {
        window.location.hash = state;
    } else {
        window.location.hash = window.location.hash  + "/#"  + state;
    }

}


export const onHashChanges = (state: string) => {
    const [isHashChanged, setIsHashChanged] = useState(false)
    useEffect(() => {
        const handleHashChange = (e) => {
            if(!window.location.hash.includes(state)) {
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