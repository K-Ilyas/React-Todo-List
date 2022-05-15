import React, { useEffect, useState, startTransition } from 'react';
import { Container, Row, Col } from "react-bootstrap"

import { connect } from "react-redux"
import { createTask, deleteTask, expireTask, getTasks } from './actionsCreators';

import Header from './components/Header'
import AddItem from './components/AddItem';
import DisplayItem from './components/DisplayItem';
import AlertDanger from './components/AlertDanger';

function App(props) {

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');


  const stopAlert = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }

  const addFunc = (data) => {
    if (!props.items.find((e) => (e.item === data))) {
      if (data !== "") {
        props.createItem({ item: data, expire: false });
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
    props.deleteItem(props.items.find((e, i) => (e.item === data)));
  }

  const expireFunc = (data, event) => {
    props.expireItem(props.items.find((e, i) => (e.item === data)), event.target.checked);
  }

  useEffect(() => {

    props.getItems();
    console.log(props.items);
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
            props.items.map((e, index) => (
              <DisplayItem key={index} data={e.item} expire={e.expire} index={index} expireFunc={expireFunc} deleteFunc={deleteFunc} />
            ))
          }
          <AlertDanger show={show} setShow={setShow} message={message} />
        </Col>
      </Row>
    </Container>
  );
}


const mapStateToProps = (state) => ({
  items: state.items
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getTasks()),
  createItem: (item) => dispatch(createTask(item)),
  deleteItem: (item) => dispatch(deleteTask(item)),
  expireItem: (item, expire) => dispatch(expireTask(item, expire))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
