import React, { Component } from 'react';
import './profile-modal.css';
import { browserHistory as history } from 'react-router';
import AppBox from '../../shared/app-box/app-box';
import SearchContainer from '../../shared/search-container/search-container'


class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1,
            editMode: false,
        }

    };

    componentWillReceiveProps() {
        this.setState({
            currentTab: 1
        })
    }

    doEdit1 = function() {
        let employee = this.props.employee;
        let employee_data = {
            first: this.refs.Fname.value ===  '' ? employee.firstname : this.refs.Fname.value,
            last: this.refs.Lname.value ===  '' ? employee.lastname : this.refs.Lname.value,
            phone: this.refs.phone.value ===  '' ? employee.phonenumber : this.refs.phone.value,
            address: this.refs.address.value ===  '' ? employee.address : this.refs.address.value,
            title: employee.jobtitle,
            city:  employee.city,
            organization: employee.organization,
            email: this.refs.email.value ===  '' ? employee.email : this.refs.email.value,
            location: employee.location,
            eid: employee.eid,
            dob: this.refs.dob.value ===  '' ? employee.birthday : this.refs.dob.value,
            roleId: employee.roleid,
            description: employee.description,
            accessLevel: employee.accesslevel
        };
        let that = this;
            var request = new Request('http://10.10.7.153:3000/api/edit_employee', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(employee_data)
            });
            fetch(request)
                .then(function(response) {
                    response.json()
                        .then(function(data) {
                            that.props.employee.firstname = employee_data.first;
                            that.props.employee.lastname = employee_data.last;
                            that.props.employee.phonenumber = employee_data.phone;
                            that.props.employee.address = employee_data.address;
                            that.props.employee.email = employee_data.email;
                            that.props.employee.birthday = employee_data.dob;
                            that.setState({
                                editMode: false
                            })
                        })
                })
                .catch(function(err) {
                    console.log(err);
                })
    }

    doEdit2 = function() {
        let employee = this.props.employee;
        let employee_data = {
            first: employee.firstname,
            last: employee.lastname,
            phone: employee.phonenumber,
            address: employee.address,
            title: this.refs.position.value ===  '' ? employee.jobtitle : this.refs.position.value,
            city:  this.refs.city.value === '' ? employee.city : this.refs.city.value,
            organization: this.refs.department.value ===  '' ? employee.organization : this.refs.department.value,
            email: employee.email,
            location: this.refs.location.value === '' ? employee.location : this.refs.location.value,
            eid: employee.eid,
            dob: employee.birthday,
            roleId: employee.roleid,
            description: employee.description,
            accessLevel: employee.accesslevel
        };
        let that = this;
        var request = new Request('http://10.10.7.153:3000/api/edit_employee', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(employee_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.props.employee.jobtitle = employee_data.title;
                        that.props.employee.city = employee_data.city;
                        that.props.employee.organization = employee_data.organization;
                        that.setState({
                            editMode: false
                        })
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    renderAppBoxes = function() {
        let appList = this.props.apps.map(function (value) {
            return (
                <div className="App-Box-Spacing">
                    <AppBox
                        app={value}
                    />
                </div>
            )
        })
        return(appList);
    };

    toggleEdit () {
        this.setState({
            editMode: true
        })
    }

    render() {
        let profilePic = 'EmployeePicture/' + this.props.employee.eid + '.jpg';
        let employee = this.props.employee;
        let dob = new Date (employee.birthday);
        return (
            <div className="Profile-modal-container">
                <div className="profile-tabs">
                    { this.props.tabCount ===1 &&
                        (
                            <div className="profile-tab1"  onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                        )
                    }
                    { this.props.tabCount ===2 &&
                    (
                        <div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab2" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
                            }}>
                                Professional Information
                            </div>
                        </div>
                    )
                    }
                    { this.props.tabCount ===3 &&
                    (
                        <div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab3" onClick={() => {
                                this.setState({currentTab: 3, editMode: false});
                            }}>
                                Applications
                            </div>
                        </div>
                    )
                    }
                    { this.props.tabCount ===4 &&
                    (
                        <div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 1, editMode: false});
                            }}>
                                Personal Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 2, editMode: false});
                            }}>
                                Professional Information
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 3, editMode: false});
                            }}>
                                Applications
                            </div>
                            <div className="tabBreak"></div>
                            <div className="profile-tab4" onClick={() => {
                                this.setState({currentTab: 4, editMode: false});
                            }}>
                                Employees
                            </div>
                        </div>
                    )
                    }
                </div>
                <div className="content">
                    <div className="profile-content">
                        {
                            this.state.currentTab === 1 && !this.state.editMode && (
                                <div>
                                    <div className="employee-name-container">
                                        <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                    </div>
                                    {
                                        employee.eid === this.props.myProfile.eid && (
                                            <div className="Edit-Button" onClick={this.toggleEdit.bind(this)}>
                                                Edit
                                            </div>
                                        )
                                    }
                                    <div className="profile-image-container">
                                        <img src={ profilePic } className="profile-image" alt="proPic" />
                                    </div>
                                    <div className="Profile-Personal-Information">
                                        <div className="personal-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Company ID: <div className="profile-info">{employee.eid}</div></div>
                                                <div className="information-line">Date of Birth: <div className="profile-info">{dob.toLocaleDateString()}</div></div>
                                                <div className="information-line">Address: <div className="profile-info">{employee.address}</div></div>
                                                <div className="information-line">Phone: <div className="profile-info">{employee.phonenumber}</div></div>
                                                <div className="information-line">Email: <div className="profile-info">{employee.email}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 1 && this.state.editMode && (
                                <div>
                                    <form>
                                    <div className="employee-name-container">
                                    </div>
                                        <div className="profile-image-container">
                                            <img src={ profilePic } className="profile-image" alt="proPic" />
                                            <img src="../picture/picture.jpg" className="profile-image" alt="proPic" />
                                        </div>
                                        <div className="Profile-Personal-Information">
                                            <div className="personal-information-container">
                                                <div className="information-content">
                                                    <div className="information-line">
                                                        First Name: <input className="input-edit" ref="Fname" name="Employee_Fname" type="text" required placeholder={employee.firstname}/><br/>
                                                        Last Name: <input className="input-edit" ref="Lname" name="Employee_Lname" type="text" required placeholder={employee.lastname}/>
                                                    </div>
                                                    <div className="information-line">Date of Birth: <div className="profile-info"><input className="input-edit" ref="dob" name="Employee_dob" type="text" placeholder={dob.toLocaleDateString()}/></div></div>
                                                    <div className="information-line">Address: <div className="profile-info"><input className="input-edit" ref="address" name="Employee_address" type="text" placeholder={employee.address}/></div></div>
                                                    <div className="information-line">Phone: <div className="profile-info"><input className="input-edit" ref="phone" name="Employee_phone" type="text" placeholder={employee.phonenumber}/></div></div>
                                                    <div className="information-line">Email: <div className="profile-info"><input className="input-edit" ref="email" name="Employee_email" type="text" placeholder={employee.email}/></div></div>
                                                    <div style={{paddingTop: "5px"}}>
                                                        <div className="done-edit-button" onClick={this.doEdit1.bind(this)}>
                                                            Done
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )
                        }

                        {
                            this.state.currentTab === 2 && !this.state.editMode && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        {
                                            this.props.myProfile.accesslevel <= 2 && !this.props.HRaction &&(
                                                <div className="Edit-Button" onClick={this.toggleEdit.bind(this)}>
                                                    Edit
                                                </div>
                                            )
                                        }
                                        <div className="profestional-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Position: <div className="profile-info">{employee.jobtitle}</div></div>
                                                <div className="information-line">Location: <div className="profile-info">{employee.city}, {employee.location}</div></div>
                                                <div className="information-line">Department: <div className="profile-info">{employee.organization}</div></div>
                                                <div className="information-line">Manager: <div className="profile-info">{this.props.manager.firstname} {this.props.manager.lastname}</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 2 && this.state.editMode && (
                                <div>
                                    <div className="Profile-Personal-Information">
                                        <div className="employee-name-container">
                                            <div className="employee-name">{employee.firstname} {employee.lastname}</div>
                                        </div>
                                        <div className="profestional-information-container">
                                            <div className="information-content">
                                                <div className="information-line">Position: <div className="profile-info"><input className="input-edit" ref="position" name="Employee_dob" type="text" placeholder={employee.jobtitle}/></div></div>
                                                <div className="information-line">City: <div className="profile-info"><input className="input-edit" ref="city" name="Employee_dob" type="text" placeholder={employee.city}/></div></div>
                                                <div className="information-line">Location: <div className="profile-info"><input className="input-edit" ref="location" name="Employee_dob" type="text" placeholder={employee.location}/></div></div>
                                                <div className="information-line">Department: <div className="profile-info"><input className="input-edit" ref="department" name="Employee_dob" type="text" placeholder={employee.organization}/></div></div>
                                                <div className="information-line">Manager: <div className="profile-info">{this.props.manager.firstname} {this.props.manager.lastname}</div></div>
                                                <div style={{paddingTop: "5px"}}>
                                                    <div className="done-edit-button" onClick={this.doEdit2.bind(this)}>
                                                        Done
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 3 && (
                                <div>
                                    <div className="employee-app-list-label">
                                        Your Applications
                                    </div>
                                    <div className="employee-app-list">
                                        {
                                            this.renderAppBoxes()
                                        }
                                    </div>
                                    {this.props.myProfile.eid === this.props.employee.eid && (
                                        <div className="request-button-container">
                                            <div className="request-button" onClick={() => {
                                                history.push({
                                                    pathname: '/request',
                                                    state: {
                                                        employees: this.props.employees,
                                                        loggedIn: true,
                                                        employee: this.props.employee,
                                                        myProfile: this.props.myProfile,
                                                        manager: this.props.manager
                                                    }
                                                })}}>
                                                Request Access
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        {
                            this.state.currentTab === 4 && (
                                <div className="profile-search-container">
                                    <SearchContainer
                                        employees={ this.props.employees }
                                        myProfile={this.props.myProfile}
                                        managerProfile={true}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default ProfileModal;