import {Children, cloneElement, FC, useRef, useState} from "react";
import useClickOutside from "../../hooks/click-outside";
import './popover.scss';
export interface props {
    classNames?: {
        root?: string;
        label?: string;
        title?: string;
        input?: string;
        errorText?: string;
    };
    children?: any;
}

export const Popover: FC<props> = ({
                                       classNames = {
                                           root: "",
                                           label: "",
                                           title: "",
                                           input: "",
                                           errorText: "",
                                       },
                                       children,
                                       ...otherProps
                                   }) => {
    const [trigger, content] = Children.toArray(children);
    const [isShow, setIsShow] = useState(false);
    const rootRef = useRef(undefined);
    const handlerRef = useRef(undefined);
    const onTrigger = () => {
        setIsShow(prevState => !prevState)
    }
    const onClose = () => {
        setIsShow(false)
    }
    useClickOutside(rootRef, handlerRef, onClose);
    return (
        <div className={`naria-popover ${classNames.root}`} data-class-prop="root">
            {cloneElement(trigger, {onClick: () => onTrigger(), ref: handlerRef})}
            {
                isShow && (
                    <div className="naria-popover__content" ref={rootRef}>
                        {content}
                    </div>
                )
            }
        </div>
    );
};


