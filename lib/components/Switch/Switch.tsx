import React, {useEffect, useState} from "react";
import './switch.scss';

export interface props {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string | React.ReactNode;
    labelPosition?: 'left' | 'right';
    classNames?: {
        root?: string;
        rootActive?: string;
        rootDisabled?: string;
        label?: string;
        button?: string;
        track?: string;
        thumb?: string;
    };
}

export const Switch: React.FC<props> = ({
                                            checked = false,
                                            onChange,
                                            disabled = false,
                                            label,
                                            labelPosition = 'right',
                                            classNames,
                                        }) => {
    const [isChecked, setIsChecked] = useState(checked);
    useEffect(() => {
        setIsChecked(checked);
    }, [checked])
    const handleToggle = () => {
        if (disabled) return;

        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };

    return (
        <label
            className={`naria-switch ${labelPosition} ${classNames?.root || ''} ${isChecked ? `${(classNames?.rootActive || '')} active` : ''} ${disabled ? `${(classNames?.rootDisabled || '')} disabled` : ''}`}
            data-class-prop="root"
            data-class-prop-disabled="rootDisabled"
            data-class-prop-active="rootActive">
            {label && labelPosition === 'left' && (
                <div className={`naria-switch__label ${classNames?.label || ''}`}
                     data-class-prop="label">
                    {label}
                </div>
            )}

            <button
                type="button"
                role="switch"
                className={`naria-switch__button ${classNames?.button || ''} ${isChecked ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={handleToggle}
                disabled={disabled}>
        <span className={`naria-switch__track ${classNames?.track || ''}`}>
          <span className={`naria-switch__thumb ${classNames?.thumb || ''}`}/>
        </span>
            </button>

            {label && labelPosition === 'right' && (
                <div className={`naria-switch__label ${classNames?.label || ''}`}
                     data-class-prop="label">
                    {label}
                </div>
            )}
        </label>
    );
};

Switch.displayName = 'Switch';