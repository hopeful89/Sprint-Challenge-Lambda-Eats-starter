import React, { useState } from 'react'
import { Button, Card, Form, FormGroup, CardImg, Input, Dropdown, DropdownToggle, DropdownMenu, Label, CustomInput } from 'reactstrap'
import { Link, Route } from 'react-router-dom'
import axios from 'axios';
import * as yup from 'yup'

const PizzaForm = () => {
    const [formData, setFormData] = useState({
        size: 'Small',
        sauce: 'Original Red',
        pepperoni: false,
        hamburger: false,
        peppers: false,
        onions: false,
        gluten: false
    })
    const [isDropped, setIsDropped] = useState(false)
    const [error, setError] = useState({
        name: '',
    })

    const [post, setPost] = useState()
    const formSchema = yup.object().shape({
        name: yup.string('must be a string').required('You must include your name'),
        sauce: yup.string().required(),
        pepperoni: yup.boolean(),
        hamburger: yup.boolean(),
        peppers: yup.boolean(),
        onions: yup.boolean(),
    })

    const toggle = () => {
        setIsDropped(!isDropped)
    }

    const handleChange = (e) => {
        e.persist()
        const newFormData = {
            ...formData,
            [e.target.name]: (e.target.type === 'checkbox' ? e.target.checked : e.target.value)
        }
        setFormData(newFormData)

    }

    const handleSubmit = () => {
        formSchema.validate(formData).then(() => {
            axios.post('https://reqres.in/api/users/', formData).then(res => {
                console.log('this is your submitted data', res.data)
                // setPost(res.data)
            })
        }).catch(err => {
            setError({name: err.message})
        })
    }

    return (
        <>
        <Card style={{textAlign: 'center'}}>
            <h3>Build your own Pizza</h3>
            <CardImg style={{height: '40vh'}} src={require('./Assets/Pizza.jpg')} />
        </Card>
        <Form data-cy="submit" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            }} style={{width: '95%', margin: '0 auto'}}>
            <FormGroup>
                <legend style={{margin: '2% 0 1% 2%'}}>Build Your Own Pizza</legend>
            </FormGroup>
            <FormGroup style={{ background: 'slategrey'}}>
                <div style={{margin: '0 0 0 1%', padding: '.25%'}}>
                    <h5>Choice of size</h5>
                    <p>Required</p>
                </div>
            </FormGroup>
            <FormGroup>
                <Dropdown isOpen={isDropped} toggle={toggle}>
                    <DropdownToggle caret>
                        {formData.size}
                        <DropdownMenu>
                            <div onClick={() => {
                                setFormData({...formData, 'size': 'Small'})
                            }}>Small</div>
                            <div onClick={() => {
                                setFormData({...formData, 'size': 'Medium'})
                            }}>Medium</div>
                                                        <div onClick={() => {
                                setFormData({...formData, 'size': 'Large'})
                            }}>Large</div>
                        </DropdownMenu>
                    </DropdownToggle>
                </Dropdown>
            </FormGroup>
            <FormGroup style={{ background: 'slategrey'}}>
                <div style={{margin: '0 0 0 1%', padding: '.25%'}}>
                    <h5>Choice of Sauce</h5>
                    <p>Required</p>
                </div>
            </FormGroup>
            <FormGroup tag="fieldset">
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="sauce" value="original red" onChange={handleChange} defaultChecked/>
                        Original Red
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="sauce" value="garlic Ranch" onChange={handleChange}/>
                        Garlic Ranch
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="sauce" value="bbq sauce" onChange={handleChange}/>
                        BBQ Sauce
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="radio" name="sauce" value="spinach alfredo" onChange={handleChange}/>
                        Spinach Alfredo
                    </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup style={{ background: 'slategrey'}}>
                <div style={{margin: '0 0 0 1%', padding: '.25%'}}>
                    <h5>Add Toppings</h5>
                </div>
            </FormGroup>
            <FormGroup tag="fieldset">
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" data-cy='pepperoni' name="pepperoni" checked={formData.pepperoni} onChange={handleChange}/>
                        Pepperoni
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="hamburger" checked={formData.hamburger} onChange={handleChange}/>
                        Hamburger
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" data-cy='peppers' name="peppers" checked={formData.peppers} onChange={handleChange}/>
                        Peppers
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" data-cy='onions' name="onions" checked={formData.onions} onChange={handleChange}/>
                        Onions
                    </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup style={{ background: 'slategrey'}}>
                <div style={{margin: '0 0 0 1%', padding: '.25%'}}>
                    <h5>Choice of Substitutes</h5>
                </div>
            </FormGroup>
            <FormGroup>
            <CustomInput type="switch" data-cy='gluten' id="gluten" name="gluten" label="Gluten Free Crust" onChange={handleChange} checked={formData.gluten}/>
            </FormGroup>
            <FormGroup style={{ background: 'slategrey'}}>
                <div style={{margin: '0 0 0 1%', padding: '.25%'}}>
                    <h5>Special Instructions</h5>
                </div>
            </FormGroup>

            <FormGroup>
                <Input onChange={handleChange} name="special" placeholder="Anything else you would like to add?"></Input>
            </FormGroup>
            <FormGroup>
                <Input onChange={handleChange} data-cy='name' name="name" placeholder="Please Enter Your Name"></Input>
                {(error.name.length !== undefined ? <p>{error.name}</p> : undefined)}
                
            </FormGroup>
            <FormGroup style={{width: '100%'}}>
                <Button  style={{width: '90%', margin: '0 5%'}}>Submit</Button>
            </FormGroup>
            {/* <Route path='/sucess'>
                //add link to button
            </Route> */}
        </Form>
        </>
    )
}

export default PizzaForm