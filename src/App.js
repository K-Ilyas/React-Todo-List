import React, { useEffect, useState, startTransition } from 'react';
import PropTypes from "prop-types"
import { Container, Row, Col, Spinner } from "react-bootstrap"
import { connect } from "react-redux"
import { asyncHandler, asyncHandlerCreate, asyncHandlerDelete, asyncHandlerExpire } from './asyncMiddleware';


import Header from './components/Header'
import AddItem from './components/AddItem';
import DisplayItem from './components/DisplayItem';
import AlertDanger from './components/AlertDanger';


function App(props) {

  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');


  const stopAlert = () => {
    setTimeout(() => {
      setShow(false);
    }, 2000)
  }

  const addFunc = (data) => {
    console.log(props.items);
    if (!props.items.find((e) => (e.title === data))) {
      if (data !== "") {
        props.createItem({ title: data, completed: false });
        startTransition(() => {
          setVal("");
        });
      }
      else {
        setMessage("The input is empty");
        setShow(true);
        setVal("");
        stopAlert();
      }
    }
    else {
      setMessage("The task is already exist");
      setShow(true);
      setVal("");
      stopAlert();
    }

  }

  const deleteFunc = (id) => {
    props.deleteItem(props.items.find((e, i) => (e.id === id)));
  }

  const expireFunc = (id, event) => {
    const item = props.items.find((e, i) => (e.id === id));
    item.completed = event.target.checked;
    props.expireItem(item);
  }




  useEffect(() => {
    const clickFunc = (e) => {
      if (e.keyCode === 13 && val !== "") {
        addFunc(val);
      }
    }

    document.addEventListener("keypress", clickFunc);

    return () => {
      document.removeEventListener("keypress", clickFunc);
    }
  });

  useEffect(() => {

    props.getItems();

  }, []);


  return (
    <Container id="main-container" >
      <Row className="justify-content-center">
        <Col lg={6} md={12} sm={12} xs={12}>
          <Header />
          <AddItem addFunc={addFunc} val={val} setVal={setVal} />
          {
            props.loading === false ?
              props.items.map((e, index) => (
                <DisplayItem key={e.id} data={e.title} id={e.id} expire={e.completed} expireFunc={expireFunc} deleteFunc={deleteFunc} />
              ))
              : <Row className="justify-content-center"> <Spinner animation="border" /></Row>
          }
          <AlertDanger show={show} setShow={setShow} message={message} />
        </Col>
      </Row>
    </Container>
  );
}


const mapStateToProps = (state) => ({
  items: state.items,
  loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(asyncHandler()),
  createItem: (item) => dispatch(asyncHandlerCreate(item)),
  deleteItem: (item) => dispatch(asyncHandlerDelete(item)),
  expireItem: (item, expire) => dispatch(asyncHandlerExpire(item))
})


App.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getItems: PropTypes.func.isRequired,
  createItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  expireItem: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
