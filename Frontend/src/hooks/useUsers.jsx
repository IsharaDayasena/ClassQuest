import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {
 useQuery,
} from "@tanstack/react-query";

const useUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('token');

  
  const {data: currentUser, isLoading, refetch}= useQuery({
    queryKey: ['user', user?.email],
    queryFn:async () =>{
     const res = await axiosSecure.get(`/user/${user?.email}`)
     return res.data
    },
    enabled: !!user?.email && !!localStorage.getItem('token')
  })
  return {currentUser,isLoading,refetch}
};

export default useUsers;
