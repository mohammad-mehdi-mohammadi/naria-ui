import './App.css'
import {Button, Calendar, Input, Popover, Select, Tabs, Table} from "../lib";
import momentJalali from "jalali-moment";
import momentHijri from "moment-hijri";
import {Modal} from "../lib/components/Modal";
import React, {useEffect, useState} from "react";
import {Checkbox} from "../lib/components/Checkbox/Checkbox";
import {Radio} from "../lib/components/Radio/Radio";
import CheckIcon from '../lib/assets/icons/check.svg?react';
import {Pagination} from "../lib/components/Pagination";
import {TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "../lib/components/Table/Table";
import {Tab, TabContent} from "../lib/components/Tabs/Tabs";
import {Switch} from '../lib/components/Switch';
import {TimePicker} from "../lib/components/TimePicker";

function App() {

    // _________________BEGIN______________
    const [isCheck, setIsCheck] = useState({
        default: false,
        selected: true,
        customIcon: false,
        customContent: false,
        customClass: false,
    })
    // _________________END______________

    // _________________BEGIN______________
    const [isRadio, setIsRadio] = useState({
        default: "test2",
        selected: "test1",
        customIcon: "",
        customContent: "",
        customClass: "",
    })
    useEffect(() => {
        setTimeout(() => {
            setIsRadio({
                ...isRadio,
                selected: "test2"
            })
        }, 1000)
    }, [])
    // _________________END______________

    // _________________BEGIN______________
    const [isOpen, setIsOpen] = useState({
        basicModal: false,
        opaqueModal: false,
        blurModal: false,
        transparentModal: false,
        nonDismissibleModal: false,
        topStartPopover: false,
        topPopover: false,
        topEndPopover: false,
        bottomStartPopover: false,
        bottomPopover: false,
        bottomEndPopover: false,
        rightStartPopover: false,
        rightPopover: false,
        rightEndPopover: false,
        leftStartPopover: false,
        leftPopover: false,
        leftEndPopover: false,
        nested: false,
        nestedPopover: false,
    })
    const fetchApi = () => {
        return async (params = {page: '1', size: '20'}) => {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`http://localhost:3232/api/public/game?${queryString}`, {});
            return response.json();
        };
    }
    // _________________END______________
    // _________________BEGIN______________
    const [page, setPage] = useState({
        default: 1,
        selected: 5,
        customSeparator: 1,
        customClass: 1,
        positions: 1,
    });
    // _________________END______________
    // _________________BEGIN______________
    const invoices = [
        { invoice: "INV-001", paymentStatus: "Paid", paymentMethod: "Credit Card", totalAmount: "$500.00" },
        { invoice: "INV-002", paymentStatus: "Pending", paymentMethod: "PayPal", totalAmount: "$2,000.00" },
    ];
    // _________________END______________
    // _________________BEGIN______________
    const [value, setValue] = useState(4);

    const handleChange = (newValue) => {
        console.log(newValue)
        setValue(newValue);
    };
    // _________________END______________//
    // _________________BEGIN______________//
    const [isEnabled, setIsEnabled] = useState({
        default: false,
        notification: false,
    });
    useEffect(() => {
        setTimeout(() => {
            setIsEnabled({
                ...isEnabled,
                notification: true
            })
        }, 1000)
    }, [])
    // _________________END______________
    // _________________BEGIN______________
    const [selectedTime, setSelectedTime] = useState({ hour: 3, minute: 30, second: 15 });
    const handleTimeChange = (newTime) => {
        console.log('زمان انتخاب شده:', newTime);
        setSelectedTime(newTime);
    };
    // _________________END______________
    return (
        <>
            {/*<h1>Modal</h1>*/}
            {/*<p>Nested</p>*/}
            <button onClick={() => setIsOpen({...isOpen, nested: true})}>Open modal</button>
            <Modal isOpen={isOpen.nested} title="Modal" onOpenChange={(e) => setIsOpen({...isOpen, nested: e})}
                   footer={<>asdadadda</>}>
                <TimePicker
                    mode = "24"
                    onChange={(time) => console.log(time)}
                />
            </Modal>
            {/*<p>Basic usage</p>*/}
            {/*<button onClick={() => setIsOpen({...isOpen, basicModal: true})}>Open modal</button>*/}

            {/*<Modal isOpen={isOpen.basicModal} title="Modal" onOpenChange={(e) => setIsOpen({...isOpen, basicModal: e})}*/}
            {/*       footer={<>asdadadda</>}>*/}
            {/*    <div className="mx-auto max-w-7xl">*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*        Basic usage modal<br/>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            {/*<p>Backdrop</p>*/}
            {/*<button onClick={() => setIsOpen({...isOpen, opaqueModal: true})}>Open opaque modal</button>*/}
            {/*<Modal isOpen={isOpen.opaqueModal} title="Modal" backdrop="opaque"*/}
            {/*       onOpenChange={(e) => setIsOpen({...isOpen, opaqueModal: e})}>*/}
            {/*    <div className="mx-auto max-w-7xl">*/}
            {/*        Open opaque modal*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            {/*<button onClick={() => setIsOpen({...isOpen, blurModal: true})}>Open blur modal</button>*/}
            {/*<Modal isOpen={isOpen.blurModal} title="Modal" backdrop="blur"*/}
            {/*       onOpenChange={(e) => setIsOpen({...isOpen, blurModal: e})}>*/}
            {/*    <div className="mx-auto max-w-7xl">*/}
            {/*        Open blur modal*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            {/*<button onClick={() => setIsOpen({...isOpen, transparentModal: true})}>Open transparent modal</button>*/}
            {/*<Modal isOpen={isOpen.transparentModal} title="Modal" backdrop="transparent"*/}
            {/*       onOpenChange={(e) => setIsOpen({...isOpen, transparentModal: e})}>*/}
            {/*    <div className="mx-auto max-w-7xl">*/}
            {/*        Open transparent modal*/}
            {/*    </div>*/}
            {/*</Modal>*/}

            {/*<p>Backdrop | Non-dismissible</p>*/}
            {/*<button onClick={() => setIsOpen({...isOpen, nonDismissibleModal: true})}>Open non-dismissible modal*/}
            {/*</button>*/}
            {/*<Modal isOpen={isOpen.nonDismissibleModal} title="Modal" backdropDismissible={false}*/}
            {/*       onOpenChange={(e) => setIsOpen({...isOpen, nonDismissibleModal: e})}>*/}
            {/*    <div className="mx-auto max-w-7xl">*/}
            {/*        Open non-dismissible modal*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            {/*<h1>Popover</h1>*/}
            {/*<p>Basic usage</p>*/}
            {/*<div>*/}
            {/*    <div style={{padding: '300px'}}>*/}

            {/*        <Popover placement="top-start" isOpen={isOpen.topStartPopover} classNames = {{*/}
            {/*            root: "root-custom-class"*/}
            {/*        }}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, topStartPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Top start</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content classNames = {{*/}
            {/*                content: "content-custom-class",*/}
            {/*                backdrop: "backdrop-custom-class"*/}
            {/*            }}>*/}
            {/*                <Calendar mode="Gregorian" onChange={() => {*/}
            {/*                    setIsOpen({...isOpen, topStartPopover: false})*/}
            {/*                }}/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="top" isOpen={isOpen.topPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, topPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Top</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="top-end" isOpen={isOpen.topEndPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, topEndPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Top end</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="bottom-start" isOpen={isOpen.bottomStartPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, bottomStartPopover: e})}>*/}

            {/*            <Popover.Trigger>*/}
            {/*                <button>Bottom start</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="bottom" isOpen={isOpen.bottomPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, bottomPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Bottom</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="bottom-end" isOpen={isOpen.bottomEndPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, bottomEndPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Bottom end</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="right-start" isOpen={isOpen.rightStartPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, rightStartPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Right start</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="right" isOpen={isOpen.rightPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, rightPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Right</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="right-end" isOpen={isOpen.rightEndPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, rightEndPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Bottom end</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="left-start" isOpen={isOpen.leftStartPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, leftStartPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Left start</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="left" isOpen={isOpen.leftPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, leftPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Left</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '300px'}}>*/}
            {/*        <Popover placement="left-end" isOpen={isOpen.leftEndPopover}*/}
            {/*                 onOpenChange={(e) => setIsOpen({...isOpen, leftEndPopover: e})}>*/}
            {/*            <Popover.Trigger>*/}
            {/*                <button>Left end</button>*/}
            {/*            </Popover.Trigger>*/}
            {/*            <Popover.Content>*/}
            {/*                <Calendar mode="Gregorian"/>*/}
            {/*            </Popover.Content>*/}
            {/*        </Popover>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<h1>Calendar</h1>*/}
            {/*<p>Basic usage | Gregorian</p>*/}
            {/*<Calendar mode="Gregorian"/>*/}
            {/*<p>Basic usage | Jalali</p>*/}
            {/*<Calendar mode="Jalali"/>*/}
            {/*<p>Basic usage | Hijri</p>*/}
            {/*<Calendar mode="Hijri"/>*/}
            {/*<p>Default value | Gregorian</p>*/}
            {/*<Calendar mode="Gregorian" selected={momentJalali("2024/03/02")}/>*/}
            {/*<p>Default value | Jalali</p>*/}
            {/*<Calendar mode="Jalali" selected={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}/>*/}
            {/*<p>Default value | Hijri</p>*/}
            {/*<Calendar mode="Hijri" selected={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}/>*/}
            {/*<p>Min date value | Gregorian</p>*/}
            {/*<Calendar mode="Gregorian" min={momentJalali("2025/11/10")}/>*/}
            {/*<p>Min date value | Jalali</p>*/}
            {/*<Calendar mode="Jalali" min={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}/>*/}
            {/*<p>Default value | Hijri</p>*/}
            {/*<Calendar mode="Hijri" min={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}/>*/}
            {/*<p>Max date value | Gregorian</p>*/}
            {/*<Calendar mode="Gregorian" max={momentJalali("2025/11/15")}/>*/}
            {/*<p>Max date value | Jalali</p>*/}
            {/*<Calendar mode="Jalali" max={momentJalali("1404/08/24", "jYYYY/jMM/jDD")}/>*/}
            {/*<p>Max date value | Hijri</p>*/}
            {/*<Calendar mode="Hijri" max={momentHijri("1447/05/26", "iYYYY/iMM/iDD")}/>*/}
            {/*<p>Min and max date value | Gregorian</p>*/}
            {/*<Calendar mode="Gregorian" min={momentJalali("2025/11/10")} max={momentJalali("2025/11/15")}/>*/}
            {/*<p>Min and max date value | Jalali</p>*/}
            {/*<Calendar mode="Jalali" min={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}*/}
            {/*          max={momentJalali("1404/08/24", "jYYYY/jMM/jDD")}/>*/}
            {/*<p>Min and max date value | Hijri</p>*/}
            {/*<Calendar mode="Hijri" min={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}*/}
            {/*          max={momentHijri("1447/05/26", "iYYYY/iMM/iDD")}/>*/}
            {/*<hr/>*/}
            {/*<h1>Button</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Button value="Default"/>*/}
            {/*<p>Loading</p>*/}
            {/*<Button value="Loading" isLoading={true}/>*/}
            {/*<p>Disabled</p>*/}
            {/*<Button value="Disabled" isDisabled={true}/>*/}
            {/*<p>Loading | Disabled</p>*/}
            {/*<Button value="Loading | Disabled" isDisabled={true} isLoading={true}/>*/}
            {/*<hr/>*/}
            {/*<h1>Input</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Input title="Default"/>*/}
            {/*<p>Placeholder</p>*/}
            {/*<Input placeholder="Placeholder" title="Placeholder"/>*/}
            {/*<p>Disabled</p>*/}
            {/*<Input disabled={true} placeholder="Placeholder" title="Disabled"/>*/}
            {/*<hr/>*/}
            {/*<h1>Select</h1>*/}
            {/*<p>Primitive list</p>*/}
            {/*<Select options={["Yellow", "Red", "Blue"]} classNames={*/}
            {/*    {*/}
            {/*        input: "input input-bordered w-full",*/}
            {/*        title: "text-[var(--primary-800)] font-bold text-xs mr-2 mb-1.5",*/}
            {/*    }*/}
            {/*}/>*/}
            {/*<p>Non-primitive list</p>*/}
            {/*<Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"*/}
            {/*        value="name"/>*/}
            {/*<p>Disabled</p>*/}
            {/*<Select disabled={true} options={["Yellow", "Red", "Blue"]}/>*/}
            {/*<p>Placeholder</p>*/}
            {/*<Select options={["Yellow", "Red", "Blue"]} placeholder="Custom placeholder"/>*/}
            {/*<p>Selected | Primitive</p>*/}
            {/*<Select options={["Yellow", "Red", "Blue"]} selected="Yellow"/>*/}
            {/*<p>Selected | Non-primitive list</p>*/}
            {/*<Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"*/}
            {/*        value="name" selected={3}/>*/}
            {/*<p>Search with search field | Primitive</p>*/}
            {/*<Select*/}
            {/*    options={["Yellow", "Red", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue", "Blue"]}*/}
            {/*    hasSearch={true}/>*/}
            {/*<p>Search with search field | Non-primitive</p>*/}
            {/*<Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"*/}
            {/*        value="name" hasSearch={true}/>*/}
            {/*<p>Search with search field | Non-primitive | Custom filter prop</p>*/}
            {/*<Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"*/}
            {/*        value="name" hasSearch={true} optionFilterLabel="name"/>*/}
            {/*<p>Search with search field | primitive | Selected</p>*/}
            {/*<Select options={["Yellow", "Red", "Blue"]} selected={"Red"} hasSearch={true}/>*/}
            {/*<p>Search with search field | Non-primitive | Selected</p>*/}
            {/*<Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]}*/}
            {/*        label="id" value="name"*/}
            {/*        hasSearch={true}*/}
            {/*        selected={2}/>*/}
            {/*<hr/>*/}
            {/*<h1>Call api</h1>*/}
            {/*<p>Basic usage</p>*/}
            {/*<Select fetch={fetchApi()} label="id" value="title"/>*/}
            {/*<p>Pagination</p>*/}
            {/*<Select closeIcon={false} fetch={fetchApi()} label="id"*/}
            {/*        value="title"*/}
            {/*        pagination={{*/}
            {/*            pageLabel: 'offset',*/}
            {/*            sizeLabel: 'limit'*/}
            {/*        }}/>*/}
            {/*<p>Pagination | Custom page and size</p>*/}
            {/*<Select closeIcon={<div>CLOSE</div>} fetch={fetchApi()}*/}
            {/*        label="id" value="title"*/}
            {/*        pagination={{*/}
            {/*            page: 5,*/}
            {/*            pageLabel: 'offset',*/}
            {/*            size: 10,*/}
            {/*            sizeLabel: 'limit'*/}
            {/*        }}/>*/}
            {/*<p>Pagination | api + has search + set api header</p>*/}
            {/*<Select fetch={fetchApi()} label="id" value="name"*/}
            {/*        onSelectChange = {(e) => console.log(e)}*/}
            {/*        selected = {{*/}
            {/*            "id": 1,*/}
            {/*            "name": "Classic White Crew Neck T-Shirt",*/}
            {/*        }}*/}
            {/*        pagination={{*/}
            {/*            page: 1,*/}
            {/*            pageLabel: 'page',*/}
            {/*            size: 10,*/}
            {/*            sizeLabel: 'size',*/}
            {/*            searchLabel: 'title',*/}
            {/*        }}/>*/}
            {/*<hr/>*/}
            {/*<h1>Checkbox</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Checkbox checked={isCheck.default} disabled={true} onChange={(e) => {*/}
            {/*    setIsCheck({*/}
            {/*        ...isCheck,*/}
            {/*        default: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Checkbox.Content>*/}
            {/*        Default*/}
            {/*    </Checkbox.Content>*/}
            {/*</Checkbox>*/}

            {/*<p>Custom Classes</p>*/}
            {/*<Checkbox checked={isCheck.customClass} classNames={{*/}
            {/*    root: "root-custom-class"*/}
            {/*}} onChange={(e) => {*/}
            {/*    setIsCheck({*/}
            {/*        ...isCheck,*/}
            {/*        customClass: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Checkbox.Indicator classNames={*/}
            {/*        {*/}
            {/*            indicator: "indicator-custom-class",*/}
            {/*            icon: "icon-custom-class"*/}
            {/*        }*/}
            {/*    } />*/}
            {/*    <Checkbox.Content classNames={{*/}
            {/*        content: "content-custom-class"*/}
            {/*    }}>*/}
            {/*        Custom Classes*/}
            {/*    </Checkbox.Content>*/}
            {/*</Checkbox>*/}

            {/*<p>Selected</p>*/}
            {/*<Checkbox checked={isCheck.selected} onChange={(e) => {*/}
            {/*    setIsCheck({*/}
            {/*        ...isCheck,*/}
            {/*        selected: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Checkbox.Content>*/}
            {/*        Selected*/}
            {/*    </Checkbox.Content>*/}
            {/*</Checkbox>*/}

            {/*<p>Custom Indicator</p>*/}
            {/*<Checkbox checked={isCheck.customIcon} onChange={(e) => {*/}
            {/*    console.log(e)*/}
            {/*    setIsCheck({*/}
            {/*        ...isCheck,*/}
            {/*        customIcon: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Checkbox.Indicator>*/}
            {/*        <svg fill="currentColor" viewBox="0 0 24 24">*/}
            {/*            <path*/}
            {/*                d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"*/}
            {/*                fill="currentColor"*/}
            {/*            />*/}
            {/*        </svg>*/}
            {/*    </Checkbox.Indicator>*/}
            {/*    <Checkbox.Content>*/}
            {/*        Custom Indicator*/}
            {/*    </Checkbox.Content>*/}
            {/*</Checkbox>*/}

            {/*<p>Custom Content | With Description</p>*/}
            {/*<Checkbox checked={isCheck.customContent} onChange={(e) => {*/}
            {/*    console.log(e)*/}
            {/*    setIsCheck({*/}
            {/*        ...isCheck,*/}
            {/*        customContent: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Checkbox.Content>*/}
            {/*        <p>Title</p>*/}
            {/*        <p style={{fontWeight: "bold"}}>Description</p>*/}
            {/*    </Checkbox.Content>*/}
            {/*</Checkbox>*/}
            {/*<hr/>*/}
            {/*<h1>Radio</h1>*/}
            {/*<p>Default</p>*/}
            {/*<div>*/}
            {/*    <Radio value="test2" selected = {isRadio.default}  name = "default-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            default: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            Default*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*    <Radio value="test1" selected = {isRadio.default} name = "default-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            default: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            Default*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*</div>*/}
            {/*<p>Custom Class</p>*/}
            {/*<div>*/}
            {/*    <Radio value="test2" name = "custom-class-radio" classNames={{*/}
            {/*        root: "root-custom-class"*/}
            {/*    }} onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            customClass: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Indicator classNames={*/}
            {/*            {*/}
            {/*                indicator: "indicator-custom-class",*/}
            {/*                icon: "icon-custom-class"*/}
            {/*            }*/}
            {/*        } />*/}
            {/*        <Radio.Content className="content-custom-class">*/}
            {/*            Custom Class*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*<Radio value="test1" name="custom-class-radio" classNames={{*/}
            {/*    root: "root-custom-class"*/}
            {/*}} onChange={(e) => {*/}
            {/*    console.log(e)*/}
            {/*    setIsRadio({*/}
            {/*        ...isRadio,*/}
            {/*        customClass: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Radio.Indicator classNames={{*/}
            {/*            indicator: "indicator-custom-class",*/}
            {/*            icon: "icon-custom-class"*/}
            {/*        }}/>*/}
            {/*    <Radio.Content classNames={{*/}
            {/*            content: "content-custom-class"*/}
            {/*        }}>*/}
            {/*        Custom Class*/}
            {/*    </Radio.Content>*/}
            {/*</Radio>*/}
            {/*</div>*/}
            {/*<p>Selected</p>*/}
            {/*<div>*/}
            {/*    <Radio value="test2" selected = {isRadio.selected} name = "selected-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            selected: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            Selected*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*    <Radio value="test1" selected = {isRadio.selected} name = "selected-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            selected: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            Selected*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*</div>*/}
            {/*<p>Custom Indicator</p>*/}
            {/*<div>*/}
            {/*    <Radio value="test3" name = "custom-icon-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            customIcon: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Indicator>*/}
            {/*            <CheckIcon />*/}
            {/*        </Radio.Indicator>*/}
            {/*        <Radio.Content>*/}
            {/*            Custom Indicator*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*    <Radio value="test4" name = "custom-icon-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            customIcon: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Indicator>*/}
            {/*            <CheckIcon />*/}
            {/*        </Radio.Indicator>*/}
            {/*        <Radio.Content>*/}
            {/*            Custom Indicator*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*</div>*/}

            {/*<p>Custom Content | With Description</p>*/}
            {/*<div>*/}
            {/*    <Radio value="test4" name = "custom-content-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            customContent: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            <p>Title</p>*/}
            {/*            <p style={{fontWeight: "bold"}}>Description</p>*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*    <Radio value="test5" name = "custom-content-radio" onChange={(e) => {*/}
            {/*        console.log(e)*/}
            {/*        setIsRadio({*/}
            {/*            ...isRadio,*/}
            {/*            customContent: e*/}
            {/*        })*/}
            {/*    }}>*/}
            {/*        <Radio.Content>*/}
            {/*            <p>Title</p>*/}
            {/*            <p style={{fontWeight: "bold"}}>Description</p>*/}
            {/*        </Radio.Content>*/}
            {/*    </Radio>*/}
            {/*</div>*/}
            {/*<hr/>*/}
            {/*<h1>Pagination</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Pagination page={page.default} size={10} total={1000} onPageChange={(e) => {*/}
            {/*    setPage({*/}
            {/*        ...page,*/}
            {/*        default: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Pagination.Prev/>*/}
            {/*    <Pagination.Pages/>*/}
            {/*    <Pagination.Next/>*/}
            {/*    <Pagination.Content>*/}
            {/*        {({page, totalPages}) => (*/}
            {/*            <span style={{marginLeft: "10px"}}>*/}
            {/*  صفحه {page} از {totalPages}*/}
            {/*</span>*/}
            {/*        )}*/}
            {/*    </Pagination.Content>*/}
            {/*</Pagination>*/}
            {/*<p>Selected</p>*/}
            {/*<Pagination page={page.selected} size={10} total={100} onPageChange={(e) => {*/}
            {/*    setPage({*/}
            {/*        ...page,*/}
            {/*        selected: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Pagination.Prev/>*/}
            {/*    <Pagination.Pages/>*/}
            {/*    <Pagination.Next/>*/}
            {/*    <Pagination.Content>*/}
            {/*        {({page, totalPages}) => (*/}
            {/*            <span style={{marginLeft: "10px"}}>*/}
            {/*  صفحه {page} از {totalPages}*/}
            {/*</span>*/}
            {/*        )}*/}
            {/*    </Pagination.Content>*/}
            {/*</Pagination>*/}
            {/*<p>Custom Separator, Next, Prev</p>*/}
            {/*<Pagination page={page.customSeparator} size={10} total={100} onPageChange={(e) => {*/}
            {/*    setPage({*/}
            {/*        ...page,*/}
            {/*        customSeparator: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Pagination.Prev>*/}
            {/*        <>{"<-"}</>*/}
            {/*    </Pagination.Prev>*/}
            {/*    <Pagination.Pages separator={<>***</>}/>*/}
            {/*    <Pagination.Next>*/}
            {/*        <>{"->"}</>*/}
            {/*    </Pagination.Next>*/}
            {/*    <Pagination.Content>*/}
            {/*        {({page, totalPages}) => (*/}
            {/*            <span style={{marginLeft: "10px"}}>*/}
            {/*  صفحه {page} از {totalPages}*/}
            {/*</span>*/}
            {/*        )}*/}
            {/*    </Pagination.Content>*/}
            {/*</Pagination>*/}
            {/*<p>Custom Class</p>*/}
            {/*<Pagination page={page.customClass} classNames={{*/}
            {/*    root: "custom-class"*/}
            {/*}} size={10} total={100} onPageChange={(e) => {*/}
            {/*    setPage({*/}
            {/*        ...page,*/}
            {/*        customClass: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Pagination.Prev classNames={{*/}
            {/*        prev: "prev-custom-class"*/}
            {/*    }}/>*/}
            {/*    <Pagination.Pages separator={<>***</>} classNames={{*/}
            {/*        page: "page-custom-class",*/}
            {/*        active: "active-custom-class",*/}
            {/*        separator: "separator-custom-class",*/}
            {/*        pagesContainer: "pages-container-custom-class",*/}
            {/*    }}/>*/}
            {/*    <Pagination.Next classNames={{*/}
            {/*        next: "prev-custom-class"*/}
            {/*    }}/>*/}
            {/*    <Pagination.Content classNames={{*/}
            {/*        content: "content-custom-class"*/}
            {/*    }}>*/}
            {/*        {({page, totalPages}) => (*/}
            {/*            <span style={{marginLeft: "10px"}}>*/}
            {/*  صفحه {page} از {totalPages}*/}
            {/*</span>*/}
            {/*        )}*/}
            {/*    </Pagination.Content>*/}
            {/*</Pagination>*/}
            {/*<p>Change Positions</p>*/}
            {/*<Pagination page={page.positions} size={10} total={100} onPageChange={(e) => {*/}
            {/*    setPage({*/}
            {/*        ...page,*/}
            {/*        positions: e*/}
            {/*    })*/}
            {/*}}>*/}
            {/*    <Pagination.Pages separator={<>***</>}/>*/}
            {/*    <Pagination.Prev />*/}
            {/*    <Pagination.Next/>*/}
            {/*    <Pagination.Content>*/}
            {/*        {({page, totalPages}) => (*/}
            {/*            <span style={{marginLeft: "10px"}}>*/}
            {/*  صفحه {page} از {totalPages}*/}
            {/*</span>*/}
            {/*        )}*/}
            {/*    </Pagination.Content>*/}
            {/*</Pagination>*/}
            {/*<hr/>*/}
            {/*<h1>Table</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Table>*/}
            {/*    <TableHeader>*/}
            {/*        <TableRow>*/}
            {/*            <TableHead className="w-[100px]">Invoice</TableHead>*/}
            {/*            <TableHead>Status</TableHead>*/}
            {/*            <TableHead>Method</TableHead>*/}
            {/*            <TableHead className="text-right">Amount</TableHead>*/}
            {/*        </TableRow>*/}
            {/*    </TableHeader>*/}

            {/*    <TableBody>*/}
            {/*        {invoices.map((invoice) => (*/}
            {/*            <TableRow key={invoice.invoice}>*/}
            {/*                <TableCell className="font-medium" data-label="نام مشتری">{invoice.invoice}</TableCell>*/}
            {/*                <TableCell data-label="نام مشتری">{invoice.paymentStatus}</TableCell>*/}
            {/*                <TableCell data-label="نام مشتری">{invoice.paymentMethod}</TableCell>*/}
            {/*                <TableCell className="text-right" data-label="نام مشتری">{invoice.totalAmount}</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        ))}*/}
            {/*    </TableBody>*/}

            {/*    <TableFooter>*/}
            {/*        <TableRow>*/}
            {/*            <TableCell colSpan={3}>Total</TableCell>*/}
            {/*            <TableCell className="text-right">$2,500.00</TableCell>*/}
            {/*        </TableRow>*/}
            {/*    </TableFooter>*/}
            {/*</Table>*/}

            {/*<hr/>*/}
            {/*<h1>Tabs</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Tabs*/}
            {/*    value={value}*/}
            {/*    onChange={handleChange}*/}
            {/*>*/}
            {/*    <Tab label="Item One" />*/}
            {/*    <Tab label="Item Two" />*/}
            {/*    <Tab label="Item Three" />*/}
            {/*    <Tab label="Item Four" />*/}
            {/*    <Tab label="Item Five" />*/}
            {/*    <Tab label="Item Six" />*/}
            {/*    <Tab label="Item Seven" />*/}
            
            {/*    <TabContent label="Item One" value={value} index={0} classNames={{*/}
            {/*        content: 'content-custom-class',*/}
            {/*        active: 'active-custom-class',*/}
            {/*    }}>*/}
            {/*        Test 1*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Two" value={value} index={1}>*/}
            {/*        Test 2*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Three" value={value} index={2}>*/}
            {/*        Test 3*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Four" value={value} index={3}>*/}
            {/*        Test 4*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Five" value={value} index={4}>*/}
            {/*        Test 5*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Six" value={value} index={5}>*/}
            {/*        Test 6*/}
            {/*    </TabContent>*/}
            
            {/*    <TabContent label="Item Seven" value={value} index={6}>*/}
            {/*        Test 7*/}
            {/*    </TabContent>*/}
            {/*</Tabs>*/}
            {/*<hr/>*/}
            {/*<h1>Switch</h1>*/}
            {/*<p>Default</p>*/}
            {/*<Switch*/}
            {/*    checked={isEnabled.default}*/}
            {/*    onChange={(e) => setIsEnabled({*/}
            {/*        ...isEnabled,*/}
            {/*        default: e*/}
            {/*    })}*/}
            {/*/>*/}
            {/*<p>Label</p>*/}
            {/*<Switch*/}
            {/*    checked={isEnabled.notification}*/}
            {/*    onChange={(e) => setIsEnabled({*/}
            {/*        ...isEnabled,*/}
            {/*        notification: e*/}
            {/*    })}*/}
            {/*    label="دریافت نوتیفیکیشن"*/}
            {/*/>*/}
            {/*<p>Label Position | JSX</p>*/}
            {/*<Switch*/}
            {/*    label={*/}
            {/*        <div>*/}
            {/*            <div className="flex items-center gap-2">*/}
            {/*                <span className="text-xl">🌙</span>*/}
            {/*                <span>حالت تاریک</span>*/}
            {/*            </div>*/}
            {/*            <p>Test</p>*/}
            {/*        </div>*/}
            {/*    }*/}
            {/*    labelPosition="left"*/}
            {/*/>*/}
            {/*<p>Disabled</p>*/}
            {/*<Switch*/}
            {/*    disabled*/}
            {/*    checked={true}*/}
            {/*    label="غیرفعال"*/}
            {/*/>*/}
            <hr/>
            <h1>Time Picker</h1>
            <p>Default</p>
            <TimePicker
                onChange={(time) => console.log(time)}
            />
            <p>24H</p>
            <TimePicker
                mode = "24"
                onChange={(time) => console.log(time)}
            />
            <p>Only hour</p>
            <p>Only hour and minute</p>
            <TimePicker
                enabledParts={{ hour: true, minute: true, second: false }}
                onChange={(time) => console.log(time)}
            />
            <p>Only hour</p>
            <TimePicker
                enabledParts={{ hour: true, minute: false, second: false }}
                onChange={(time) => console.log(time)}
            />

            <p>Hour, minute, second (All)</p>
            <TimePicker
                enabledParts={{ hour: true, minute: true, second: true }}
                labels = {{
                    toggleMinuteLabel: 'Minute_Test',
                    pm: 'PM_TEST',
                }}
                onChange={(time) => console.log(time)}
            />

            <p>Only minute and second</p>
            <TimePicker
                enabledParts={{ hour: false, minute: true, second: true }}
                initialPart="minute"
                onChange={(time) => console.log(time)}
            />

            <p>Initial time</p>
            <TimePicker
                enabledParts={{ hour: true, minute: true, second: true }}
                value={{ hour: 14, minute: 30, second: 45 }}
                onChange={(time) => console.log(time)}
            />
        </>
    )
}

export default App;

