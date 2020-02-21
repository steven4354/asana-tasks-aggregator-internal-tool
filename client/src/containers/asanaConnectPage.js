import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asanaConnect, getUserData, test } from "../actions"

class AsanaConnect extends Component {

    constructor(props){
        super(props)
        this.state = {
            display: "block",
        };
    }
    componentDidMount () {
        // if (localStorage.getItem("asanaToken")){
        //     const data = {token: localStorage.getItem("asanaToken")}
        //     this.setState({display: "none"})
        //     this.props.getUserData(data)
        // }
        // else{
        //     this.setState({display: "block"})
        // }
        this.getData()
        window.setInterval(this.getData(), 30000)
    }
    getData () {
      if (localStorage.getItem("asanaToken")){
        const data = {token: localStorage.getItem("asanaToken")}
        this.setState({display: "none"})
        this.props.getUserData(data)
      }
      else{
          this.setState({display: "block"})
      }
    }
    connect () {
        this.props.asanaConnect()
    }
    test () {
      this.props.test()
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
            <div className="list-group-item">The tasks are still loading, have patience</div>
          )
        }
        
    }
    render() {
        return (
            <div className='container jumbotron'>
                
                <div className='text-center header' style={{display: this.state.display}}>
                    <button className = "btn btn-outline-success"><a href="https://app.asana.com/-/oauth_authorize?response_type=code&client_id=1160440088339884&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstuff&state=<STATE_PARAM>">Authenticate with Asana</a></button>
                </div>
                
                <div className='col-md-12'>
                    <div className="card text-white bg-primary mb-3">
                    <div className="card-header"><h3>Your tasks</h3></div>
                    <ol className="list-group list-group-flush text-dark">
                        {this.displayTasks()}
                    </ol>

                    </div>
                </div>
                <button className = "btn btn-outline-success" onClick = {()=>{this.test()}}>Test</button>
    
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { asana: state.asana };
  }
  
export default connect(mapStateToProps, {asanaConnect, getUserData, test})(AsanaConnect);