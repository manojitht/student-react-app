import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/loading";

function Student(){

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/student`).then(res=> {
            console.log(res)
            setStudents(res.data.students);
            setLoading(false)
        });
    }, [])

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/student/${id}/delete`).then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();
        }).catch(function (error) {
            if(error.response){
                if(error.response.status === 404){
                    alert(error.response.data.message)
                    thisClicked.innerText = "Delete";
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

    var studentDetails ="";
    studentDetails = students.map((item, index) => {
        return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td><Link to={`/student/${item.id}/edit`} className="btn btn-success">Edit</Link></td>
                <td><button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger">Delete</button></td>
            </tr>
        )
    })
    
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Students List
                                <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student;