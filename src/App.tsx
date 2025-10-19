import './App.css'
import {Button, Input, Select} from "../lib";

function App() {

    return (
        <>
            <Button value="sadasd"/>
            <Input placeholder="test" label="test"/>
            <Select label="id" value="name" list = {[{id: 1, name: "sad"}]} />
        </>
    )
}

export default App
