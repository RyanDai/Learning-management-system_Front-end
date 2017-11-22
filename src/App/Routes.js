import React from 'react';
import {Route} from 'react-router-dom';
import CoursesView from '../Course/CoursesView';
import CourseDetailView from '../Course/CourseDetailView';
import LecturersView from '../Lecture/LecturesView';

export default () => ((
    <div>
        <Route exact path="/" component={CoursesView} />
        <Route exact path="/courses" component={CoursesView} />
        <Route exact path="/courses/:id" component={CourseDetailView} />
        <Route exact path="/lecturers" component={LecturersView} />
        {/*<Route exact path="/students" component={StudentsView} />*/}
        {/*<Route exact path="/signin" component={SigninView} />*/}
    </div>
));
