import React from 'react';
import { Route } from 'react-router-dom';
import CoursesView from '../Course/CoursesView';
import CourseDetailView from '../Course/CourseDetailView';
import LecturersView from '../Lecturer/LecturersView';
import LecturerDetailView from '../Lecturer/LecturerDetailView';
import StudentView from '../Student/StudentView';
import StudentDetailView from '../Student/StudentDetailView';

export default () => ((
    <div>
        <Route exact path="/" component={CoursesView} />
        <Route exact path="/courses" component={CoursesView} />
        <Route exact path="/courses/:id" component={CourseDetailView} />
        <Route exact path="/lecturers" component={LecturersView} />
        <Route exact path="/lecturers/:id" component={LecturerDetailView} />
        <Route exact path="/students" component={StudentView} />
        <Route exact path="/students/:id" component={StudentDetailView} />
        {/*<Route exact path="/signin" component={SigninView} />*/}
    </div>
));

// const ProtectedRoute = ({component:ProtectedComponent, ...rest}) =>
//     <Route {...rest} render={props => (
//         Auth.loggedIn ? <ProtectedComponent {...props} /> :
//             <Redirect to={{
//                 pathname:'/signin', state:{from:props.location}
//             }} />
//     ) } />
