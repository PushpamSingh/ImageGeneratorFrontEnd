import axios from "axios";

const API = axios.create({
    baseURL: "/api/v1/img" || `${import.meta.env.VITE_BACKEND_URL}/api/v1/img`,
    withCredentials: true
})
const token = localStorage.getItem('token')

class imageService {
    async generateImage({prompt}) {
        try {
            const response = await API.post('/generateImg',{prompt}, { headers: { Authorization: `Bearer ${token}` } })
            if(response){
                return response.data;
            }else{
                return null
            }
        } catch (error) {
            // console.log("Error :: logoutUser :: ", error.response?.data?.message);
            throw new Error(error.response?.data?.message || "image generated failed");
        }
    }

    async PaymentRazorpay({planId}){
        try {
            // console.log("PlanId: ",planId);
            
            const response=await API.post('/payrazorpay',{planId},{headers:{Authorization:`Bearer ${token}`}})
            if(response){
                return response.data;
            }
            else{
                return null
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "paymentRazorpay failed");
        }
    }
    async veriFyRazorpay({razorpay_order_id}){
        try {
            // console.log("Order: id",razorpay_order_id);
            
            const response =await API.post('/veriFyRazorpay',{razorpay_order_id},{headers:{Authorization:`Bearer ${token}`}})
            if(response){
                return response.data;
            }else{
                return null;
            }
        } catch (error) {
             throw new Error(error.response?.data?.message || "VerifyRazorpay failed");
        }
    }
}

const ImageService=new imageService()
export default ImageService
