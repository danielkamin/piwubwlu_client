import { API_URL } from '../utils/constants';
import customAxios from '../utils/api/customAxios';
const URL = API_URL+'/api';
export const getData = async (model:string,token:string)=>{
    let newUrl = URL+'/'+model;
    try{
        const {data} =  await customAxios(newUrl, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token }
          });
        let values = Object.keys(data).length === 0 && data.constructor === Object ? [] : data;
        console.log("OUTPUT ~ file: index.ts ~ line 12 ~ getData ~ values", values)
        return values;
    }catch(error){
        console.log(error)
        return Promise.reject(error.response);
    }
}
export const deleteData = async(model:string,token:string)=>{
    let newUrl = URL+'/'+model;
    try{
        const res =  await customAxios(newUrl, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token }
          });
        return res;
    }catch(error){
        console.log(error);
    }
}
export const putData = async(model:string,token:string,putData:{})=>{
    let newUrl = URL+'/'+model;
    console.log("OUTPUT ~ file: index.ts ~ putData ~ putData", putData)
    try{
        const res = await customAxios(newUrl, {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + token },
            data:putData
          });
        return res;
    }catch(error){
        console.log(error.data);
        return Promise.reject(error.data);
    }
}

export const postData = async(model:string,token:string,postData:{})=>{
    let newUrl = URL+'/'+model;
    try{
        const res = await customAxios(newUrl, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            data:postData
          });
        return res;
    }catch(error){
        console.log(error);
    }
}
export const postImage = async(model:string,token:string,image:File,id:string)=>{
    let newUrl = URL+'/'+model;
    const fd = new FormData();
    fd.append('image',image,image.name)
    fd.append('id',id);
    try{
        const res = await customAxios(newUrl, {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token ,"Content-Type": "multipart/form-data"},
            data:fd,
            onUploadProgress:progressEvent=>{
                console.log('%: '+progressEvent.loaded/progressEvent.total)
            }
          });
          return res;
    }catch(error){
        console.log(error);
    }
}
export const authRoute = async(model:string,postData:{},token?:string)=>{  
    let newUrl = API_URL + '/auth/'+model    
    let authHeader = token!==undefined?'Bearer ' + token:'';
    try{
        const res = await customAxios(newUrl,{
            method:'POST',
            headers:{Authorization:authHeader},
            data:postData
        })
        return res;   
    }catch(error){
        console.log(error.data);
        return Promise.reject(error.data);
    }
    
}