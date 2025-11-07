import React, {FC, ReactNode, useEffect, useRef, useState} from "react";
import './calendar.scss';
import AngleRight from '../../../assets/icons/angle-right.svg?react';
import AnglesRight from '../../../assets/icons/angles-right.svg?react';
import moment, {Moment} from "jalali-moment";
import {convertMonth, convertWeekDay} from "../utils/convert-month";

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
        button: string;
        loading: {
            wrapper: string;
            color: string;
        };
    };
    value: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: ReactNode;
}

export const Calendar: FC<props> = ({
                                        mode = "Gregorian",
                                        classNames = {
                                            button: "",
                                            loading: {
                                                wrapper: "",
                                                color: ""
                                            }
                                        },
                                        value,
                                        icon = null,
                                        isLoading = false,
                                        isDisabled = false,
                                        ...otherProps
                                    }) => {
    const m = useRef(moment());
    const today = useRef(m.current);
    const formatType = useRef({
        day: "DD",
        month: "MM",
        year: "YYYY",
        dayType: "day",
        monthType: "month",
        yearType: "year",
    });
    const [selectedDate, setSelectedDate] = useState<any>(m.current.format(`${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`))
    const [month, setMonth] = useState<Day[]>([])
    const [showMonths, setShowMonths] = useState<boolean>(false)
    const daysOfCurrentMonth = useRef([]);
    const [monthDetail, setMonthDetail] = useState<any>({
        month: 0,
        year: 0
    })
    const [currentMonthDetail, setCurrentMonthDetail] = useState<any>({
        month: 0,
        year: 0
    })
    useEffect(() => {
        switch (mode) {
            case "Jalali": {
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
                formatType.current = {
                    day: "DD",
                    month: "MM",
                    year: "YYYY",
                    dayType: "day",
                    monthType: "month",
                    yearType: "year",
                }
                break
            }
            default: {
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
        setMonthDetail({
            month: m.current.format(formatType.current.month),
            year: m.current.format(formatType.current.year)
        })
        generateCurrentMonth(
            m.current.format(formatType.current.year),
            m.current.format(formatType.current.month),
            m.current.format(formatType.current.day),
            getDayOfMonth(m.current),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`),
            getDayOfWeek(`${m.current.format(formatType.current.year)}/${m.current.format(formatType.current.month)}/${getDayOfMonth(m.current)}`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`)
        )
    }, [mode])

    const onNextMonth = () => {
        m.current = moment(`${monthDetail.year}/${monthDetail.month}`, `${formatType.current.year}/${formatType.current.month}`).add(1, showMonths ? formatType.current.yearType : formatType.current.monthType);
        setMonthDetail({
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
        m.current = moment(`${monthDetail.year}/${monthDetail.month}`, `${formatType.current.year}/${formatType.current.month}`).subtract(1, showMonths ? formatType.current.yearType : formatType.current.monthType);
        setMonthDetail({
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
        m.current = moment(`${monthDetail.year}/${monthDetail.month}`, `${formatType.current.year}/${formatType.current.month}`).add(showMonths ? 10 : 1, formatType.current.yearType);
        setMonthDetail({
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
        m.current = moment(`${monthDetail.year}/${monthDetail.month}`, `${formatType.current.year}/${formatType.current.month}`).subtract(showMonths ? 10 : 1, formatType.current.yearType);
        setMonthDetail({
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
                moment(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.dayType).format(formatType.current.year),
                moment(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.dayType).format(formatType.current.month),
                moment(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.dayType).format(formatType.current.day),
                getDayOfMonth(moment(`${year}/${month}/01`, `${formatType.current.year}/${formatType.current.month}/${formatType.current.day}`).subtract(1, formatType.current.dayType)),
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
                moment(`${year}/${month}`, `${formatType.current.year}/${formatType.current.month}`).add(1, formatType.current.monthType).format(formatType.current.year),
                moment(`${year}/${month}`, `${formatType.current.year}/${formatType.current.month}`).add(1, formatType.current.monthType).format(formatType.current.month),
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
        setSelectedDate(`${item.year}/${item.month}/${+item.day < 10 ? "0" + item.day : item.day}`)
    }
    const getDayOfWeek = (date: string, format: string) => {
        switch (mode) {
            case "Jalali": {
                return moment(date, format).jDay()
            }
            case "Hijri": {
                return moment(date, format).day()
            }
            default: {
                return moment(date, format).day()
            }
        }
    }
    const getDayOfMonth = (momentX: Moment) => {
        switch (mode) {
            case "Jalali": {
                return momentX.jDaysInMonth()
            }
            case "Hijri": {
                return momentX.daysInMonth()
            }
            default: {
                return momentX.daysInMonth()
            }
        }
    }
    const onShowMonths = () => {
        setShowMonths(prevState => !prevState)
    }
    return (
        <div className="nariaCalendar">
            <div className="nariaCalendarHeader">
                <button onClick={onPrevYear} className="nariaPrevYear">
                    <AnglesRight/>
                </button>
                <button onClick={onPrevMonth} className="nariaPrevMonth">
                    <AngleRight/>
                </button>
                <button className="nariaMonthYear" onClick={onShowMonths}>
                    {
                        !showMonths && convertMonth(monthDetail.month, mode)
                    } {monthDetail.year}
                </button>
                <button onClick={onNextMonth} className="nariaNextMonth">
                    <AngleRight/>
                </button>
                <button onClick={onNextYear} className="nariaNextYear">
                    <AnglesRight/>
                </button>
            </div>
            <div className="nariaCalendarBody">

                {
                    showMonths ? (
                        <div className="nariaCalendarMonths">
                            {
                                [...Array(12)].map((_, index) => {
                                    return <button key={index}>{convertMonth(index + 1, mode)}</button>
                                })
                            }
                        </div>
                    ) : (
                        <>
                            <div className="nariaCalendarWeekdays">
                                {
                                    [...Array(7)].map((_, index) => {
                                        return <div key={index}>{convertWeekDay(index + 1, mode)}</div>
                                    })
                                }
                            </div>
                            <div className="nariaCalendarDays">
                                {
                                    month.map((item: any, index: number) => {
                                        return <button key={index} disabled={!item.isCurrent}
                                                       className={`nariaCalendarDay ${selectedDate === `${item.year}/${item.month}/${(item.day < 10 ? `0${item.day}` : item.day)}` ? "nariaCalendarDay-selected" : ''}`}
                                                       onClick={() => onDate(item)}>{item.day}</button>
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

