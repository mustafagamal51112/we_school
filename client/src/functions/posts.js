import  axios  from 'axios';
import { toast } from 'react-toastify';


const baseUrl = 'https://we-school-api.vercel.app'

export const getPosts = async ()=>{
  try {
    
  const response = await axios.get(baseUrl + "/posts")
  return response.data
  } catch (error) {
    return toast.error(error.response.data.error)
  
    
  }
}

export const toggleLike = async (userId,postId)=>{
  try {
    const response = await axios.post(baseUrl+"/posts/toggle-like",{
      userId,
      postId
    })
    return toast.success(response.data.msg)
  } catch (error) {
    return toast.error(error.response.data.error)
  }
}



export const uploadPost = async (content, files,grade) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  try {
    const formData = new FormData();
    formData.append('email', currentUser.email);
    formData.append('content', content);
    formData.append('grade', grade);

    // Append each file to the formData
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await axios.post(baseUrl + '/posts/upload', formData);

    const { error, msg } = response.data;
    if (error) {
      toast.error(error);
    } else if (msg) {
      toast.success(msg);
    }

    return true;
  } catch (error) {
    toast.error(error.response.data.error);
    return false;
  }
};



export const deletePost =  async(post_id,user_id) => {
  try {
  const response = await axios.delete(baseUrl + `/posts/${post_id}/${user_id}`)
  
   toast.success(response.data.msg)

    
  } catch (error) {
     toast.error(error.response.data.error)    
  }
}