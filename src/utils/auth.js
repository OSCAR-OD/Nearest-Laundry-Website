import jwtDecode from "jwt-decode";
import REQUEST from "@/utils/networks/Request";
export const authCheck = async (token) => {
    const decodedJwt = jwtDecode(token);
    //Check if access token expired
    if (decodedJwt.exp * 1000 < Date.now()){
        //If access token is expired then refresh it with refresh token
        const response = await REQUEST.PageData.refreshToken();
        if(response?.success){
            localStorage.setItem('accessToken',response.data.token);
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userInfo');
            return false;
        }
    }
    return true;
}