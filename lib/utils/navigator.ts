// navigation.lib.ts
import { useEffect, useState } from "react";

let NARIA_URL = undefined;

// توابع اصلی کتابخانه
export const removeNavigation = (state: string) => {
    if (typeof window === 'undefined') return;

    let newUrl;
    if (window.location.hash.includes("/")) {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`/#` + state, '')}`;
    } else {
        newUrl = `${window.location.pathname}${window.location.search}${window.location.hash.replace(`#` + state, '')}`;
    }

    NARIA_URL = `${window.location.origin}${newUrl}`;
    window.history.replaceState(null, '', newUrl);

    // ارسال رویداد سفارشی برای اطلاع‌رسانی به کامپوننت‌ها
    window.dispatchEvent(new CustomEvent('navigationChanged', {
        detail: { type: 'remove', state, url: newUrl }
    }));
};

export const addNavigation = (state: string) => {
    if (typeof window === 'undefined') return;

    if (!window.location.hash) {
        window.location.hash = state;
    } else {
        window.location.hash = window.location.hash + "/#" + state;
    }

    // ارسال رویداد سفارشی
    window.dispatchEvent(new CustomEvent('navigationChanged', {
        detail: { type: 'add', state, url: window.location.href }
    }));
};

// هوک اصلی برای تشخیص تغییرات
export const onHashChanges = (state: string) => {
    const [isHashChanged, setIsHashChanged] = useState(false);
    const [currentState, setCurrentState] = useState(state);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        NARIA_URL = window.location.href;

        const handleHashChange = (e: HashChangeEvent) => {
            const currentHash = window.location.hash;

            // بررسی وضعیت هش
            if (currentHash.includes(state)) {
                const stateIndex = currentHash.indexOf(state);
                const isStateAtEnd = stateIndex + state.length === currentHash.length;

                if (isStateAtEnd) {
                    if (window.location.href === NARIA_URL) {
                        // حذف هش و به‌روزرسانی URL
                        const newUrl = `${window.location.pathname}${window.location.search}`;
                        window.history.replaceState(null, '', newUrl);
                        NARIA_URL = `${window.location.origin}${newUrl}`;
                        setIsHashChanged(true);
                    } else {
                        setIsHashChanged(false);
                        const newUrl = `${window.location.pathname}${window.location.search}`;
                        NARIA_URL = `${window.location.origin}${newUrl}`;
                    }
                }
            } else {
                setIsHashChanged(true);
            }
        };

        // گوش دادن به رویدادهای مختلف
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
        };
    }, [state]);

    return isHashChanged;
};
