import {RefObject, useEffect, useRef, useState} from 'react';


// export const useOutOfBounds = () => {
//
//     const componentRef = useRef(undefined);
//     const [isOutOfBounds, setIsOutOfBounds] = useState({
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0
//     });
//     const mutationObserverCallback = () => {
//         if (componentRef.current) {
//             const rect = componentRef.current.getBoundingClientRect();
//             const windowWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);
//             const windowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight);
//             let directions = {
//                 top: 0,
//                 bottom: 0,
//                 left: 0,
//                 right: 0
//             };
//
//             if (rect.top < 0) {
//                 directions.top = Math.abs(0 - rect.top);
//             }
//
//             if (rect.bottom > windowHeight) {
//                 directions.bottom = Math.abs(windowHeight - rect.bottom);
//             }
//
//             if (rect.left < 0) {
//                 directions.left = Math.abs(0 - rect.left);
//             }
//
//             if (rect.right > windowWidth) {
//                 directions.right = Math.abs(windowWidth - rect.right);
//             }
//
//             if (isOutOfBounds.top !== directions.top || isOutOfBounds.bottom !== directions.bottom || isOutOfBounds.left !== directions.left || isOutOfBounds.right !== directions.right) {
//                 setIsOutOfBounds(directions);
//             }
//         }
//     }
//     const observer = new MutationObserver(mutationObserverCallback);
//
//     useEffect(() => {
//         if (componentRef.current) {
//             observer.observe(componentRef.current, { attributes: true, childList: true, subtree: true });
//         }
//
//         return () => observer.disconnect();
//     }, [componentRef, observer]);
//
//     return [componentRef, isOutOfBounds];
//
// };


const useOutOfBounds = <T extends HTMLElement>(ref: RefObject<T>, fn: () => void) => {
    const [isOutOfBounds, setIsOutOfBounds] = useState({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    });
    const mutationObserverCallback = () => {

        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowWidth = Math.min(document.documentElement.clientWidth, window.innerWidth);
            const windowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight);
            let directions = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            };
            if (rect.top < 0) {
                directions.top = Math.abs(0 - rect.top);
            }
            console.log(rect.top)
            if (rect.bottom > windowHeight) {
                directions.bottom = Math.abs(windowHeight - rect.bottom);
            }

            if (rect.left < 0) {
                directions.left = Math.abs(0 - rect.left);
            }

            if (rect.right > windowWidth) {
                directions.right = Math.abs(windowWidth - rect.right);
            }
            console.log(isOutOfBounds.top, directions.top, isOutOfBounds.bottom, directions.bottom, isOutOfBounds.left, directions.left, isOutOfBounds.right, directions.right, 'asd-as-da-sd--=')
            if (isOutOfBounds.top !== directions.top || isOutOfBounds.bottom !== directions.bottom || isOutOfBounds.left !== directions.left || isOutOfBounds.right !== directions.right) {
                setIsOutOfBounds(directions);
            }
        }
    }
    // const observer = new MutationObserver(mutationObserverCallback);
    let observer = new MutationObserver(mutationRecords => {
        console.log(mutationRecords); // console.log(the changes)
    });
    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current, {
                childList: true, // observe direct children
                subtree: true, // and lower descendants too
                characterDataOldValue: true // pass old data to callback
            });
            // observer.observe(ref.current, { attributes: true, childList: true, subtree: true });
        }

        return () => observer.disconnect();
    }, [ref, fn, observer]);

};

export default useOutOfBounds;