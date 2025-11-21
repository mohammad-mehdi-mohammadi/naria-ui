import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import './calendar.scss';
import AngleRight from '../../../assets/icons/angle-right.svg?react';
import AnglesRight from '../../../assets/icons/angles-right.svg?react';
import momentHijri from "moment-hijri";
import momentJalali from "jalali-moment";
import {convertMonth, convertWeekDay} from "../utils/convert-month";
import {addZeroToLessTenNumber} from "../utils/add-zero-less-ten-number";

interface Day {
    year: string;
    month: string;
    day: string;
    dayOfWeek: string;
    isCurrent: boolean;
}

export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    mode?: "Gregorian" | "Jalali" | "Hijri";
    classNames?: {
        root?: string;
        prevYear?: string;
        prevMonth?: string;
        nextYear?: string;
        nextMonth?: string;
        monthYear?: string;
        header?: string;
        body?: string;
        months?: string;
        month?: string;
        selectedMonth?: string;
        weekdays?: string;
        weekday?: string;
        days?: string;
        day?: string;
        selectedDay?: string;
    };
    selected?: Date;
    min?: Date;
    max?: Date;
    onChange?: any;
    isDisabled?: boolean;
    icon?: ReactNode;
}

export const Calendar: FC<props> = ({
                                        mode = "Gregorian",
                                        classNames = {
                                            root: "",
                                            prevYear: "",
                                            prevMonth: "",
                                            nextYear: "",
                                            nextMonth: "",
                                            monthYear: "",
                                            header: "",
                                            body: "",
                                            months: "",
                                            month: "",
                                            selectedMonth: "",
                                            weekdays: "",
                                            weekday: "",
                                            days: "",
                                            day: "",
                                            selectedDay: "",
                                        },
                                        selected,
                                        min,
                                        max,
                                        onChange,
                                        icon = null,
                                        isDisabled = false,
                                        ...otherProps
                                    }) => {
    const m = useRef(mode === "Hijri" ? momentHijri() : momentJalali());
    const moment = useRef<any>(mode === "Hijri" ? momentHijri : momentJalali);
    // const today = useRef(m.current);
    const formatType = useRef({
        day: "DD",
        month: "MM",
        year: "YYYY",
        dayType: "day",
        monthType: "month",
        yearType: "year",
    });
    const [selectedDate, setSelectedDate] = useState<any>({
        day: selected ? moment.current(selected).format(`${formatType.current.day}`) : m.current.format(`${formatType.current.day}`),
        month: selected ? moment.current(selected).format(`${formatType.current.month}`) : m.current.format(`${formatType.current.month}`),
        year: selected ? moment.current(selected).format(`${formatType.current.year}`) : m.current.format(`${formatType.current.year}`)
    })
    const [date, setDate] = useState<any>({
        day: selected ? moment.current(selected).format(`${formatType.current.day}`) : m.current.format(`${formatType.current.day}`),
        month: selected ? moment.current(selected).format(`${formatType.current.month}`) : m.current.format(`${formatType.current.month}`),
        year: selected ? moment.current(selected).format(`${formatType.current.year}`) : m.current.format(`${formatType.current.year}`)
    })
    const [month, setMonth] = useState<Day[]>([])
    const [showMonths, setShowMonths] = useState<boolean>(false)
    const daysOfCurrentMonth = useRef([]);
    useEffect(() => {
        if (mode) {
            m.current = mode === "Hijri" ? momentHijri() : momentJalali()
            switch (mode) {
                case "Jalali": {
                    moment.current = momentJalali;
                    formatType.current = {
                        day: "jDD",
                        month: "jMM",
                        year: "jYYYY",
                        dayType: "jDay",
                        monthType: "jMonth",
                        yearType: "jYear",
                    }
                    break
                }
                case "Hijri": {
                    moment.current = momentHijri;
                    formatType.current = {
                        day: "iDD",
                        month: "iMM",
                        year: "iYYYY",
                        dayType: "iDay",
                        monthType: "iMonth",
                        yearType: "iYear",
                    }
                    break
                }
                default: {
                    moment.current = momentJalali;
                    formatType.current = {
                        day: "DD",
                        month: "MM",
                        year: "YYYY",
                        dayType: "day",
                        monthType: "month",
                        yearType: "year",
                    }
                }
            }
        }
        if (selected) {
            if (mode === "Hijri") {
                m.current = (selected as any).clone().locale(momentHijri.locale())
            } else {
                m.current = moment.current(selected, mode === 'Jalali' ? 'fa' : 'en', `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`)
            }
        }
        setSelectedDate({
            day: m.current.format(`${formatType.current.day}`),
            month: m.current.format(`${formatType.current.month}`),
            year: m.current.format(`${formatType.current.year}`)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`)
        )
    }, [mode, selected])
    useEffect(() => {
        setDate({
            day: m.current.format(`${formatType.current.day}`),
            month: m.current.format(`${formatType.current.month}`),
            year: m.current.format(`${formatType.current.year}`)
        })
    }, [selectedDate])

    const onNextMonth = () => {
        m.current = moment.current(`${date.year}/${date.month}/${date.day}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).add(1, showMonths ? formatType.current.yearType : formatType.current.monthType);
        setDate({
            day: m.current.format(formatType.current.day),
            month: m.current.format(formatType.current.month),
            year: m.current.format(formatType.current.year)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
        )
    }
    const onPrevMonth = () => {
        m.current = moment.current(`${date.year}/${date.month}/${date.day}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, showMonths ? formatType.current.yearType : formatType.current.monthType);
        setDate({
            day: m.current.format(formatType.current.day),
            month: m.current.format(formatType.current.month),
            year: m.current.format(formatType.current.year)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
        )
    }
    const onNextYear = () => {
        m.current = moment.current(`${date.year}/${date.month}`, `${formatType.current.year}/${formatType.current.month}`).add(showMonths ? 10 : 1, formatType.current.yearType);
        setDate({
            day: m.current.format(formatType.current.day),
            month: m.current.format(formatType.current.month),
            year: m.current.format(formatType.current.year)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
        )
    }
    const onPrevYear = () => {
        m.current = moment.current(`${date.year}/${date.month}`, `${formatType.current.year}/${formatType.current.month}`).subtract(showMonths ? 10 : 1, formatType.current.yearType);
        setDate({
            day: m.current.format(formatType.current.day),
            month: m.current.format(formatType.current.month),
            year: m.current.format(formatType.current.year)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
        )
    }
    const generateCurrentMonth = (year: string, month: string, day: string, daysOfMonth: number, dayOfFirstMonth: number, dayOfLastMonth: number) => {
        daysOfCurrentMonth.current = []
        if (dayOfFirstMonth > 0) {
            generatePrevMonth(
                moment.current(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.monthType).format(formatType.current.year),
                moment.current(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.monthType).format(formatType.current.month),
                moment.current(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.day).format(formatType.current.day),
                getDayOfMonth(moment.current(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, "day")),
                dayOfFirstMonth)
        }


        for (let i = 1; i <= daysOfMonth; i++) {
            daysOfCurrentMonth.current.push({
                year: year,
                month: month,
                day: i.toString(),
                dayOfWeek: getDayOfWeek(`${year}/${month}/${i.toString()}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
                isCurrent: true
            })
        }
        if (dayOfLastMonth < 7) {
            generateNextMonth(
                moment.current(`${year}/${month}`, `${formatType.current.year}/${formatType.current.month}`).add(1, formatType.current.monthType).format(formatType.current.year),
                moment.current(`${year}/${month}`, `${formatType.current.year}/${formatType.current.month}`).add(1, formatType.current.monthType).format(formatType.current.month),
                dayOfLastMonth)
        }

        setMonth(daysOfCurrentMonth.current)
    }
    const generatePrevMonth = (year: string, month: string, day: string, daysOfMonth: number, dayOfFirstMonth: number) => {
        for (let i = (daysOfMonth - dayOfFirstMonth) + 1; i <= daysOfMonth; i++) {
            daysOfCurrentMonth.current.push({
                year: year,
                month: month,
                day: i.toString(),
                isCurrent: false
            })
        }
    }
    const generateNextMonth = (year: string, month: string, dayOfLastMonth: number) => {
        for (let i = 1; i <= 6 - dayOfLastMonth; i++) {
            daysOfCurrentMonth.current.push({
                year: year,
                month: month,
                day: i.toString(),
                isCurrent: false
            })
        }

    }
    const onDate = (item: Day) => {
        if (!(item.year === selectedDate.year && item.month === selectedDate.month && addZeroToLessTenNumber(+item.day) === selectedDate.day)) {
            m.current = moment.current(`${item.year}/${item.month}/${addZeroToLessTenNumber(+item.day)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`);
            setSelectedDate({
                day: addZeroToLessTenNumber(+item.day),
                month: item.month,
                year: item.year
            })
            if (onChange) {
                onChange(m.current)
            }
        }
    }
    const getDayOfWeek = (date: string, format: string) => {
        switch (mode) {
            case "Jalali": {
                return momentJalali(date, format).jDay()
            }
            case "Hijri": {
                return momentHijri(date, format).day()
            }
            default: {
                return moment.current(date, format).day()
            }
        }
    }
    const getDayOfMonth = (momentX: any) => {
        switch (mode) {
            case "Jalali": {
                return momentX.jDaysInMonth()
            }
            case "Hijri": {
                return momentX.iDaysInMonth()
            }
            default: {
                return momentX.daysInMonth()
            }
        }
    }
    const onShowMonths = () => {
        setShowMonths(prevState => !prevState)
    }
    const onMonth = (month: number) => {
        setShowMonths(prevState => !prevState)
        if (!(selectedDate.year === date.year && date.month === addZeroToLessTenNumber(month))) {
            m.current = moment.current(`${date.year}/${month}`, `${formatType.current.year}/${formatType.current.month}`);
            setSelectedDate({
                ...selectedDate,
                month: addZeroToLessTenNumber(month),
                day: "",
            })
            generateCurrentMonth(
                m.current.format(formatType.current.year),
                m.current.format(formatType.current.month),
                m.current.format(formatType.current.day),
                getDayOfMonth(m.current),
                getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
                getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            )
        }
    }
    /*
        minimum/maximum date of day - BEGIN
    */
    const getMinDayDisable = (item: Day) => {
        return moment.current(`${item.year}/${item.month}/${item.day}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).diff(min) <= 0
    }
    const getMaxDayDisable = (item: Day) => {
        return moment.current(`${item.year}/${item.month}/${item.day}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).diff(max) >= 0
    }
    /*
        minimum/maximum date of day - END
    */
    /*
        minimum/maximum date of month - BEGIN
    */
    const getMinMonthDisable = (index: number) => {
        const diff = moment.current(`${date.year}/${index + 1}`, `${formatType.current.year}/${formatType.current.month}`).diff(min, 'day')
        if (diff > 0) {
            return !diff;
        }
        return getDayOfMonth(m.current) - Math.abs(diff) < 1;
    }
    const getMaxMonthDisable = (index: number) => {
        const diff = moment.current(`${date.year}/${index + 1}`, `${formatType.current.year}/${formatType.current.month}`).diff(max, 'day')
        return !(diff <= 0)
    }
    /*
            minimum/maximum date of month - END
    */
    /*
        minimum/maximum date of prev/next month/year - BEGIN
    */
    const getMinPrevMonthYearDisable = () => {
        return moment.current(`${date.year}/${date.month}`, `${formatType.current.year}/${formatType.current.month}`).diff(min) <= 0;
    }
    const getMaxNextMonthYearDisable = () => {
        const diff = moment.current(`${date.year}/${date.month}`, `${formatType.current.year}/${formatType.current.month}`).diff(max, 'day')
        if (diff > 0) {
            return true
        }
        return getDayOfMonth(m.current) - Math.abs(diff) >= 1;
    }
    /*
        minimum/maximum date of prev/next month/year - END
    */
    return (
        <div className={`naria-calendar ${classNames.root}`} data-class-prop="root">
            <div className={`naria-calendar__header ${classNames.header}`} data-class-prop="header">
                <button type="button" onClick={onPrevYear}
                        className={`naria-calendar__prev-year ${classNames.prevYear}`}
                        disabled={min ? getMinPrevMonthYearDisable() : false} data-class-prop="prevYear">
                    <AnglesRight/>
                </button>
                <button type="button" onClick={onPrevMonth}
                        className={`naria-calendar__prev-month ${classNames.prevMonth}`}
                        disabled={min ? getMinPrevMonthYearDisable() : false} data-class-prop="prevMonth">
                    <AngleRight/>
                </button>
                <button type="button" className={`naria-calendar__month-year ${classNames.monthYear}`}
                        data-class-prop="monthYear" onClick={onShowMonths}>
                    {
                        !showMonths && convertMonth(date.month, mode)
                    } {date.year}
                </button>
                <button type="button" onClick={onNextMonth}
                        className={`naria-calendar__next-month ${classNames.nextMonth}`}
                        disabled={max ? getMaxNextMonthYearDisable() : false} data-class-prop="nextMonth">
                    <AngleRight/>
                </button>
                <button type="button" onClick={onNextYear}
                        className={`naria-calendar__next-year ${classNames.nextYear}`}
                        disabled={max ? getMaxNextMonthYearDisable() : false} data-class-prop="nextYear">
                    <AnglesRight/>
                </button>
            </div>
            <div className={`naria-calendar__body ${classNames.body}`} data-class-prop="body">
                {
                    showMonths ? (
                        <div className={`naria-calendar__months ${classNames.months}`} data-class-prop="months">
                            {
                                [...Array(12)].map((_, index) => {
                                    return <button type="button" key={index + 1}
                                                   disabled={(min ? getMinMonthDisable(index) : false) || (max ? getMaxMonthDisable(index) : false)}
                                                   className={`naria-calendar__month ${classNames.month} ${selectedDate.year === date.year && selectedDate.month === addZeroToLessTenNumber(index + 1) ? `naria-calendar__month--selected ${classNames.selectedMonth}` : ''}`}
                                                   onClick={() => onMonth(index + 1)}
                                                   data-class-prop="month">{convertMonth(index + 1, mode)}</button>
                                })
                            }
                        </div>
                    ) : (
                        <>
                            <div className={`naria-calendar__weekdays ${classNames.weekdays}`}
                                 data-class-prop="weekdays">
                                {
                                    [...Array(7)].map((_, index) => {
                                        return <div key={index}
                                                    className={`naria-calendar__weekday ${classNames.weekday}`}
                                                    data-class-prop="weekday">{convertWeekDay(index + 1, mode)}</div>
                                    })
                                }
                            </div>
                            <div className={`naria-calendar__days ${classNames.days}`} data-class-prop="days">
                                {
                                    month.map((item: any, index: number) => {
                                        return <button type="button" key={index}
                                                       disabled={(min ? getMinDayDisable(item) : false) || (max ? getMaxDayDisable(item) : false) || !item.isCurrent}
                                                       className={`naria-calendar__day ${classNames.day} ${selectedDate.year === item.year && selectedDate.month === item.month && selectedDate.day === addZeroToLessTenNumber(item.day) ? `naria-calendar__day--selected ${classNames.selectedDay}` : ''}`}
                                                       onClick={() => onDate(item)} data-class-prop="day">{item.day}
                                        </button>
                                    })
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

