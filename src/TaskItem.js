import React from 'react'
import { db } from "./firebase";
import { Button } from "reactstrap";
// import ClearIcon from "@material-ui/icons/Clear";
const TaskItem = ({id}) => {
        const DeleteInputData = () =>{
      db.collection("posts").doc(id).delete();  
    };
    return (
        <div>
            <Button　onClick={DeleteInputData}>削除</Button>
        </div>
    );
};
export default TaskItem;