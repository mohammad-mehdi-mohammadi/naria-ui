import {useEffect, useState} from "react";

let NARIA_URL = undefined
export const removeNavigation = (state: string) => {
    let newUrl;
    if (window.location.hash.includes("/")) {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`/#` + state, '')}`;
    } else {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`#` + state, '')}`;
    }
    NARIA_URL = `${window.location.origin}${window.location.pathname}${newUrl}`;
    window.history.replaceState(null, '', newUrl);
}

export const addNavigation = (state: string) => {
    console.log('as3')
    if (!window.location.hash) {
        window.location.hash = state;
    } else {
        window.location.hash = window.location.hash + "/#" + state;
    }
    // let newUrl;
    // let hash;
    // if(!window.location.hash) {
    //     hash = "#" + state;
    // } else {
    //     hash = window.location.hash  + "/#" + state;
    // }
    // if(window.location.hash.includes("/")) {
    //     newUrl = `${window.location.pathname}${window.location.search}${hash}`;
    // } else {
    //     newUrl = `${window.location.pathname}${window.location.search}${hash}`;
    // }
    // console.log("addNavigation", state, newUrl, window.location.pathname, window.location.hash)
    // // window.history.replaceState(null, '', newUrl);
    // window.history.replaceState( null , "", newUrl );
}


// export const onHashChanges = (state: string) => {
//     const [isHashChanged, setIsHashChanged] = useState(false)
//     useEffect(() => {
//         const handleHashChange = (e) => {
//             if(!window.location.hash.includes(state)) {
//                 setIsHashChanged(true);
//             } else {
//                 setIsHashChanged(false);
//             }
//             console.log("onHashChanges", state, window.location.hash)
//         };
//         window.addEventListener('hashchange', handleHashChange);
//         return () => {
//             window.removeEventListener('hashchange', handleHashChange);
//         };
//     }, [])
//     return isHashChanged
// };
export const onHashChanges = (state: string) => {
    const [isHashChanged, setIsHashChanged] = useState(false)
    useEffect(() => {
        NARIA_URL = window.location.href
        const handleHashChange = (e) => {
            // console.log("daasda0", window.location.href, NARIA_URL, window.history)
            if (window.location.hash.includes(state)) {
                if (window.location.hash.length === window.location.hash.indexOf(state) + state.length) {
                    if (window.location.href === NARIA_URL) {
                        // console.log("daasda1", window.location.href, NARIA_URL)
                        window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}/`);
                        NARIA_URL = `${window.location.origin}${window.location.pathname}/`;
                        setIsHashChanged(true);
                    } else {
                        // console.log("daasda2", window.location.href, NARIA_URL)
                        setIsHashChanged(false);
                        NARIA_URL = window.location.href;
                    }


                }


                // if (!window.location.hash.includes(state)) {
                //     setIsHashChanged(true);
                // } else {
                //     setIsHashChanged(false);
                // }

                // else {
                //     window.history.replaceState(null, '', "/");
                //     setIsHashChanged(true);
                // }
            } else {
                // console.log("daasda2", window.location.href, x)
                // if(window.location.href === x) {
                //     x = window.location.href;
                // }
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