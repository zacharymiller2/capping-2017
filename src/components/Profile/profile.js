import React, { Component } from 'react';
import CompanyHeader from "../../shared/header/header";
import ProfileModal from "../../shared/profile-modal/profile-modal";
import logo from '../../shared/images/logo.svg';
import './profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        //only here as a back-up place holder will be updated to be a fall back soon
        this.state = {
            image: '../Images/basicProfilePic.png',
            manager: {firstname: 'N/A', lastname: ''},
            applications: {},
            employees: []
        }

    };

    componentDidMount() {
        //  This fires before the page renders to gather all profiles,
        let that = this;
        let manager_data = {
            eid: this.props.location.state.employee.eid
        };
        var request = new Request('http://10.10.7.153:3000/api/manager-find', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(manager_data)
        });
        fetch(request)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        if(data.rows.length >= 1){
                            that.setState({manager: data.rows[0]});
                        }
                    })
            })
            .catch(function(err) {
                console.log(err);
            })

        let application_data = {
            eid: this.props.location.state.employee.eid
        };
        var request1 = new Request('http://10.10.7.153:3000/api/get_employee_applications', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(application_data)
        });
        fetch(request1)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({applications: data.rows});
                    })
            })
            .catch(function(err) {
                console.log(err);
            })

        let managed_data = {
            mid: this.props.location.state.employee.mid
        };
        var request2 = new Request('http://10.10.7.153:3000/api/manager_employees', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(managed_data)
        });
        fetch(request2)
            .then(function(response) {
                response.json()
                    .then(function(data) {
                        that.setState({employees: data.rows});
                    })
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    render() {
        console.log(this.props.location.state);
        let employees = this.state.employees;
        let employee = this.props.location.state.employee;
        let myProfile = this.props.location.state.myProfile;
        let tabs = 3;
        if(employee.mid) {
            tabs = 4;
        }
        return (
            <div className="ProfilePage">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />
                <div className="profile-place">
                    <ProfileModal
                        employees={employees}
                        employee={employee}
                        myProfile={myProfile}
                        tabCount={tabs}
                        manager={this.state.manager}
                        apps={this.state.applications}
                    />
                </div>
                {/*
                <div className="profile-info-container">
                <div className="personal-information-container">
                    <img src={ basicProfilePic } className="Image" alt="proPic" />
                    <div className="Profile-Personal-Information">
                        <div className="Profile-Headers">Personal Information</div>
                        {
                            myProfile.eid === employee.eid && (
                                <div className="Edit-Button">Edit</div>
                            )
                        }
                        <div className="information-line">Name: <div className="profile-info">{employee.firstname} {employee.lastname}</div></div >
                        <div className="information-line">Date of Birth: <div className="profile-info">{dob.toLocaleDateString()}</div></div>
                        <div className="information-line">Address: <div className="profile-info">{employee.address}</div></div>
                        <div className="information-line">Company ID: <div className="profile-info">{employee.eid}</div></div>
                        <div className="information-line">Phone: <div className="profile-info">{employee.phonenumber}</div></div>
                        <div className="information-line">Email: <div className="profile-info">{employee.email}</div></div>
                    </div>
                </div>
                <div className="personal-information-container">
                    <div className="Profile-Professional-Information">
                        <div className="Profile-Headers">Professional Information</div>
                        {
                            myProfile.accesslevel <=2 && (
                                <div className="Edit-Button">Edit</div>
                            )
                        }
                        <div className="information-line">Position: <div className="profile-info">{employee.jobtitle}</div></div>
                        <div className="information-line">Location: <div className="profile-info">{employee.city}, Need to change location to string</div></div>
                        <div className="information-line">Department: <div className="profile-info">{employee.organization}</div></div>
                        <div className="information-line">Manager: <div className="profile-info">{this.state.manager.firstname} {this.state.manager.lastname}</div></div>
                        <div className="information-line">Local Time: <div className="profile-info">NEED TO DISCUSS</div></div>
                    </div>
                </div>
                */}
                { /* Application Table need to be updated with information and than this need to be changed */ }
                {/*
                <div className="personal-information-container">
                    <div className="Profile-Headers">Applications</div>
                    <img src={ basicProfilePic } className="App-Images" alt="proPic" />
                    <img src={ basicProfilePic } className="App-Images" alt="proPic" />
                    <div className="Request-Access" onClick={() => {
                        history.push({
                            pathname: '/AccessRequest',
                            state: {
                                id: this.props.id,
                                loggedIn: true
                            }
                        })}}>Request Access</div>
                </div>
                </div> */}
            </div>
        );
    }
}
export default Profile;