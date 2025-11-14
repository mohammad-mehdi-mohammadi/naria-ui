import {RefObject, useCallback, useEffect, useState} from 'react';

export const useOutOfBounds = (ref: RefObject<Element>) => {
    const [outOfBounds, setOutOfBounds] = useState({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    });
    const update = useCallback(() => {
        if (ref.current) {
            setTimeout(() => {
                const rect = ref.current.getBoundingClientRect();
                console.log(rect)
                setOutOfBounds({
                    top: rect.top - rect.height,
                    bottom: (window.innerHeight || document.documentElement.clientHeight) - rect.bottom,
                    left: 0,
                    right: 0
                });
            }, 0)
        }
    }, [ref]);

    useEffect(() => {
        ["resize"].forEach(type => {
            window.addEventListener(type, update);
        });
        return () => {
            ["resize"].forEach(type => {
                window.removeEventListener(type, update);
            });
        };
    }, [update]);
    return outOfBounds;
}
export default useOutOfBounds;