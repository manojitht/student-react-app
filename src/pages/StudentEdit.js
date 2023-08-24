import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/loading";

function StudentEdit(){

    let { id } = useParams();

    const [loading, setLoading] = useState(true)
    const [inputErrorList, setInputErrorList] = useState({})

    const[student, setStudent] = useState({})

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/student/${id}/edit`).then(res=> {
            console.log(res)
            setStudent(res.data.student);
            setLoading(false)
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        });
    }, [id])
    
    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const updateStudent = (e) => {
        e.preventDefault();
        
        setLoading(true);
        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.put(`http://127.0.0.1:8000/api/student/${id}/edit`, data).then(res => {
            alert(res.data.message);
            setLoading(false);
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if(error.response.status === 404){
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

    if(Object.keys(student).length === 0){
        return(
            <div className="container">
                <h4>No such data found!</h4>
            </div>
        )
    }

    return(
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Student
                                    <Link to="/student" className="btn btn-warning float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateStudent}>
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
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit;