import React from "react";
import { Link, Route } from 'react-router-dom'
import { Button, Navbar, Card, CardImg } from 'reactstrap';
import PizzaForm from './Form'

const App = () => {
  return (
    <>
    <Navbar color="danger">
      <h1 style={{color: 'white'}}>Lambda Eats</h1>
      <Link to='/'><Button color="primary">Home</Button></Link>
    </Navbar>
    <Route exact path="/">
      <Card>
        <CardImg src={require('./Assets/Pizza.jpg')} />
        <Link to="/pizza"><Button color="primary" style={{position: 'absolute', left: '50%', top: '50%'}}>Pizza here!</Button></Link>
      </Card>
    </Route>
    <Route path="/pizza">
      <PizzaForm />
    </Route>
    </>
  );
};
export default App;
