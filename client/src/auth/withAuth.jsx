import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

function withAuth(ComposeComponent) {

    if (Cookies.get('token')) {
        return <ComposeComponent />
    }
    return <Navigate to="/login" />

}

export default withAuth

