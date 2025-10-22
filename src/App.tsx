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
            <p>Placeholder</p>
            <Select options={["Yellow", "Red", "Blue"]} placeholder="Custom placeholder"/>
            <p>Selected | Disabled</p>
            <Select options={["Yellow", "Red", "Blue"]} disabled={true} selected="Yellow"/>
            <p>Non-primitive list</p>
            <Select options={[{label: 1, value: "Yellow"}, {label: 2, value: "Red"}, {label: 3, value: "Blue"}]}/>
            <p>Selected Non-primitive list</p>
            <Select options={[{label: 1, value: "Yellow"}, {label: 2, value: "Red"}, {label: 3, value: "Blue"}]}
                    selected={2}/>
            <p>Custom label and value</p>
            <Select label="id" value="name"
                    options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]}/>
            <p>Custom label and value | Selected</p>
            <Select label="id" value="name"
                    options={[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} selected={3}/>
            <h1>Call api</h1>
            <p>Basic usage</p>
            <Select label="id" value="name" api={"https://jsonplaceholder.typicode.com/users"}/>
            <p>Pagination</p>
            <Select label="id" value="title" api={"https://api.escuelajs.co/api/v1/products?offset=1&limit=3"}
                    pagination={{
                        pageLabel: 'offset',
                        sizeLabel: 'limit'
                    }}/>
            <p>Pagination | Custom page and size</p>
            <Select label="id" value="title" api={"https://api.escuelajs.co/api/v1/products?offset=1&limit=20"}
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
