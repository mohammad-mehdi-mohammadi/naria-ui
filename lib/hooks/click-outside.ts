import { RefObject, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, buttonRef: RefObject<T>, fn: () => void) => {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node | null) && ref?.current && !ref?.current.contains(event.target as Node | null)) {
                fn();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, fn]);
};

export default useClickOutside;