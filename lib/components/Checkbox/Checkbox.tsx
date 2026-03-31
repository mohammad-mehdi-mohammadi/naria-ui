import React, {FC} from "react";
import './checkbox.scss';
import CheckIcon from '../../assets/icons/check.svg?react';

export interface Props {
    checked: boolean;
    disabled?: boolean;
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
    classNames?: {
        root?: string;
        disabled?: string;
        input?: string;
    };
}

export const Checkbox: FC<Props> = ({checked, onChange, disabled, children, classNames}) => {
    const hasIndicator = React.Children.toArray(children).some(
        (child: any) => child?.type === Checkbox.Indicator
    );

    return (
        <label
            className={`naria-checkbox ${disabled ? "naria-checkbox--disabled" : ""} ${classNames?.root} ${disabled ? classNames?.disabled : ""}`}
            tabIndex={disabled ? -1 : 0}
            data-class-prop="root"
            data-class-prop-disabled="disabled"
        >
            <input
                type="checkbox"
                onChange={e => onChange(e.target.checked)}
                checked={checked}
                disabled={disabled}
                className={`naria-checkbox__input ${classNames?.input}`}
                data-class-prop="input"
            />

            {!hasIndicator && <Checkbox.Indicator />}

            {children || null}
        </label>
    );
};

Checkbox.Indicator = ({children, classNames}: {
    children?: React.ReactNode, classNames?: {
        indicator?: string;
        icon?: string;
    }
}) => {
    return (
        <div className={`naria-checkbox__indicator ${classNames?.indicator || ''}`} data-class-prop="indicator">
            <span>
                {children ? children : <CheckIcon className={`naria-checkbox__indicator__icon ${classNames?.icon || ''}`} data-class-prop="icon"/>}
            </span>
        </div>
    );
};

Checkbox.Content = ({children, classNames}: { children?: React.ReactNode, classNames?: {
        content?: string;
    }
}) => {
    return <div className={`naria-checkbox__content ${classNames?.content || ''}`} data-class-prop="content">{children}</div>;
};