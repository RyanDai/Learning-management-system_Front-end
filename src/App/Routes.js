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
import {Auth} from '../Utils/Auth';

export default () => ((
    <div>
        <Route exact path="/" component={CoursesView} />
        <Route exact path="/courses" component={CoursesView} />
        <ProtectedRoute exact path="/courses/:id" component={CourseDetailView} />
        <Route exact path="/lecturers" component={LecturersView} />
        <ProtectedRoute exact path="/lecturers/:id" component={LecturerDetailView} />
        <Route exact path="/students" component={StudentView} />
        <Route exact path="/students/:id" component={StudentDetailView} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Signin} />
    </div>
));

const ProtectedRoute = ({component:ProtectedComponent, ...rest}) =>
    <Route {...rest} render={props => (
        Auth.loggedIn() ? <ProtectedComponent {...props} /> :
            <Redirect to={{
                pathname:'/login', state:{from:props.location}
            }} />
    ) } />
