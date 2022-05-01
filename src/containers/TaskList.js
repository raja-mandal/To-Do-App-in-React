import React from 'react';
import '../styles/TaskList.css';
import { FaCheck, FaTimes } from "react-icons/fa";
import axiosInstance from '../hooks/Axios';

function TaskList({ propsData, propsLoadUserFunc }) {

  const deleteMethod = async (objId) => {
    await axiosInstance.delete(`todo/${objId}`)
    propsLoadUserFunc()
  }
  
  const completeTaskMethod = async (objStatus, objId) => {
    if (objStatus === false) {
       let statusUpdate = true;
       const dataConfig = { status: statusUpdate }
       await axiosInstance.patch(`todo/${objId}`, dataConfig)
       propsLoadUserFunc()
    }
  }

 const {task, status, id} = propsData;

  return (
    <>
     <div className="task__list--wrapper mt-3">
        <ul>
            <li className='mb-2 task__list'>
             { status === true ? <s>{task}</s> : <span>{task}</span> }
             { status == true ? null : <span className="right-icon"><FaCheck className='action__icon' onClick={() => completeTaskMethod(status, id)} /></span> } 
             <span className="close-icon"><FaTimes className='action__icon' onClick={() => deleteMethod(id)} /></span>
            </li>
        </ul>
     </div>
    </>
  )
}

export default TaskList