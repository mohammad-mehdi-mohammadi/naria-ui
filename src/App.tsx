import './App.css'
import {Button, Input, Select} from "../lib";

function App() {
    return (
        <>
            <Button value="sadasd"/>
            <Input placeholder="test" label="test"/>
            <hr/>
            <h1>Select</h1>
            <p>Primitive list</p>
            <Select options={["Yellow", "Red", "Blue"]}/>
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
            <p>Search with search field | primitive | Selected</p>
            <Select options={["Yellow", "Red", "Blue"]} selected={"Red"} hasSearch={true}/>
            <p>Search with search field | Non-primitive | Selected</p>
            <Select options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]}
                    label="id" value="name"
                    hasSearch={true}
                    selected={2}/>
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
