import { api } from "@/utils/networks/api";
import axios from 'axios';
import { toast } from "react-toastify";

const siteSetting = async () => {
    try {
        const response = await axios.get(
            `${api}site-settings`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const blogs = async (page=1, size=20) => {
    try {
        const response = await axios.get(
            `${api}blogs?page=${page}&size=${size}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const blog = async (slug) => {
    try {
        const response = await axios.get(
            `${api}blog/${slug}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
const blogsInfo = async (page=1, size=20) => {
    try {
        const response = await axios.get(
            `${api}blogSitemap?page=${page}&size=${size}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
const product = async (slug) => {
    try {
        const response = await axios.get(
            `${api}product/${slug}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const products = async (page=1, size=20) => {
    try {
        const response = await axios.get(
            `${api}productSitemap?page=${page}&size=${size}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

const login = async (email, password) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            toast('Something is going wrong. Please try again later!!! Thanks. ',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-center',
                    theme: 'dark'
                }
            )
        }
    } catch (err) {
        toast(err,
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
                position: 'top-center',
                theme: 'dark'
            }
        )
        return err;
    }
}


const resetPasswordMail = async (email) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/reset/email`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "email": email
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            toast('Something is going wrong. Please try again later!!! Thanks. ',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-center',
                    theme: 'dark'
                }
            )
        }
    } catch (err) {
        toast(err,
            {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
                position: 'top-center',
                theme: 'dark'
            }
        )
        return err;
    }
}


const resetPassword = async (data) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/reset`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            return response?.response;
        }
    } catch (err) {
        return err;
    }
}

const refreshToken = async () => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/refresh-token`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "token": localStorage.getItem('refreshToken')
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            toast('Something is going wrong. Please try again later!!! Thanks. ',
                {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                    position: 'top-center',
                    theme: 'dark'
                }
            )
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
const logout = async () => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/logout`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        console.log(response);
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const checkServiceArea = async (postcode) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}service-area`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                "postcode": postcode
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
const register = async (data) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}auth/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.log(response);
            return response?.response;
        }
    } catch (err) {
        return err;
    }
}
const applyCoupon = async (coupon) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}apply-coupon`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                coupon: coupon,
                cart: JSON.parse(localStorage.getItem('cart'))
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
const driverOrder = async (orderInfo) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}order-with-driver`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                orderInfo: orderInfo
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const stripeSecret = async (amount) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}create-payment-intent`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                amount: amount
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const order = async (orderInfo) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}order`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                orderData: orderInfo
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const orderCompletion = async (info) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}order-completion`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                info: info
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const submitProductReview = async (formData) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}add-review`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "multipart/form-data"
            },
            data : formData
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const dashboard = async () => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}dashboard`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
const updateUser = async (user) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}user-update`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data : JSON.stringify({
                user: user
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
const changePassword = async (passwords) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}password-change`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data : JSON.stringify({
                passwords: passwords
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}


const submitQuote = async (data) => {
  try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}contact-us`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
           });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

const getOrderInfo = async (slug) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}order-info`,
            headers: {
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({
                id: slug
            })
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}


// Gift Card
const getGiftCardPrices = async (slug) => {
    try {
        const response = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `${api}gift-card-prices`,
            headers: {
                'Content-Type': 'application/json'
            },
            
        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
// Generate referral code
const generateReferralCode = async () => {
    try {
        const response = await axios.request({
            method: 'get',
            url: `${api}generate-referral-code`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
// Get gift cards
const getGiftCards = async () => {
    try {
        const response = await axios.request({
            method: 'get',
            url: `${api}get-gift-cards`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}
// Get gift cards
const addClient = async (email) => {
    try {
        const response = await axios.request({
            method: 'post',
            url: `${api}freelancer-client/add`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            data: {email: email}

        });
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        return err;
    }
}

export default {
    siteSetting,
    blogs,
    blog,
    blogsInfo,
    product,
    products,
    login,
    resetPasswordMail,
    resetPassword,
    refreshToken,
    logout,
    checkServiceArea,
    applyCoupon,
    register,
    stripeSecret,
    driverOrder,
    order,
    orderCompletion,
    dashboard,
    updateUser,
    changePassword,
    submitQuote,
    getOrderInfo,
    submitProductReview,
    getGiftCardPrices,
    generateReferralCode,
    getGiftCards,
    addClient
}