import React, { useEffect, useState } from "react";
import "./student-profile.styles.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import { useNavigate } from "react-router-dom";
const StudentProfile = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState();
    const [internData, setInternData] = useState();

    const typeOfUser = localStorage.getItem('type');
    useEffect(() => {
        const getProfile = async () => {
            const res = await axios.get(`http://localhost:3000/student/${params.id}`);
            setStudent(res.data.data[0]);
        }
        const getInternData = async () => {
            const res = await axios.get(`http://localhost:3000/internship/${params.id}`);
            setInternData(res.data.data);
        }
        getProfile();
        getInternData();
    }, [])

    const sendToEditPage = () => {
        navigate('/student/edit',{
            state: {
                student: student
            }
        })
    }

    return (
        student ? 
        <div className="student__profile">
            <p>{student.first_name}</p>
            <p>{student.middle_name}</p>
            <p>{student.last_name}</p>
            <p>{student.contact}</p>
            <p>{student.dob}</p>
            <p>{student.batch}</p>
            <p>{student.major}</p>
            <p>{student.email}</p>
            <p>{student.student_id}</p>
            {
                typeOfUser === "student" ?
                <Button onClickHandler={sendToEditPage}>Edit Details</Button>
                :
                ""
            }
            {
                internData ? 
                <div>
                    <br />
                    <br />
                    <p>{internData.company_name}</p>
                    <p>{internData.duration}</p>
                    <p>{internData.position}</p>
                </div>
                :
                <div>
                    <br />
                    <br />
                    GET INTERN MF!! :)
                </div>
            }
            {
                typeOfUser === "student" ? 
                <Link to={'/internship-dataform'}>Add Internship</Link>
                :
                ""
            }
            <Link to={`/academics/${student.student_id}`}>Show Academics</Link>
        </div>
        :
        <div className="student__profile">
            LOADING...
        </div>
    )
}

export default StudentProfile;