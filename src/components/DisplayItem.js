import React from 'react'
import { Card, Form, Button } from "react-bootstrap"


const expireStyle = {
    textDecoration: "line-through"
};

function DisplayItem({ data, expire, index, expireFunc, deleteFunc }) {
    return (
        <Card className="item">
            <Card.Body className="item-body" >
                <Form
                    style={expire ? expireStyle : null}
                >
                    <Form.Check
                        inline
                        type="switch"
                        id="custom-switch"
                        checked={expire}
                        onChange={expireFunc.bind(this, data)}
                    />
                    {data}
                </Form>
                <Button onClick={deleteFunc.bind(null, data)} className="item-delete" variant="outline-danger">
                    <i className="fa fa-trash" aria-hidden="true" ></i>
                </Button>
            </Card.Body>
        </Card>
    )
}

export default DisplayItem