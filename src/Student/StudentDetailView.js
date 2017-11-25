import React, {Component} from 'react';

export default class StudentDetailView extends Component{
  constructor(props){
    super(props);
    this.state = {
      num:0,
      student:{
        FirstName:"",
        LastName:"",
        phone:"",
        Email:""
      }
    }
  }
/*
  sendRequest(id){
    var studentURL = 'http://lazebear.azurewebsites.net/api/student'+'/'+id;

    axios.get(studentURL)
      .then((response) => {
        const student = response.data.map(function(d){
          return{
            ID: d.ID,
      			FirstName: d.FirstName,
            LastName: d.LastName,
      			Phone: d.Phone,
            Email:d.Email,
            Address:d.Address
          }
        });
        this.setState({students});

      })
      .catch((error) => {
        console.log(error);

      });
  }*/

  componentWillMount(){
    const id = this.props.match.params.id;
    this.setState({num:id});
  }

  render(){
    return(

      <div className="detailContainer">
        <h1>Student details</h1>
        <div className="jumbotron">
          <h1 className="display-3">{this.state.num}</h1>
          <p className="lead">Some information</p>
          <hr className="my-4"></hr>
          <p>It uses utility classetypography and spacing to space content out within the larger container.</p>
          <p className="lead">
            <button className="btn btn-primary btn-lg">Edit student</button>
          </p>
        </div>
      </div>
    )
  }
}
