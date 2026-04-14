import React, {useState, useRef, useEffect, FC, ReactNode} from "react";
import "./time-picker.scss";

export interface TimePickerProps {
    mode?: "12" | "24";
    value?: { hour: number; minute: number; second?: number };
    onChange?: (time: { hour: number; minute: number; second: number, ampm?: undefined | 'am' | 'pm' }) => void;
    disabled?: boolean;
    classNames?: {
        root?: string;
        wrapper?: string;
        controls?: string;
        ampmWrapper?: string;
        am?: string;
        pm?: string;
        toggleWrapper?: string;
        toggle?: string;
        toggleActive?: string;
        toggleLabel?: string;
        toggleValue?: string;
        timeSeparator?: string;
        clock?: string;
        hourMarker?: string;
        innerRing?: string;
        minuteMarkers?: string;
        minuteDot?: string;
        minuteNumberWrapper?: string;
        minuteNumber?: string;
        clockHand?: string;
        centerDot?: string;
    };
    labels?: {
        am?: ReactNode | string | undefined;
        pm?: ReactNode | string | undefined;
        toggleHourLabel?: ReactNode | string | undefined;
        toggleMinuteLabel?: ReactNode | string | undefined;
        toggleSecondLabel?: ReactNode | string | undefined;
    };
    enabledParts?: {
        hour?: boolean;
        minute?: boolean;
        second?: boolean;
    };
    initialPart?: "hour" | "minute" | "second";
    isToggleLabelEnable?: boolean;
}

const hours12 = Array.from({length: 12}, (_, i) => i + 1);
const hours24 = Array.from({length: 24}, (_, i) => i + 1);
const minutes = Array.from({length: 60}, (_, i) => i);

export const TimePicker: FC<TimePickerProps> = ({
                                                    onChange,
                                                    mode = "12",
                                                    value,
                                                    disabled = false,
                                                    classNames = {
                                                        root: '',
                                                        wrapper: '',
                                                        controls: '',
                                                        ampmWrapper: '',
                                                        am: '',
                                                        pm: '',
                                                        toggleWrapper: '',
                                                        toggle: '',
                                                        toggleActive: '',
                                                        toggleLabel: '',
                                                        toggleValue: '',
                                                        timeSeparator: '',
                                                        clock: '',
                                                        hourMarker: '',
                                                        innerRing: '',
                                                        minuteMarkers: '',
                                                        minuteDot: '',
                                                        minuteNumberWrapper: '',
                                                        minuteNumber: '',
                                                        clockHand: '',
                                                        centerDot: '',
                                                    },
                                                    labels = {
                                                        am: undefined,
                                                        pm: undefined,
                                                        toggleHourLabel: undefined,
                                                        toggleMinuteLabel: undefined,
                                                        toggleSecondLabel: undefined,
                                                    },
                                                    enabledParts = {hour: true, minute: true, second: false},
                                                    initialPart = "hour",
                                                    isToggleLabelEnable = true,
                                                }) => {
    const continuousAngle = useRef(0);

    const [selectedAmPm, setSelectedAmPm] = useState<'am' | 'pm' | undefined>(undefined);
    const [selectedHour, setSelectedHour] = useState(value?.hour || 12);
    const [selectedMinute, setSelectedMinute] = useState(value?.minute || 0);
    const [selectedSecond, setSelectedSecond] = useState(value?.second || 0);

    const getInitialTimeMode = () => {
        if (enabledParts.hour && initialPart === "hour") return "hour";
        if (enabledParts.minute && initialPart === "minute") return "minute";
        if (enabledParts.second && initialPart === "second") return "second";
        if (enabledParts.hour) return "hour";
        if (enabledParts.minute) return "minute";
        return "second";
    };

    const [timeMode, setTimeMode] = useState(getInitialTimeMode());
    const clockRef = useRef(null);
    const isDragging = useRef(false);

    useEffect(() => {
        if (value) {
            if (value.hour !== undefined && value.hour !== selectedHour) {
                setSelectedHour(value.hour);
            }
            if (value.minute !== undefined && value.minute !== selectedMinute) {
                setSelectedMinute(value.minute);
            }
            if (value.second !== undefined && value.second !== selectedSecond) {
                setSelectedSecond(value.second);
            }
        }
    }, [value]);

    const getActiveButtons = () => {
        const buttons = [];
        if (enabledParts.hour) buttons.push({mode: "hour", label: "Hour"});
        if (enabledParts.minute) buttons.push({mode: "minute", label: "Minute"});
        if (enabledParts.second) buttons.push({mode: "second", label: "Second"});
        return buttons;
    };

    const calculateHour = (clientX, clientY, rect) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;

        const distance = Math.sqrt(x * x + y * y);
        const radius = rect.width / 2;
        const innerRadius = radius * 0.65;

        const isInner = distance < innerRadius;

        let angle = Math.atan2(y, x) * (180 / Math.PI);
        let hourAngle = (angle + 90 + 360) % 360;

        let hour;
        if (mode === "12") {
            hour = Math.round(hourAngle / 30);
            if (hour === 0) hour = 12;
        } else {
            if (!isInner) {
                hour = Math.round(hourAngle / 30);
                if (hour === 0) hour = 12;
            } else {
                let innerHour = Math.round(hourAngle / 30);
                if (innerHour === 0) innerHour = 12;
                hour = innerHour + 12;
                if (hour === 24) hour = 24;
            }
        }

        return hour;
    };

    const calculateMinute = (clientX, clientY, rect) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;

        let angle = Math.atan2(y, x) * (180 / Math.PI);
        let minuteAngle = (angle + 90 + 360) % 360;

        let minute = Math.round(minuteAngle / 6);
        if (minute === 60) minute = 0;

        return minute;
    };

    const calculateSecond = (clientX, clientY, rect) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = clientX - centerX;
        const y = clientY - centerY;

        let angle = Math.atan2(y, x) * (180 / Math.PI);
        let secondAngle = (angle + 90 + 360) % 360;

        let second = Math.round(secondAngle / 6);
        if (second === 60) second = 0;

        return second;
    };

    const handleMouseEvent = (e) => {
        if (disabled) return;
        e.preventDefault();
        const rect = clockRef.current.getBoundingClientRect();

        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        if (timeMode === "minute" && enabledParts.minute) {
            const minute = calculateMinute(clientX, clientY, rect);
            setSelectedMinute(minute);
            if (onChange) {
                if (selectedAmPm) {
                    onChange({hour: selectedHour, minute, second: selectedSecond, ampm: selectedAmPm});
                } else {
                    onChange({hour: selectedHour, minute, second: selectedSecond});
                }
            }
        } else if (timeMode === "second" && enabledParts.second) {
            const second = calculateSecond(clientX, clientY, rect);
            setSelectedSecond(second);
            if (onChange) {
                if (selectedAmPm) {
                    onChange({hour: selectedHour, minute: selectedMinute, second, ampm: selectedAmPm});
                } else {
                    onChange({hour: selectedHour, minute: selectedMinute, second});
                }
            }
        } else if (timeMode === "hour" && enabledParts.hour) {
            const hour = calculateHour(clientX, clientY, rect);
            setSelectedHour(hour);
            if (onChange) {
                if (selectedAmPm) {
                    onChange({hour, minute: selectedMinute, second: selectedSecond, ampm: selectedAmPm});
                } else {
                    onChange({hour, minute: selectedMinute, second: selectedSecond});
                }
            }
        }
    };

    const handleMouseDown = (e) => {
        if (disabled) return;
        isDragging.current = true;
        handleMouseEvent(e);
    };

    const handleMouseMove = (e) => {
        if (disabled || !isDragging.current) return;
        handleMouseEvent(e);
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleTouchStart = (e) => {
        if (disabled) return;
        e.preventDefault();
        isDragging.current = true;
        handleMouseEvent(e);
    };

    const handleTouchMove = (e) => {
        if (disabled || !isDragging.current) return;
        e.preventDefault();
        handleMouseEvent(e);
    };

    const handleTouchEnd = (e) => {
        if (disabled) return;
        e.preventDefault();
        isDragging.current = false;
    };

    useEffect(() => {
        if (mode) {
            setSelectedAmPm(mode === '12' ? 'am' : undefined);
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove, {passive: false});
        window.addEventListener("touchend", handleTouchEnd);
        window.addEventListener("touchcancel", handleTouchEnd);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [mode, timeMode, disabled]);

    const getHandStyle = () => {
        let targetAngle, handLength;

        if (timeMode === "second" && enabledParts.second) {
            targetAngle = selectedSecond * 6;
            handLength = "44%";
        } else if (timeMode === "minute" && enabledParts.minute) {
            targetAngle = selectedMinute * 6;
            handLength = "44%";
        } else {
            if (mode === "12") {
                targetAngle = (selectedHour % 12) * 30;
                handLength = "36%";
            } else {
                targetAngle = (selectedHour % 12) * 30;
                if (selectedHour > 12) {
                    handLength = "21%";
                } else {
                    handLength = "36%";
                }
            }
        }

        let normalizedTarget = ((targetAngle % 360) + 360) % 360;

        let currentAngle = continuousAngle.current;
        let currentNormalized = ((currentAngle % 360) + 360) % 360;

        let delta = normalizedTarget - currentNormalized;

        if (delta > 180) {
            delta = delta - 360;
        } else if (delta < -180) {
            delta = delta + 360;
        }

        const newAngle = currentAngle + delta;
        continuousAngle.current = newAngle;

        return {
            transform: `rotate(${newAngle}deg)`,
            height: handLength,
        };
    };
    const handStyle = getHandStyle();

    const setTimeModeHandler = (mode) => {
        if (disabled) return;
        setTimeMode(mode);
    };

    const getHour = () => {
        return selectedHour.toString().padStart(2, '0');
    };
    const getMinute = () => {
        return selectedMinute.toString().padStart(2, '0');
    };
    const getSecond = () => {
        return selectedSecond.toString().padStart(2, '0');
    };
    const handleAmPm = (value) => {
        setSelectedAmPm(value);
        if (onChange) {
            onChange({hour: selectedHour, minute: selectedMinute, second: selectedSecond, ampm: value});
        }
    };

    const activeButtons = getActiveButtons();
    const getToggleLabel = (mode: "hour" | "minute" | "second", label: string) => {
        if(mode === "hour") {
            return labels?.toggleHourLabel || label;
        }
        if(mode === "minute") {
            return labels?.toggleMinuteLabel || label;
        }
        if(mode === "second") {
            return labels?.toggleSecondLabel || label;
        }
        return label;
    }

    return (
        <div className={`naria-time-picker ${classNames?.root || ''} ${disabled ? 'naria-time-picker--disabled' : ''}`}
             data-class-prop="root">
            <div className={`naria-time-picker__wrapper ${classNames?.wrapper || ''}`} data-class-prop="wrapper">
                <div className={`naria-time-picker__controls ${classNames?.controls || ''}`} data-class-prop="controls">
                    {
                        enabledParts.hour && mode === '12' ? (
                            <div className={`naria-time-picker__ampm-wrapper ${classNames?.ampmWrapper || ''}`}
                                 data-class-prop="ampmWrapper">
                                <button type="button" onClick={() => handleAmPm('am')}
                                        className={`naria-time-picker__am ${classNames?.am || ''}`}
                                        data-class-prop="am">
                                    {labels?.am || 'AM'}
                                </button>
                                <button type="button" onClick={() => handleAmPm('pm')}
                                        className={`naria-time-picker__pm ${classNames?.pm || ''}`}
                                        data-class-prop="pm">
                                    {labels?.pm || 'PM'}
                                </button>
                            </div>
                        ) : undefined
                    }
                    <div className={`naria-time-picker__toggle-wrapper ${classNames?.toggleWrapper || ''}`}
                         data-class-prop="toggleWrapper">
                        {activeButtons.map((btn, index) => (
                            <React.Fragment key={btn.mode}>
                                <button
                                    type="button"
                                    className={`naria-time-picker__toggle ${classNames?.toggle || ''} ${timeMode === btn.mode ? `naria-time-picker__toggle--active ${classNames?.toggleActive || ''}` : ''}`}
                                    onClick={() => setTimeModeHandler(btn.mode)}
                                    onTouchStart={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setTimeModeHandler(btn.mode);
                                    }}
                                    disabled={disabled}
                                    data-class-prop="toggle"
                                    data-class-prop-active="toggleActive"
                                >
                                    {
                                        isToggleLabelEnable ? <div
                                            className={`naria-time-picker__toggle-label ${classNames?.toggleLabel || ''}`}
                                            data-class-prop="toggleLabel">
                                                {getToggleLabel(btn.mode, btn.label)}
                                        </div> : undefined
                                    }
                                    <div className={`naria-time-picker__toggle-value ${classNames?.toggleValue || ''}`}
                                         data-class-prop="toggleValue">
                                        {btn.mode === 'hour' && getHour()}
                                        {btn.mode === 'minute' && getMinute()}
                                        {btn.mode === 'second' && getSecond()}
                                    </div>
                                </button>
                                {index < activeButtons.length - 1 && (
                                    <span
                                        className={`naria-time-picker__time-separator ${classNames?.timeSeparator || ''}`}
                                        data-class-prop="timeSeparator">:</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div
                    ref={clockRef}
                    className={`naria-time-picker__clock naria-time-picker__clock--mode-${mode} naria-time-picker__clock--${timeMode}-mode ${disabled ? 'naria-time-picker__clock--disabled' : ''} ${classNames?.clock || ''}`}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    data-class-prop="clock"
                >
                    {timeMode === "hour" && enabledParts.hour && hours12.map((hour) => {
                        const angle = (hour * 30 - 90) * (Math.PI / 180);
                        const x = 50 + 42 * Math.cos(angle);
                        const y = 50 + 42 * Math.sin(angle);
                        const isSelected = (mode === "12" && selectedHour === hour) ||
                            (mode === "24" && selectedHour === hour);
                        return (
                            <span
                                key={hour}
                                className={`naria-time-picker__hour-marker naria-time-picker__outer-marker ${isSelected ? 'naria-time-picker__hour-marker--selected' : ''} ${classNames?.hourMarker || ''}`}
                                style={{left: `${x}%`, top: `${y}%`}}
                                data-class-prop="hourMarker">
                                {hour}
                            </span>
                        );
                    })}

                    {timeMode === "hour" && enabledParts.hour && mode === "24" && (
                        <div className={`naria-time-picker__inner-ring ${classNames?.innerRing || ''}`}
                             data-class-prop="innerRing">
                            {hours24.slice(12).map((hour) => {
                                const angle = ((hour - 12) * 30 - 90) * (Math.PI / 180);
                                const radius = 28;
                                const x = 50 + radius * Math.cos(angle);
                                const y = 50 + radius * Math.sin(angle);
                                const isSelected = selectedHour === hour;
                                return (
                                    <span
                                        key={hour}
                                        className={`naria-time-picker__hour-marker naria-time-picker__inner-marker ${isSelected ? 'naria-time-picker__hour-marker--selected' : ''} ${classNames?.hourMarker || ''}`}
                                        style={{left: `${x}%`, top: `${y}%`}}
                                        data-class-prop="hourMarker"
                                    >
                                        {hour}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {(timeMode === "minute" || timeMode === "second") && (
                        <div className={`naria-time-picker__minute-markers ${classNames?.minuteMarkers || ''}`}
                             data-class-prop="minuteMarkers">
                            {minutes.map((unit) => {
                                if (unit % 5 === 0) return null;
                                const angle = (unit * 6 - 90) * (Math.PI / 180);
                                const x = 50 + 45 * Math.cos(angle);
                                const y = 50 + 45 * Math.sin(angle);
                                const isSelected = timeMode === "minute"
                                    ? selectedMinute === unit
                                    : selectedSecond === unit;
                                return (
                                    <div
                                        key={unit}
                                        className={`naria-time-picker__minute-dot ${isSelected ? 'naria-time-picker__minute-dot--selected' : ''} ${classNames?.minuteDot || ''}`}
                                        style={{left: `${x}%`, top: `${y}%`}}
                                        data-class-prop="minuteDot"
                                    />
                                );
                            })}
                        </div>
                    )}

                    {(timeMode === "minute" || timeMode === "second") && (
                        <div
                            className={`naria-time-picker__minute-number-wrapper ${classNames?.minuteNumberWrapper || ''}`}
                            data-class-prop="minuteNumberWrapper">
                            {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((unit) => {
                                const angle = (unit * 6 - 90) * (Math.PI / 180);
                                const x = 50 + 44 * Math.cos(angle);
                                const y = 50 + 44 * Math.sin(angle);
                                const isSelected = timeMode === "minute"
                                    ? selectedMinute === unit
                                    : selectedSecond === unit;
                                return (
                                    <span
                                        key={unit}
                                        className={`naria-time-picker__minute-number ${isSelected ? 'naria-time-picker__minute-number--selected' : ''} ${classNames?.minuteNumber || ''}`}
                                        style={{left: `${x}%`, top: `${y}%`}}
                                        data-class-prop="minuteNumber"
                                    >
                                        {unit.toString().padStart(2, '0')}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    <div
                        className={`naria-time-picker__clock-hand naria-time-picker__clock-hand--${timeMode} ${classNames?.clockHand || ''}`}
                        style={{
                            transform: handStyle.transform,
                            height: handStyle.height,
                        }}
                        data-class-prop="clockHand"
                    />

                    <div className={`naria-time-picker__center-dot ${classNames?.centerDot || ''}`}
                         data-class-prop="centerDot"/>
                </div>
            </div>
        </div>
    );
};

TimePicker.displayName = 'TimePicker';