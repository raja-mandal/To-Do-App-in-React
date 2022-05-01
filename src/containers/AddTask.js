import React, { Fragment, useEffect, useState } from 'react';
import '../styles/AddTask.css';
import TaskList from './TaskList';
import axiosInstance from '../hooks/Axios';
import todoImage from '../assets/empty-file.svg'
import { FaPlus } from "react-icons/fa";

function AddTask() {
  const [getData, setData] = useState([])
  const [taskVal, setTaskVal] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const dataConfig = {task: taskVal, status: false, id: Math.random()}  
    await axiosInstance.post(`todo`, dataConfig)
    loadUser()
    console.log(taskVal)
  }

  useEffect(() => {
   loadUser()
  }, [])

 const loadUser = async () => {
   const result = await axiosInstance.get(`todo`)
   setData(result.data.reverse())
 } 

  return (
    <>
        <div className="add__task--wrapper">
            <div className="flex__wrapper">
                <div className="task__input--field">
                    <input
                        type="text"
                        placeholder="Write here"
                        onChange={(e) => setTaskVal(e.target.value)}
                        className="input__task"
                    />
                </div>
                <div className="add__task--btn" onClick={handleFormSubmit}>
                   <FaPlus color="#fff" className='plus__icon'/>
                </div>
            </div>
        </div>

        {
            getData.length > 0 ? 
                getData?.map((tasks, index) => (
                <Fragment key={index}>
                    <TaskList propsData={tasks} propsLoadUserFunc={loadUser}/>
                </Fragment>
            )) 
            : 
            <div>
                <img className="empty__files" src={todoImage} alt="file-icon" />
            </div>
        }
    </>
  )
}

export default AddTask