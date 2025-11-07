export const convertMonth = (month: number, mode: "Gregorian" | "Jalali" | "Hijri") => {

    switch (mode) {
        case "Jalali": {
            switch (+month) {
                case 1:
                    return "فروردین";
                case 2:
                    return "اردیبهشت";
                case 3:
                    return "خرداد";
                case 4:
                    return "تیر";
                case 5:
                    return "مرداد";
                case 6:
                    return "شهریور";
                case 7:
                    return "مهر";
                case 8:
                    return "آبان";
                case 9:
                    return "آذر";
                case 10:
                    return "دی";
                case 11:
                    return "بهمن";
                case 12:
                    return "اسفند";
            }
            break
        }
        case "Hijri": {
            switch (+month) {
                case 1:
                    return "ٱلْمُحَرَّم";
                case 2:
                    return "صَفَر";
                case 3:
                    return "رَبِيع‌ٱلْأَوَّل";
                case 4:
                    return "رَبِيع‌ٱلثَّانِي";
                case 5:
                    return "جُمَادَىٰ‌ٱلْأُولَىٰ";
                case 6:
                    return "جُمَادَىٰ‌ٱلثَّانِيَة";
                case 7:
                    return "رَجَب";
                case 8:
                    return "شَعْبَان";
                case 9:
                    return "رَمَضَان";
                case 10:
                    return "شَوَّال";
                case 11:
                    return "ذُو‌ٱلْقَعْدَة";
                case 12:
                    return "ذُو‌ٱلْحِجَّة";
            }
            break
        }
        default: {
            switch (+month) {
                case 1:
                    return "January";
                case 2:
                    return "February";
                case 3:
                    return "March";
                case 4:
                    return "April";
                case 5:
                    return "May";
                case 6:
                    return "June";
                case 7:
                    return "July";
                case 8:
                    return "August";
                case 9:
                    return "September";
                case 10:
                    return "October";
                case 11:
                    return "November";
                case 12:
                    return "December";
            }
        }
    }
}

export const convertWeekDay = (day: number, mode: "Gregorian" | "Jalali" | "Hijri") => {

    switch (mode) {
        case "Jalali": {
            switch (+day) {
                case 1:
                    return "ش";
                case 2:
                    return "1ش";
                case 3:
                    return "2ش";
                case 4:
                    return "3ش";
                case 5:
                    return "4ش";
                case 6:
                    return "5ش";
                case 7:
                    return "ج";
            }
            break
        }
        default: {
            switch (+day) {
                case 1:
                    return "Su";
                case 2:
                    return "Mo";
                case 3:
                    return "Tu";
                case 4:
                    return "We";
                case 5:
                    return "Th";
                case 6:
                    return "Fr";
                case 7:
                    return "Sa";
            }
        }
    }
}