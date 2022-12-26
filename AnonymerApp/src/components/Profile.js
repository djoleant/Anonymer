import EmployerInfoPage from "../EmployerInfoPage";
import StudentProfilePage from "../StudentProfilePage";

export default function Profile(props) {
    const role = localStorage.getItem("role");
    if (role === "Student") {
        return <StudentProfilePage {...props} />;
    }
    else
        return <EmployerInfoPage {...props} />;
}