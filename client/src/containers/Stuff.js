import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asanaConnect, getUserData } from "./../actions"
class Stuff extends Component {
  constructor(props){
    super(props)
    this.state = {
      dataAvailable : false,
      stopUpdate: true
    };
  }
  componentDidMount () {
    this.getURL()
  }
  getURL () {
    const params = (new URL(document.location)).searchParams;
    const code = params.get("code");
    this.props.asanaConnect({accessCode: code})

  }
  getData () {
    const token = this.props.asana.asana_success
    this.props.getUserData(token)
  }
  displayTasks () {
    if (this.props.asana.asana_data.data){
      return this.props.asana.asana_data.data.map((item) => {
        return (
          // <div>
          //   <div>{item.name}</div>
          //   <div>{item.notes}</div>
          //   <div>lol</div>
          // </div>
          <li className="list-group-item">
            <div>
              Task Name: {item.name}
            </div>
            <div>
              Task Description: {item.notes}
            </div>
          </li>
        )
      })
    }
    else{
      return(
        <div>The tasks are still loading, have patience</div>
      )
    }
    
  }
  render() {
    // const height = {
    //   height: '350px'
    // }
    if (this.props.asana.asana_data && !this.state.dataAvailable){
      this.setState({dataAvailable: true})
    };
    if (this.props.asana.asana_success && !this.props.asana.asana_error && !this.state.dataAvailable){
      return (
        <div className='container jumbotron'>
          <div className='text-center header'>
            <button className='btn btn-success' onClick={()=>{this.getData()}}>Get Your Tasks</button>
          </div>
          
        </div>
      )
    }
    
    else if(!this.props.asana.asana_success && this.props.asana.asana_error && !this.state.dataAvailable){
      return(
        <div className='container jumbotron' >
          <div className='text-center header'>An Error ocurred, please click the button below to restart the process
            <button className='btn btn-light'><a href="http://localhost:3000/asana">Go Back</a></button>
          </div>
        </div>
        
      )
    }
    else if(!this.props.asana.asana_success && !this.props.asana.asana_error && !this.state.dataAvailable){
      return (
        <div className='container jumbotron'>
          <div className='text-center header'>click on the button below to get your token
            <br/>
            <button className='btn btn-success' onClick={()=>{this.getURL()}}> Get Your Token </button>
          </div>
          
        </div>
      )
    }
    else if(this.state.dataAvailable){
      return(
        <div className='container jumbotron' >
          <div className='col-md-12'>
            <div className="card text-white bg-primary mb-3">
              <div className="card-header"><h3>Your tasks</h3></div>
              <ol className="list-group list-group-flush text-dark">
                {this.displayTasks()}
              </ol>

            </div>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className='container jumbotron' >
          <div className='text-center header'>An Error ocurred, please click the button below to restart the process
            <button className='btn btn-light'><a href="http://localhost:3000/asana">Go Back</a></button>
          </div>
          
        </div>
      )
    }
    
  }
}

function mapStateToProps(state) {
  return { asana: state.asana };
}

export default connect(mapStateToProps, {asanaConnect, getUserData})(Stuff);