import axios from "axios";

const API = axios.create({
    baseURL: "/api/v1/img" || `${import.meta.env.VITE_BACKEND_URL}/api/v1/img`,
    withCredentials: true
})
const token = localStorage.getItem('')

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
}

const ImageService=new imageService()
export default ImageService
