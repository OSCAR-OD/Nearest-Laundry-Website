
import { toast } from 'react-toastify';

// const toastSetting = {
//     autoClose: 2000,
//     transition: Slide,
//     position: "top-right",
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined
// }

const toastSetting = {
    hideProgressBar: true,
    autoClose: 2000,
    position: "top-right",
    theme: "dark",
};

export const errorHandler = error => {

    // console.log("error------>>");
    // console.log(error.response.data.errors[Object.keys(error.response.data.errors)[0]]);

    if (error && error.response && error.response.status === 401) {
        // 401 (Unauthorized)
        // TokenExpired(error.response.data.message);
        toast.error(error.response.data.message, { ...toastSetting });
        
    }else if(error && error.response && error.response.status === 400) {

        
        
        console.log("Error", error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] );
        if(Object.keys(error.response.data.errors).length > 0){
            // in dolil project
            // toast.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]], { ...toastSetting });
            // for nearest laundry
            toast.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0], { ...toastSetting });
        }

    }else if(error && error.response && error.response.status === 422){
        // 422 (Unprocessable Content)
        // console.log(error.response.data.errors);
        // toast.error(error.response.data.message, { ...toastSetting });

        if(Object.keys(error.response.data.errors).length > 0){
            toast.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]], { ...toastSetting });
        }
    } else if (error && error.response && error.response.status === 501) {
        // 501 Not Implemented server error response code 
        // means that the server does not support the functionality required to fulfill the request.
        toast.error(error.response.data.message, { ...toastSetting })
    } else if (error && error.response && error.response.status === 500) {
      
      // 500 (Internal Server Error)
      // means Internal Server Error
      toast.error("Something is wrong. Please try again.", { ...toastSetting })
    } else if (error && error.response && error.response.status === 404) {
        toast.error(error.response.data.message, { ...toastSetting })
    } else {
        toast.error("Network error.", { ...toastSetting })
    }
}
