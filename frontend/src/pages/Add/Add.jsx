
import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'your_upload_preset'); // replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
                formData
            );
            return response.data.secure_url; // returns the URL of the uploaded image
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        let imageUrl;
        if (image) {
            imageUrl = await uploadImageToCloudinary(image);
        }

        if (!imageUrl) return; // Stop if image upload failed

        // Now create the form data for your backend
        const productData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            category: data.category,
            imageUrl // Send Cloudinary image URL
        };

        try {
            const response = await axios.post(`${url}/api/food/add`, productData);
            if (response.data.success) {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad'
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add product. Please try again.");
            console.error("Error submitting form data:", error);
        }
    };

    return (
        <div className='add'>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Homemade Item">Homemade Item</option>
                            <option value="Catering Service">Catering Service</option>
                            <option value="Street Food">Street Food</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20'/>
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;










// import React, {useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Add = ({url}) => {

//     const [image, setImage] = useState(false);
//     const [data, setData] = useState({
//         name:'',
//         description:'',
//         price:'',
//         category:'Salad'
//     })

//     const onChangeHandler = (event) =>{
//         const name = event.target.name;
//         const value = event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }

//     const onSubmitHandler = async (event) =>{
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append('name', data.name)
//         formData.append('description', data.description)
//         formData.append('price', Number(data.price))
//         formData.append('category', data.category)
//         formData.append('image', image)
//         const response = await axios.post(`${url}/api/food/add`, formData);

//         if(response.data.success){
//             setData({
//                 name:'',
//                 description:'',
//                 price:'',
//                 category:'Salad'
//             })
//             setImage(false);
//             toast.success(response.data.message)
//         }else{
//             toast.error(response.data.message)
//         }
//     }

//   return (
//     <div className='add'>
//         <form  className="flex-col" onSubmit={onSubmitHandler}>
//             <div className="add-img-upload flex-col">
//                 <p>Upload Image</p>
//                 <label htmlFor="image">
//                     <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
//                 </label>
//                 <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
//             </div>
//             <div className="add-product-name flex-col">
//                 <p>Product name</p>
//                 <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here' />
//             </div>
//             <div className="add-product-description flex-col">
//                 <p>Product description</p>
//                 <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write content here' required></textarea>
//             </div>
//             <div className="add-category-price">
//                 <div className="add-category flex-col">
//                     <p>Product category</p>
//                     <select onChange={onChangeHandler}  name="category">
//                         <option value="Salad">Salad</option>
//                         <option value="Rolls">Rolls</option>
//                         <option value="Deserts">Deserts</option>
//                         <option value="Sandwich">Sandwich</option>
//                         <option value="Cake">Cake</option>
//                         <option value="Pure Veg">Pure Veg</option>
//                         <option value="Pasta">Pasta</option>
//                         <option value="Noodles">Noodles</option>
//                         <option value="Noodles">Homemade Item</option>
//                         <option value="Noodles">Catering Service</option>
//                         <option value="Noodles">Streed Food</option>
//                     </select>
//                 </div>
//                 <div className="add-price flex-col">
//                     <p>Product price</p>
//                     <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20'/>
//                 </div>
//             </div>
//             <button type='submit' className='add-btn'>ADD</button>
//         </form>
//     </div>
//   )
// }

// export default Add