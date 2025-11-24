import {ReactNode} from 'react';
import {createPortal} from 'react-dom';

export type TPortal = {children: ReactNode; tagName: string};

export const Portal = ({children}: TPortal) => {

    return createPortal(children, document.body);
};