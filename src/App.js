import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      phoneNumberField: true,
      passwordField: false,
      nextBtn: true,
      validUser: false,
      AppoindmentField: true,
      name: "",
      address: "",
      age: "",
      date: "",
      slot: "",
      appointList: [],
    };
  }

  onSelectStateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onClickNext = () => {
    //get user from local storage
    const users = JSON.parse(localStorage.getItem("users"));
    //check if user is null
    if (users === null) {
      alert("Please register first");
    } else {
      //check if user is registered or not
      const user = users.find((user) => user.phone === this.state.phoneNumber);
      if (user === undefined) {
        alert("Please register first");
      } else {
        this.setState({
          phoneNumberField: false,
          passwordField: true,
        });
      }
    }
  };
  handlePassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    if (users === null) {
      alert("Please register first");
    } else {
      const user = users.find(
        (user) =>
          user.phone === this.state.phoneNumber &&
          user.password === this.state.password
      );
      if (user === undefined) {
        alert("Invalid password");
      } else {
        this.setState({
          passwordField: false,
          validUser: true,
          name: user.name,
        });
        const slots = JSON.parse(localStorage.getItem("slots"));
        if (slots === null) {
          const slots = {
            '4pm-5pm': {},
            '5pm-6pm': {},
            '6pm-7pm': {},
          };
          localStorage.setItem("slots", JSON.stringify(slots));
        }
      }
    }
  };
  handelSubmit = (e) => {
    e.preventDefault();

    // console.log(this.state.Appoindmentnumber.length);
    // console.log(this.state.Appoindmentnumber);

    const numberLenght = this.state.Appoindmentnumber.length;
    const NumberValue = this.state.Appoindmentnumber;
    const NumberValueArr = NumberValue.toString().split("");

    ///all data store numberLenght
    const obj = {
      name: this.state.Appoindmentnames,
      Number: this.state.Appoindmentnumber,
      emailValue: this.state.email,
      addressValue: this.state.address,
      ageValue: this.state.age,
      dateValue: this.state.date,
      slotValue: this.state.slot,
    };
    //console.log(obj)
    const propertyValues = Object.values(obj);
    // console.log(propertyValues);

    // console.table(propertyValues);

    if (
      (numberLenght === 11 &&
        NumberValueArr[0] === "0" &&
        NumberValueArr[1] === "1") ||
      (numberLenght === 13 &&
        NumberValueArr[0] === "8" &&
        NumberValueArr[1] === "8") ||
      (numberLenght === 14 &&
        NumberValueArr[0] === "+" &&
        NumberValueArr[1] === "8")
    ) {
      const users = JSON.parse(localStorage.getItem("users"));
      const slots = JSON.parse(localStorage.getItem("slots"));

      const NewAppointList = localStorage.getItem("appointList");
      let appointList = NewAppointList ? JSON.parse(NewAppointList) : [];

      let prevData = _.filter(appointList, {
        dateValue: this.state.date,
        slotValue: this.state.slot,
      });

      if (_.isEmpty(prevData)) {
        appointList.push(obj);
        localStorage.setItem("appointList", JSON.stringify(appointList));
        alert("Slot booked");
      } else {
        console.log("prevData", prevData);
        alert("slot already booked");
      }

      this.setState({ appointList: appointList });

      //AppointmentList(appointList);

      // function AppointmentList(data){
      //   for(var i=0;i<data.length;i++){
      //     for(var j=0;j<data[i].length;j++){
      //       document.write(data[i][j])
      //     }
      //   }
      // }

      // console.table(appointList);
      this.setState({ AppoindmentField: false });
    } else {
      alert("Enter right number");
    }
  };
  render() {
    const {
      Appoindmentnames,
      email,
      Appoindmentnumber,
      address,
      age,
      date,
      slot,
    } = this.state;
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="container mt-5">
                <h2 className="mb-3">
                  {this.state.validUser === false
                    ? "Login"
                    : "Login Successfull"}
                </h2>
                {this.state.phoneNumberField === true && (
                  <form>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Enter your mobile number
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        id="phone"
                        required
                        onChange={(e) =>
                          this.setState({ phoneNumber: e.target.value })
                        }
                      />
                    </div>
                  </form>
                )}
                {this.state.passwordField === true && (
                  <form onSubmit={this.handlePassword}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="name">
                        Enter your Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        required
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                    <button className="btn btn-danger" type="submit">
                      Login
                    </button>
                  </form>
                )}

                {this.state.validUser === true &&
                  this.state.AppoindmentField === true && (
                    <div>
                      <div>
                        {/* {<h3>Hi, {this.state.name}</h3>} */}
                        <p>Give some additional information of yours.</p>
                        <form onSubmit={this.handelSubmit}>
                          <div className=" form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                              type="text"
                              name="Appoindmentnames"
                              className="form-control"
                              id="name"
                              value={Appoindmentnames}
                              placeholder="Enter your name"
                              onChange={this.onSelectStateChange}
                            />
                          </div>
                          <div className=" form-group">
                            <label htmlFor="number">Number</label>
                            <input
                              type="number"
                              name="Appoindmentnumber"
                              value={Appoindmentnumber}
                              className="form-control"
                              id="numberx"
                              placeholder="Enter your phone number"
                              onChange={this.onSelectStateChange}
                            />
                          </div>
                          <div className=" form-group">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={email}
                              className="form-control"
                              id="email"
                              placeholder="Enter your email"
                              onChange={this.onSelectStateChange}
                            />
                          </div>

                          <div className=" form-group">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              name="address"
                              value={address}
                              className="form-control"
                              id="address"
                              placeholder="Enter your address"
                              onChange={this.onSelectStateChange}
                            />
                          </div>
                          <div className=" form-group">
                            <label htmlFor="age">Age</label>
                            <input
                              type="number"
                              name="age"
                              value={age}
                              className="form-control"
                              id="age"
                              placeholder="Enter your age"
                              onChange={this.onSelectStateChange}
                            />
                          </div>
                          <div className=" form-group">
                            <label htmlFor="date">Date</label>
                            <input
                              type="date"
                              name="date"
                              value={date}
                              className="form-control"
                              id="date"
                              placeholder="Enter date"
                              onChange={this.onSelectStateChange}
                            />
                          </div>
                          <div className=" form-group">
                            <label htmlFor="slot">Slot</label>
                            <select
                              name="slot"
                              value={slot}
                              className="form-control"
                              id="slot"
                              onChange={this.onSelectStateChange}
                            >
                              <option>select one</option>
                              <option value="4pm-5pm">4:00 pm - 5:00 pm</option>
                              <option value="5pm-6pm">5:00 pm - 6:00 pm</option>
                              <option value="6pm-7pm">6:00 pm - 7:00 pm</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary mt-3"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        {this.state.AppoindmentField === false && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Date</th>
                  <th>Slot</th>
                </tr>
              </thead>
              {this.state.appointList.map((item) => {
                return (
                  <tbody>
                    <tr key={item.index}>
                      <td>{item.name}</td>
                      <td>{item.Number}</td>
                      <td>{item.emailValue}</td>
                      <td>{item.addressValue}</td>
                      <td>{item.ageValue}</td>
                      <td>{item.dateValue}</td>
                      <td>{item.slotValue}</td>
                    </tr>
                  </tbody>

                )
              })}
            </table>
          </div>

        )}
        {this.state.phoneNumberField === true && (
          <button
            style={{ cursor: "pointer", marginLeft: "26.5%" }}
            className="btn btn-primary"
            onClick={this.onClickNext}
          >
            Next
          </button>
        )}
        {this.state.validUser === false && (
          <div
            className="mt-5"
            style={{ cursor: "pointer", marginLeft: "26.5%" }}
          >
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    );
  }
}
export default App;
