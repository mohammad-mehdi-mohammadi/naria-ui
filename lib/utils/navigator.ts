import {useEffect, useState} from "react";

export const removeNavigation = () => {
    console.log(JSON.stringify(window.location))
    const x = JSON.parse(JSON.stringify(window.location))
    const newUrl = `${window.location.pathname}${window.location.search}${x.hash}`;
    window.history.replaceState(null, '', newUrl);
}

export const addNavigation = (state: string) => {
    console.log(window.location.hash)

    if(!window.location.hash) {
        window.location.hash = state;
    } else {
        // history.pushState(state, "", window.location.href);
        window.location.hash = window.location.hash  + "/#"  + state;
    }

}


export const onHashChanges = (state: string) => {
    const [isHashChanged, setIsHashChanged] = useState("")
    useEffect(() => {
        const handleHashChange = (e) => {
            setIsHashChanged(window.location.hash);

        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [])
    return isHashChanged
};