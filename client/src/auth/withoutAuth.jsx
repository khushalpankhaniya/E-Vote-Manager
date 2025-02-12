import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

function withoutAuth(ComposeComponent) {
    if (!Cookies.get('token')) {
        return <ComposeComponent />
    }

    return <Navigate to="/" />

}

export default withoutAuth

