import React from 'react'
import { FormControl, Button } from "react-bootstrap"

function AddItem({ addFunc, value, setValue }) {

    return (
        <div id="add-item" >
            <FormControl
                id="add-item-input"
                placeholder="Add todo ..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            <Button onClick={(e) => { e.preventDefault(); return addFunc(value) }} id="add-item-btn" variant="outline-primary">Submit</Button>
        </div>
    )
}

export default AddItem