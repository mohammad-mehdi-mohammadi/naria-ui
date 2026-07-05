import {useEffect, useState} from "react";

let NARIA_URL = undefined
export const removeNavigation = (state: string) => {
    let newUrl;
    if (window.location.hash.includes("/")) {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`/#` + state, '')}`;
    } else {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`#` + state, '')}`;
    }
    NARIA_URL = `${window.location.origin}${newUrl}`;
    window.history.replaceState(null, '', newUrl);
}

export const addNavigation = (state: string) => {
    if (!window.location.hash) {
        window.location.hash = state;
    } else {
        window.location.hash = window.location.hash + "/#" + state;
    }
}


export const onHashChanges = (state: string) => {
    const [isHashChanged, setIsHashChanged] = useState(false)
    useEffect(() => {
        NARIA_URL = window.location.href
        const handleHashChange = (e) => {

            if (window.location.hash.includes(state)) {
                if (window.location.hash.length === window.location.hash.indexOf(state) + state.length) {
                    if (window.location.href === NARIA_URL) {

                        window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}`);
                        NARIA_URL = `${window.location.origin}${window.location.pathname}`;
                        setIsHashChanged(true);
                    } else {
                        setIsHashChanged(false);
                        NARIA_URL = `${window.location.origin}${window.location.pathname}`;
                    }


                }
            } else {
                setIsHashChanged(true);
            }
        };

        window.addEventListener('popstate', handleHashChange);
        return () => {
            window.removeEventListener('popstate', handleHashChange);
        };
    }, [])
    return isHashChanged
};