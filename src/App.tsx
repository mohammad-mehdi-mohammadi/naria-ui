import './App.css'
import {Button, Calendar, Input, Select} from "../lib";
import moment from "jalali-moment";

function App() {
    return (
        <>
            <h1>Calendar</h1>
            {/*<p>Basic usage | Gregorian</p>*/}
            {/*<Calendar mode = "Gregorian"/>*/}
            {/*<p>Basic usage | Jalali</p>*/}
            {/*<Calendar mode = "Jalali"/>*/}
            {/*<p>Basic usage | Hijri</p>*/}
            {/*<Calendar mode = "Hijri"/>*/}
            <p>Default value | Gregorian</p>
            <Calendar mode = "Gregorian" selected={moment("2024/03/02")}/>
            <p>Default value | Jalali</p>
            <Calendar mode = "Jalali" selected={moment("1404/08/13", "jYYYY/jMM/jDD")}/>
            <p>Default value | Hijri</p>
            <Calendar mode = "Hijri" selected={moment("1447/05/13", "iYYYY/iMM/iDD")}/>
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
