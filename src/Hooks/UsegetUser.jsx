import {useQuery} from '@tanstack/react-query'
import AuthService from "../BackendService/Auth.service"
export const useGetUser=()=>{
    const {data,isLoading,error,refetch} = useQuery({
        queryKey:['authUser'],
        queryFn:async()=>{
            try {
                const response=await AuthService.getUser();
                if(response){
                    return response.data;
                }else{
                    return response;
                }
            } catch (error) {
                return null
            }
        },
        retry:false
    })
    return {authUser:data,isLoading:isLoading,error:error,refetchAuthUser: refetch};
}