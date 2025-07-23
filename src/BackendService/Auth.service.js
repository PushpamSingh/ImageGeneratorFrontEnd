import axios from 'axios'

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
    withCredentials: true
})

const token = localStorage.getItem('token');

class authService {
    async createUser({ fullName, email, password }) {
        try {
            const response = await API.post("/register", {
                fullName,
                email,
                password
            })
            if (response) {
                await this.loginUser({ email, password })
            } else {
                return null
            }
        } catch (error) {
            // console.log("Error :: createUser :: ", error);
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    }

    async loginUser({ email, password }) {
        try {
            const response=await API.post("/login",{email,password})
            if(response){
                const {accessToken}=response.data?.data;
                localStorage.setItem('token',accessToken);
                API.defaults.headers.common['Authorization']=`Bearer ${token}`;
                return response.data;
            }else{
                return null
            }
        } catch (error) {
            // console.log("Error :: loginUser :: ", error.response?.data?.message);
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    async logoutUser(){
        try {
            const response=await API.post('/logout',{headers:{Authorization:`Bearer ${token}`}})
            if(response){
                localStorage.setItem('token',null);
                return response.data
            }else{
                return null
            }
        } catch (error) {
            // console.log("Error :: logoutUser :: ", error.response?.data?.message);
            throw new Error(error.response?.data?.message || "Logout failed");
        }
    }

    async getUser(){
       try {
            const response=await API.get('/getuser',{headers:{Authorization:`Bearer ${token}`}})
            if(response){
                return response.data;
            }
            else{
                return null
            }
        } catch (error) {
            // console.log("Error :: getUser :: ", error.response?.data?.message);
            throw new Error(error.response?.data?.message || "fetch user failed");
        }
    }
}

const AuthService=new authService()
export default AuthService;

