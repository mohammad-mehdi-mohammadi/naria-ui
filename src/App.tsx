import './App.css'
import {Button, Calendar, Input, Popover, Select} from "../lib";
import momentJalali from "jalali-moment";
import momentHijri from "moment-hijri";
import {Modal} from "../lib/components/Modal";
import {useRef} from "react";

function App() {
    const modalBasicUsageRef = useRef(undefined);
    const modalOpaqueRef = useRef(undefined);
    const modalBlurRef = useRef(undefined);
    const modalTransparentRef = useRef(undefined);
    const modalNonDismissibleRef = useRef(undefined);
    return (
        <>
            <h1>Modal</h1>
            <p>Basic usage</p>
            <button onClick={() => modalBasicUsageRef?.current?.toggle()}>Open modal</button>
            <Modal ref={modalBasicUsageRef} title = "Modal">
                <div className="mx-auto max-w-7xl">
                    Basic usage modal
                </div>
            </Modal>

            <p>Backdrop</p>
            <button onClick={() => modalOpaqueRef?.current?.toggle()}>Open opaque modal</button>
            <Modal ref={modalOpaqueRef} backdrop = "opaque">
                <div className="mx-auto max-w-7xl">
                    Open opaque modal
                </div>
            </Modal>
            <button onClick={() => modalBlurRef?.current?.toggle()}>Open blur modal</button>
            <Modal ref={modalBlurRef} backdrop = "blur">
                <div className="mx-auto max-w-7xl">
                    Open blur modal
                </div>
            </Modal>
            <button onClick={() => modalTransparentRef?.current?.toggle()}>Open transparent modal</button>
            <Modal ref={modalTransparentRef} backdrop = "transparent">
                <div className="mx-auto max-w-7xl">
                    Open transparent modal
                </div>
            </Modal>

            <p>Backdrop | Non-dismissible</p>
            <button onClick={() => modalNonDismissibleRef?.current?.toggle()}>Open non-dismissible modal</button>
            <Modal ref={modalNonDismissibleRef} backdropDismissible = {false}>
                <div className="mx-auto max-w-7xl">
                    Open non-dismissible modal
                </div>
            </Modal>
            <h1>Popover</h1>
            <p>Basic usage</p>
            <div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "top-start">
                        <button>Top start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "top">
                        <button>Top</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "top-end">
                        <button>Top end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "bottom-start">
                        <button>Bottom start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "bottom">
                        <button>Bottom</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "bottom-end">
                        <button>Bottom end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "right-start">
                        <button>Right start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "right">
                        <button>Right</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "right-end">
                        <button>Right end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "left-start">
                        <button>Left start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "left">
                        <button>Left</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement = "left-end">
                        <button>Left end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
            </div>
            <h1>Calendar</h1>
            <p>Basic usage | Gregorian</p>
            <Calendar mode="Gregorian"/>
            <p>Basic usage | Jalali</p>
            <Calendar mode="Jalali"/>
            <p>Basic usage | Hijri</p>
            <Calendar mode="Hijri"/>
            <p>Default value | Gregorian</p>
            <Calendar mode="Gregorian" selected={momentJalali("2024/03/02")}/>
            <p>Default value | Jalali</p>
            <Calendar mode="Jalali" selected={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}/>
            <p>Default value | Hijri</p>
            <Calendar mode="Hijri" selected={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}/>
            <p>Min date value | Gregorian</p>
            <Calendar mode="Gregorian" min={momentJalali("2025/11/10")}/>
            <p>Min date value | Jalali</p>
            <Calendar mode="Jalali" min={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}/>
            <p>Default value | Hijri</p>
            <Calendar mode="Hijri" min={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}/>
            <p>Max date value | Gregorian</p>
            <Calendar mode="Gregorian" max={momentJalali("2025/11/15")}/>
            <p>Max date value | Jalali</p>
            <Calendar mode="Jalali" max={momentJalali("1404/08/24", "jYYYY/jMM/jDD")}/>
            <p>Max date value | Hijri</p>
            <Calendar mode="Hijri" max={momentHijri("1447/05/26", "iYYYY/iMM/iDD")}/>
            <p>Min and max date value | Gregorian</p>
            <Calendar mode="Gregorian" min={momentJalali("2025/11/10")} max={momentJalali("2025/11/15")}/>
            <p>Min and max date value | Jalali</p>
            <Calendar mode="Jalali" min={momentJalali("1404/08/20", "jYYYY/jMM/jDD")}
                      max={momentJalali("1404/08/24", "jYYYY/jMM/jDD")}/>
            <p>Min and max date value | Hijri</p>
            <Calendar mode="Hijri" min={momentHijri("1447/05/20", "iYYYY/iMM/iDD")}
                      max={momentHijri("1447/05/26", "iYYYY/iMM/iDD")}/>
            <hr/>
            <h1>Button</h1>
            <p>Default</p>
            <Button value="Default"/>
            <p>Loading</p>
            <Button value="Loading" isLoading={true}/>
            <p>Disabled</p>
            <Button value="Disabled" isDisabled={true}/>
            <p>Loading | Disabled</p>
            <Button value="Loading | Disabled" isDisabled={true} isLoading={true}/>
            <hr/>
            <h1>Input</h1>
            <p>Default</p>
            <Input title="Default"/>
            <p>Placeholder</p>
            <Input placeholder="Placeholder" title="Placeholder"/>
            <p>Disabled</p>
            <Input disabled={true} placeholder="Placeholder" title="Disabled"/>
            <hr/>
            <h1>Select</h1>
            <p>Primitive list</p>
            <Select options={["Yellow", "Red", "Blue"]} classNames={
                {
                    input: "input input-bordered w-full",
                    title: "text-[var(--primary-800)] font-bold text-xs mr-2 mb-1.5",
                }
            }/>
            <p>Non-primitive list</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"
                    value="name"/>
            <p>Disabled</p>
            <Select disabled={true} options={["Yellow", "Red", "Blue"]}/>
            <p>Placeholder</p>
            <Select options={["Yellow", "Red", "Blue"]} placeholder="Custom placeholder"/>
            <p>Selected | Primitive</p>
            <Select options={["Yellow", "Red", "Blue"]} selected="Yellow"/>
            <p>Selected | Non-primitive list</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"
                    value="name" selected={3}/>
            <p>Search with search field | Primitive</p>
            <Select options={["Yellow", "Red", "Blue"]} hasSearch={true}/>
            <p>Search with search field | Non-primitive</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"
                    value="name" hasSearch={true}/>
            <p>Search with search field | Non-primitive | Custom filter prop</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"
                    value="name" hasSearch={true} optionFilterLabel="name"/>
            <p>Search with search field | primitive | Selected</p>
            <Select options={["Yellow", "Red", "Blue"]} selected={"Red"} hasSearch={true}/>
            <p>Search with search field | Non-primitive | Selected</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]}
                    label="id" value="name"
                    hasSearch={true}
                    selected={2}/>
            <hr/>
            <h1>Call api</h1>
            <p>Basic usage</p>
            <Select api={"https://jsonplaceholder.typicode.com/users"} label="id" value="name"/>
            <p>Pagination</p>
            <Select api={"https://api.escuelajs.co/api/v1/products?offset=1&limit=3"} label="id" value="title"
                    pagination={{
                        pageLabel: 'offset',
                        sizeLabel: 'limit'
                    }}/>
            <p>Pagination | Custom page and size</p>
            <Select api={"https://api.escuelajs.co/api/v1/products?offset=1&limit=20"} label="id" value="title"
                    pagination={{
                        page: 5,
                        pageLabel: 'offset',
                        size: 10,
                        sizeLabel: 'limit'
                    }}/>

        </>
    )
}

export default App
