import { useEffect, useState } from "react";

export const addNavigation = (state: string) => {
    if (window.location.hash.includes(state)) return;

    const hash = window.location.hash.replace(/^#/, "");

    if (!hash) {
        window.location.hash = state;
    } else {
        window.location.hash = `${hash}/#${state}`;
    }
};

export const removeNavigation = (state: string) => {
    const hash = window.location.hash.replace(/^#/, "");

    if (!hash) return;

    const items = hash
        .split("/#")
        .filter(item => item !== state);

    if (items.length === 0) {
        history.back();
        return;
    }

    window.location.hash = items.join("/#");
};

export const onHashChanges = (state: string) => {
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        const handler = () => {
            const hash = window.location.hash.replace(/^#/, "");

            if (!hash.includes(state)) {
                setClosed(true);
            } else {
                setClosed(false);
            }
        };

        window.addEventListener("hashchange", handler);
        window.addEventListener("popstate", handler);

        handler();

        return () => {
            window.removeEventListener("hashchange", handler);
            window.removeEventListener("popstate", handler);
        };
    }, [state]);

    return closed;
};