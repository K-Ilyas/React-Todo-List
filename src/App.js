import React, { useEffect, useState, startTransition } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import Header from './components/Header'
import AddItem from './components/AddItem';
import DisplayItem from './components/DisplayItem';
import AlertDanger from './components/AlertDanger';


function App() {

  const [items, setItems] = useState([{ item: "learn how to code", expire: true }]);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');


  const stopAlert = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }

  const addFunc = (data) => {
    if (!items.find((e) => (e.item === data))) {

      if (data !== "") {
        setItems([{ item: data, expire: false }, ...items]);
        startTransition(() => {

          setValue("");
        });
      }
      else {
        setMessage("The input is empty");
        setShow(true);
        setValue("");
        stopAlert();
      }
    }
    else {
      setMessage("The task is already exist");
      setShow(true);
      setValue("");
      stopAlert();
    }

  }

  const deleteFunc = (data) => {
    setItems([...items.filter((e, i) => (e.item !== data))]);
  }

  const expireFunc = (data, event) => {

    setItems([...items.map((e, i) => {
      if (e.item === data) {
        e.expire = event.target.checked;
      }
      return e;
    })]);

  }

  useEffect(() => {

    const clickFunc = (e) => {
      if (e.keyCode === 13 && value !== "") {
        addFunc(value);
      }
    }

    document.addEventListener("keypress", clickFunc);

    return () => {
      document.removeEventListener("keypress", clickFunc);
    }

  });


  return (

    <Container id="main-container" >
      <Row className="justify-content-center">
        <Col lg={6} md={12} sm={12} xs={12}>
          <Header />
          <AddItem addFunc={addFunc} value={value} setValue={setValue} />
          {
            items.map((e, index) => (
              <DisplayItem key={index} data={e.item} expire={e.expire} index={index} expireFunc={expireFunc} deleteFunc={deleteFunc} />
            ))
          }
          <AlertDanger show={show} setShow={setShow} message={message} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
