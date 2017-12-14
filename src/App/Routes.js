import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CoursesView from '../Course/CoursesView';
import CourseDetailView from '../Course/CourseDetailView';
import LecturersView from '../Lecturer/LecturersView';
import LecturerDetailView from '../Lecturer/LecturerDetailView';
import StudentView from '../Student/StudentView';
import StudentDetailView from '../Student/StudentDetailView';
import Register from "../Login/Register";
import Signin from '../Login/Login';
import { Auth } from '../Utils/Auth';
import DashBoard from "../DashBoard/DashBoard";
import Calendar from '../UI/Calendar';

export default () => ((
    <div>
        <ProtectedRoute exact path="/" component={DashBoard} />
        <ProtectedRoute exact path="/courses" component={CoursesView} />
        <ProtectedRoute exact path="/courses/:id" component={CourseDetailView} />
        <ProtectedRoute exact path="/lecturers" component={LecturersView} />
        <ProtectedRoute exact path="/lecturers/:id" component={LecturerDetailView} />
        <ProtectedRoute exact path="/students" component={StudentView} />
        <ProtectedRoute exact path="/students/:id" component={StudentDetailView} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Signin} />
        <Route exact path="/calendar" component={Calendar} />
    </div>
));

const ProtectedRoute = ({ component: ProtectedComponent, ...rest }) =>
    <Route {...rest} render={props => (
        Auth.loggedIn() ? <ProtectedComponent {...props} /> :
            <Redirect to={{
                pathname: '/login', state: { from: props.location }
            }} />
    )} />
