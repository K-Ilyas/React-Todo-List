import React from 'react'
import { FormControl, Button } from "react-bootstrap"

function AddItem({ addFunc, val, setVal }) {

    return (
        <div id="add-item" >
            <FormControl
                id="add-item-input"
                placeholder="Add todo ..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />

            <Button onClick={(e) => { return addFunc(val) }} id="add-item-btn" variant="outline-primary">Submit</Button>
        </div>
    )
}

export default AddItem