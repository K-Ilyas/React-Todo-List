import React from 'react'
import { Alert } from "react-bootstrap"

function AlertDanger({ show, setShow, message }) {
    return (
        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    );
}

export default AlertDanger