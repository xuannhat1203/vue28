import axios from "axios"

export const getAllProduct = async() =>{
    const res = await axios.get("http://localhost:3000/listProduct");
    return res.data
}
export const addProduct = async(product)=>{
    const res = await axios.post("http://localhost:3000/listProduct",product);
    return res.data
}
export const deleteProduct = async(id)=>{
    const res = await axios.delete(`http://localhost:3000/listProduct/${id}`);
    return res.data
}