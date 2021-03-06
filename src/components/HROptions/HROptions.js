import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import CompanyHeader from "../../shared/header/header";
import logo from '../../shared/images/logo.svg';
import './HROptions.css';
import BackButton from "../../shared/back-button/back-button";

class HROptions extends Component {
    render() {
        let myProfile = this.props.location.state.myProfile;
        let employeeList = this.props.location.state.employeeList;
        return (
            <div className="App">
                <CompanyHeader
                    logo={logo}
                    myProfile={myProfile}
                />
                <div className="HR-Options-Container animation-container">
                <div className="Option-Box-Container" >
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/add',
                            state: {
                                loggedIn: true,
                                action: 'add',
                                myProfile: myProfile
                            }
                        })}}>
                        <div className="Option-Text">
                            Add Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/action',
                            state: {
                                loggedIn: true,
                                action: 'Remove',
                                myProfile: myProfile,
                                employeeList: employeeList
                            }
                        })}}>
                        <div className="Option-Text">
                            Remove Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box" onClick={() => {
                        history.push({
                            pathname: '/action',
                            state: {
                                loggedIn: true,
                                action: 'Suspend',
                                myProfile: myProfile,
                                employeeList: employeeList
                            }
                        })}}>
                        <div className="Option-Text">
                            Suspend Employee
                        </div>
                    </div>
                </div>
                <div className="Option-Box-Container">
                    <div className="HR-Option-Box">
                        <div className="Option-Text" onClick={() => {
                            history.push({
                                pathname: '/action',
                                state: {
                                    loggedIn: true,
                                    action: 'Reinstate',
                                    myProfile: myProfile,
                                    employeeList: employeeList
                                }
                            })}}>
                            Reinstate Employee
                        </div>
                    </div>
                </div>
                </div>
                <BackButton
                    myProfile={myProfile}
                    employeeList={employeeList}
                    backTo="home"
                />
            </div>
        );
    }
}

export default HROptions;
