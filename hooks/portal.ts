import {useEffect, useState} from "react";

export const Portal = ({ children }) => {
    const [modalContainer] = useState(document.createElement('div'));
    useEffect(() => {
        // Find the root element in your DOM
        let modalRoot = document.getElementById('modal-root');
        // If there is no root then create one
        if (!modalRoot) {
            const tempEl = document.createElement('div');
            tempEl.id = 'modal-root';
            document.body.append(tempEl);
            modalRoot = tempEl;
        }
        // Append modal container to root
        modalRoot.appendChild(modalContainer);
        return function cleanup() {
            // On cleanup remove the modal container
            modalRoot.removeChild(modalContainer);
        };
    }, []); // <- The empty array tells react to apply the effect on mount/unmount

    return ReactDOM.createPortal(children, modalContainer);
};