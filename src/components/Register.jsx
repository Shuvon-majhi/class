import React, { Component } from "react";

export default class Bolg extends Component {

    //use ref to store the value of the input
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            name: '',
            password: '',
            cpassword: '',
        }
    }

    //handle the submit event
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.phone)
        console.log(this.state.phone.length)

        const numberLenght = this.state.phone.length;
        const NumberValue = this.state.phone;
        const NumberValueArr = NumberValue.toString().split('');

        if ((numberLenght === 11 && NumberValueArr[0] === '0' && NumberValueArr[1] === '1') || (numberLenght === 13 && NumberValueArr[0] === '8' && NumberValueArr[1] === '8')
            || (numberLenght === 14 && NumberValueArr[0] === '+' && NumberValueArr[1] === '8')) {
            var users = JSON.parse(localStorage.getItem('users'));
            if (users === null) {
                users = [];
            }
            var user = { name: this.state.name, password: this.state.password, phone: this.state.phone }
            users.push(user);
            console.log(users);
            localStorage.setItem('users', JSON.stringify(users));

            window.location.href = "/";
        } else {
            alert("Enter right number")
        }

    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="container mt-5">
                        <h2 className="mb-3">Register</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">

                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    placeholder="Enter your number"
                                    value={this.state.phone}
                                    onChange={(e) => this.setState({ phone: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">

                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Full Name"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({ name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">

                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Create  Password "
                                    value={this.state.password}
                                    onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">

                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm Password "
                                    value={this.state.cpassword}
                                    onChange={(e) => this.setState({ cpassword: e.target.value })} />
                            </div>

                            <button className="btn btn-danger" type="submit">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}