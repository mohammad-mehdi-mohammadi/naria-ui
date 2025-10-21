import './App.css'
import {Button, Input, Select} from "../lib";

function App() {

    return (
        <>
            <Button value="sadasd"/>
            <Input placeholder="test" label="test"/>
            <hr/>
            <h1>Select option (Basic usage | primitive list)</h1>
            <Select label="id" options = {["Yellow", "Red", "Blue"]} />
            <Select label="id" options = {["Yellow", "Red", "Blue"]} placeholder = "Custom placeholder" />
            <h1>Select option (Basic usage | non-primitive list)</h1>
            <Select options = {[{label: 1, value: "Yellow"}, {label: 2, value: "Red"}, {label: 3, value: "Blue"}]} />
            <Select label = "id" value = "name" options = {[{id: 1, name: "Yellow"}, {id: 2, name: "Red"}, {id: 3, name: "Blue"}]} />
        </>
    )
}

export default App
