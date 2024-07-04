
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function RequireAuth({allowedRoles})
{
const {isLoggedIn,role}= useSelector((state)=>state.auth);


return isLoggedIn&&allowedRoles.find((myrole)=>myrole===role)?(

    <Outlet></Outlet>
):isLoggedIn?(<Navigate to="/access-denied" ></Navigate>):(<Navigate to="/login"></Navigate>)
}
export default RequireAuth