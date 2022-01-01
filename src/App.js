import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Alert } from 'reactstrap';
import { getUserRequest, createUserRequest, deleteUserRequest, userError } from "./actions/users.actions";
import UserList from './components/UserList';
import NewUserForm from './components/NewUserForm';


class App extends Component {

  constructor(props){
    super(props);

    //When render this component `getUserRequest()` will be fire
    this.props.getUserRequest();
  }

  handleSubmit = ({firstName, lastName}) => {
    this.props.createUserRequest({firstName, lastName});
  };

  handleDeleteUserClick = (userId) =>{
    this.props.deleteUserRequest(userId);
  }
  handleCloseAlert = () => {
    this.props.userError({
      error:''
    });
  }

  render(){
    const users = this.props.users;
    console.log(users);
    return(
      <div style={{margin:'0 auto', padding: '20px', maxWidth: '600px'}}>
        <Alert
          color="danger"
          isOpen={!!users.error}
          toggle={this.handleCloseAlert}
        >
          {users.error}
        </Alert>
        {/* {!!users.error?
          <div
            style={{
              display:'flex',
              backgroundColor:'red',
              padding: '10px',
              borderRadius: '6px',
              justifyContent: 'space-between'
            }}
          >
            <div style={{flexGrow: 1, color: '#fff'}}>
              {users.error}
            </div>

            <Button close onClick={this.handleCloseAlert} />
          </div>
        :null} */}
        
        <NewUserForm onSubmit={this.handleSubmit} />
        <UserList users={users.items} onDeleteUser={this.handleDeleteUserClick} />
      </div>
    )
  }
}

export default connect(({users}) => ({users}), {
  // this is map dispatch to props
  getUserRequest,
  createUserRequest,
  deleteUserRequest,
  userError
})(App);

//  connect(null, {
  // this is map dispatch to props
//   getUserRequest
// }
// 1st parameter (null) is map state to props
// 2nd parameter {} is map dispatch to props (redux actions)
// its a short hand of map state to props
