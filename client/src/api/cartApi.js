import axios from "axios"
export const getCart = async() =>{
    const res = await axios.get("http://localhost:3000/carts");
    return res.data
}
export const addCart = async(product)=>{
    const res = await axios.post("http://localhost:3000/carts",product);
    return res.data
}
export const deleteCart = async(id)=>{
    const res = await axios.delete(`http://localhost:3000/carts/${id}`);
    return res.data
}
export const updateCart = async(id,payload)=>{
    const res = await axios.patch(`http://localhost:3000/carts/${id}`,payload);
    return res.data
}