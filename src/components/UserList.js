import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";

const UserList = ({users, onDeleteUser})=>{
    return(
        <ListGroup>
            {users ?
                users.sort((a, b) => {
                    if(a.firstName > b.firstName){
                        return 1
                    } else if(a.firstName < b.firstName){
                        return -1
                    } else if(a.lastName > b.lastName){
                        return 1
                    } else if(a.lastName < b.lastName){
                        return -1
                    }else{
                        return 0;
                    }
                }).map(user=>(
                    <ListGroupItem key={user.id}>
                        <div style={{ display: 'flex', alignItems:'center'}}>
                            <div style={{flexGrow: 1}}>
                                {user.firstName} {user.lastName}
                            </div>
                            <Button color="danger" onClick={()=> onDeleteUser(user.id)}>
                                Delete
                            </Button>
                        </div>
                        
                    </ListGroupItem>
                ))
            :null}

        </ListGroup>
    )
}

export default UserList;