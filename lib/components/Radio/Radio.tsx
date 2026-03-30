import React, {FC} from "react";
import './radio.scss';

export interface Props {
    value: string;
    name: string;
    selected?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    children?: React.ReactNode;
    classNames?: {
        root?: string;
        disabled?: string;
        input?: string;
    };
}

export const Radio: FC<Props> = ({value, selected, name, onChange, disabled, children, classNames}) => {
    const hasIndicator = React.Children.toArray(children).some(
        (child: any) => child?.type === Radio.Indicator
    );

    return (
        <label
            className={`naria-radio ${disabled ? "naria-radio--disabled" : ""} ${classNames?.root} ${disabled ? classNames?.disabled : ""}`}
            tabIndex={disabled ? -1 : 0}
            data-class-prop="root"
            data-class-prop-disabled="disabled"
        >
            <input
                type="radio"
                onChange={e => onChange(e.target.value)}
                value={value}
                name={name}
                checked={selected ? selected === value : undefined}
                disabled={disabled}
                className={`naria-radio__input ${classNames?.input}`}
                data-class-prop="input"
            />

            {!hasIndicator && <Radio.Indicator />}

            {children || null}
        </label>
    );
};

Radio.Indicator = ({children, classNames}: {
    children?: React.ReactNode, classNames?: {
        indicator?: string;
        icon?: string;
    }
}) => {
    return (
        <div className={`naria-radio__indicator ${classNames?.indicator || ''}`} data-class-prop="indicator">
            <div>
                {children ? children : <span className={`naria-radio__indicator__icon ${classNames?.icon || ''}`} data-class-prop="icon"/>}
            </div>
        </div>
    );
};

Radio.Content = ({children, className}: { children?: React.ReactNode, className?: string }) => {
    return <div className={`naria-radio__content ${className || ''}`} data-class-prop="content">{children}</div>;
};