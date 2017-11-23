import React, {Component} from 'react';
import axios from 'axios';
import '../styles/detail.css';

export default class LecturerDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isEditing: false,
            isSaving: false,
            lecturer: {}

        }
    }

    isNew() {
        const { id } = this.props.match.params;
        return id === 'create';
    }

    componentWillMount() {
        if (this.isNew()) {
            this.setState({lecturer: {}, isEditing: true});
            return;
        }
        this.loadLecturer()
    }

    loadLecturer() {
        const { id } = this.props.match.params;
        this.setState({isLoading: true});
        axios.get(`/api/lecturer/${id}`)
            .then(response => {
                console.log(response.data);
                this.setState({
                lecturer: response.data,
                isLoading: false
                });
            })
            .catch(error => console.log(error));
    }

    renderDisplay(lecturer) {
        return (
            <div className="highlight">
                <h1 className="name">{lecturer.FirstName} &nbsp; {lecturer.LastName}</h1>
                <div className="row">
                    <img src ="..." />
                    <ul className="fa-ul">
                        <li><i class="fa-li fa fa-envelope" aria-hidden="true"></i>{lecturer.Email}</li>
                        <li><i class="fa-li fa fa-phone" aria-hidden="true"></i>{lecturer.Phone}</li>
                    </ul>
                </div>
                <div className="row">
                    <p>Morbi laoreet ipsum sem, eu condimentum ante efficitur vel.
                        Donec at nibh risus. Nam mollis nulla eget scelerisque facilisis.
                        Suspendisse sit amet condimentum dolor. Vestibulum euismod congue mi
                        pulvinar dignissim. </p>
                    <button className = "btn btn-primary">Edit</button>
                    <button className = "btn btn-danger" >Delete</button>
                </div>
            </div>
        )
    }

    renderForm(lecturer) {

    }

    render() {
        const {isLoading, isEditing, lecturer} = this.state;
        if (isLoading)
            return <span>Loading lecture</span>;

        return isEditing ?
            this.renderForm(lecturer) : this.renderDisplay(lecturer);
    }

}
