import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/loading";

function StudentCreate(){

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [inputErrorList, setInputErrorList] = useState({})

    const[student, setStudent] = useState({
        name: '',
        course: '',
        email: '',
        phone: ''
    })
    
    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const saveStudent = (e) => {
        e.preventDefault();
        
        setLoading(true);
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.post(`http://127.0.0.1:8000/api/student`, data).then(res => {
            alert(res.data.message);
            navigate('/student')
            setLoading(true);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        })
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Student
                                    <Link to="/student" className="btn btn-warning float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveStudent}>
                                    <div className="mb-3">
                                        <label className="form-label">Student Name:</label>
                                        <input type="text" name="name" value={student.name} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.name}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Student Course:</label>
                                        <input type="text" name="course" value={student.course} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.course}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Student Email:</label>
                                        <input type="email" name="email" value={student.email} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Student Phone:</label>
                                        <input type="text" name="phone" value={student.phone} onChange={handleInput}className="form-control" />
                                        <span className="text-danger">{inputErrorList.phone}</span>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentCreate;