import './App.css'
import {Button, Calendar, Input, Popover, Select} from "../lib";
import momentJalali from "jalali-moment";
import momentHijri from "moment-hijri";

function App() {
    return (
        <>
            <h1>Popover</h1>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <p>Basic usage</p>
            <Popover>
                <button>sdad</button>
                <Calendar mode="Gregorian"/>
            </Popover>
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
