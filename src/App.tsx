import './App.css'
import {Button, Calendar, Input, Popover, Select} from "../lib";
import momentJalali from "jalali-moment";
import momentHijri from "moment-hijri";
import {Modal} from "../lib/components/Modal";
import {useState} from "react";

function App() {
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
        nested: false,
        nestedPopover: false,
    })
    return (
        <>
            <h1>Modal</h1>
            <p>Nested</p>
            <button onClick={() => setIsOpen({...isOpen, nested: true})}>Open modal</button>
            <Modal isOpen={isOpen.nested} title="Modal" onOpenChange={(e) => setIsOpen({...isOpen, nested: e})} footer = {<>asdadadda</>}>
                <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} label="id"
                        value="name"/>
                <Popover backdrop="blur" placement="top-start" isOpen={isOpen.nestedPopover}
                         onOpenChange={(e) => setIsOpen({...isOpen, nestedPopover: e})}>
                    <button>Top start</button>
                    <Calendar mode="Gregorian" onChange={() => {
                        setIsOpen({...isOpen, nestedPopover: false})
                    }}/>
                </Popover>
            </Modal>
            <p>Basic usage</p>
            <button onClick={() => setIsOpen({...isOpen, basicModal: true})}>Open modal</button>

            <Modal isOpen={isOpen.basicModal} title="Modal" onOpenChange={(e) => setIsOpen({...isOpen, basicModal: e})}
                   footer={<>asdadadda</>}>
                <div className="mx-auto max-w-7xl">
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                    Basic usage modal<br/>
                </div>
            </Modal>
            <p>Backdrop</p>
            <button onClick={() => setIsOpen({...isOpen, opaqueModal: true})}>Open opaque modal</button>
            <Modal isOpen={isOpen.opaqueModal} title="Modal" backdrop="opaque"
                   onOpenChange={(e) => setIsOpen({...isOpen, opaqueModal: e})}>
                <div className="mx-auto max-w-7xl">
                    Open opaque modal
                </div>
            </Modal>
            <button onClick={() => setIsOpen({...isOpen, blurModal: true})}>Open blur modal</button>
            <Modal isOpen={isOpen.blurModal} title="Modal" backdrop="blur"
                   onOpenChange={(e) => setIsOpen({...isOpen, blurModal: e})}>
                <div className="mx-auto max-w-7xl">
                    Open blur modal
                </div>
            </Modal>
            <button onClick={() => setIsOpen({...isOpen, transparentModal: true})}>Open transparent modal</button>
            <Modal isOpen={isOpen.transparentModal} title="Modal" backdrop="transparent"
                   onOpenChange={(e) => setIsOpen({...isOpen, transparentModal: e})}>
                <div className="mx-auto max-w-7xl">
                    Open transparent modal
                </div>
            </Modal>

            <p>Backdrop | Non-dismissible</p>
            <button onClick={() => setIsOpen({...isOpen, nonDismissibleModal: true})}>Open non-dismissible modal
            </button>
            <Modal isOpen={isOpen.nonDismissibleModal} title="Modal" backdropDismissible={false}
                   onOpenChange={(e) => setIsOpen({...isOpen, nonDismissibleModal: e})}>
                <div className="mx-auto max-w-7xl">
                    Open non-dismissible modal
                </div>
            </Modal>
            <h1>Popover</h1>
            <p>Basic usage</p>
            <div>
                <div style={{padding: '100px'}}>
                    <Popover backdrop="blur" placement="top-start" isOpen={isOpen.topStartPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, topStartPopover: e})}>
                        <button>Top start</button>
                        <Calendar mode="Gregorian" onChange={() => {
                            setIsOpen({...isOpen, topStartPopover: false})
                        }}/>
                    </Popover>
                </div>
                <div style={{padding: '200px'}}>
                    <Popover placement="top" isOpen={isOpen.topPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, topPopover: e})}>
                        <button>Top</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="top-end" isOpen={isOpen.topEndPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, topEndPopover: e})}>
                        <button>Top end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="bottom-start" isOpen={isOpen.bottomStartPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, bottomStartPopover: e})}>
                        <button>Bottom start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '200px'}}>
                    <Popover placement="bottom" isOpen={isOpen.bottomPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, bottomPopover: e})}>
                        <button>Bottom</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="bottom-end" isOpen={isOpen.bottomEndPopover}
                             onOpenChange={(e) => setIsOpen({...isOpen, bottomEndPopover: e})}>
                        <button>Bottom end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="right-start">
                        <button>Right start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="right">
                        <button>Right</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="right-end">
                        <button>Right end</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="left-start">
                        <button>Left start</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="left">
                        <button>Left</button>
                        <Calendar mode="Gregorian"/>
                    </Popover>
                </div>
                <div style={{padding: '100px'}}>
                    <Popover placement="left-end">
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
