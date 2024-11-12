
import React, { useState, useContext } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreContext } from '../../components/context/StoreContext';

const Add = () => {
  const { url } = useContext(StoreContext); // Assuming StoreContext is where you manage your URL
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  // Handler for form input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle image upload to Cloudinary
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'order_delivery_preset'); // Your Cloudinary preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsx5abzif/image/upload', // Cloudinary API URL
        formData
      );
      return response.data.secure_url; // returns the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  // Submit handler for the form
  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   let imageUrl = null;

  //   if (image) {
  //     imageUrl = await uploadImageToCloudinary(image);
  //   }

  //   if (!imageUrl) return; // Stop if image upload failed

  //   const productData = {
  //     name: data.name,
  //     description: data.description,
  //     price: Number(data.price),
  //     category: data.category,
  //     imageUrl // Send Cloudinary image URL
  //   };

  //   try {
  //     const response = await axios.post(`${url}/api/food/add`, productData);

  //     if (response.data.success) {
  //       setData({
  //         name: '',
  //         description: '',
  //         price: '',
  //         category: 'Salad'
  //       });
  //       setImage(null);
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error('Failed to add product. Please try again.');
  //     console.error('Error submitting form data:', error);
  //   }
  // };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let imageUrl = null;
  
    // Check if an image is selected, and upload it to Cloudinary
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }
  
    // If no image URL was provided, show an error
    if (!imageUrl) {
      toast.error('Image upload failed. Please try again.');
      return; // Stop the form submission if imageUrl is not provided
    }
  
    // Create the product data object to send to the backend
    const productData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      imageUrl // Pass the Cloudinary image URL
    };
  
    try {
      // Send product data to the backend
      const response = await axios.post(`${url}/api/food/add`, productData);
  
      if (response.data.success) {
        // Reset form fields after successful submission
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        });
        setImage(null); // Reset the image state
  
        toast.success(response.data.message); // Display success message
      } else {
        toast.error(response.data.message); // Display error message if the backend responds with a failure
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('Error submitting form data:', error);
      toast.error('Failed to add product. Please try again.');
    }
  };
  
    

  return (
    <div className="container add mt-5">
      <form className="row g-4" onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="col-12 text-center">
          <label htmlFor="image" className="form-label">
            Upload Image
          </label>
          <div
            className="border border-primary rounded p-3 d-flex flex-column align-items-center"
            style={{
              borderStyle: 'dashed',
              backgroundColor: '#f8f9fa',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('image').click()}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected"
                className="img-fluid rounded mb-2"
                style={{ maxWidth: '200px', height: 'auto' }}
              />
            ) : (
              <>
                <img
                  src={assets.upload_area}
                  alt="Upload Icon"
                  className="mb-2"
                  style={{ width: '50px', height: '50px' }}
                />
                <p className="text-muted">Click to upload an image</p>
              </>
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
        </div>

        {/* Product Name Field */}
        <div className="col-12">
          <label className="form-label">Product Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name" // Ensure name attribute is present
            className="form-control"
            placeholder="Type Here"
            required
          />
        </div>

        {/* Product Description Field */}
        <div className="col-12">
          <label className="form-label">Product Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description" // Ensure name attribute is present
            className="form-control"
            rows="4"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        {/* Product Category Field */}
        <div className="col-md-6">
          <label className="form-label">Product Category</label>
          <select
            onChange={onChangeHandler}
            name="category" // Ensure name attribute is present
            className="form-select"
            required
          >
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

        {/* Product Price Field */}
        <div className="col-md-6">
          <label className="form-label">Product Price</label>
          <input
            onChange={onChangeHandler}
            value={data.price}
            type="number"
            name="price" // Ensure name attribute is present
            className="form-control"
            placeholder="$20"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;





// import React, { useState, useContext, useEffect } from 'react';
// import './Add.css';
// import { assets } from '../../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { StoreContext } from '../../components/context/StoreContext';

// const Add = () => {
//   const { url } = useContext(StoreContext); // Assuming StoreContext is where you manage your URL
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: 'Salad'
//   });

//   // Effect hook to check if the token is valid
//   // useEffect(() => {
//   //   const token = localStorage.getItem('authToken');
//   //   if (!token) {
//   //     toast.error('You are not authenticated. Please log in.');
//   //     // Optionally redirect to login page
//   //   }
//   // }, []);

//   // Handler for form input changes
//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Function to handle image upload to Cloudinary
//   const uploadImageToCloudinary = async (imageFile) => {
//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('upload_preset', 'order_delivery_preset'); // Your Cloudinary preset

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dsx5abzif/image/upload', // Cloudinary API URL
//         formData
//       );
//       return response.data.secure_url; // returns the URL of the uploaded image
//     } catch (error) {
//       console.error('Error uploading image to Cloudinary:', error);
//       return null;
//     }
//   };

//   // Submit handler for the form
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     let imageUrl = null;

//     if (image) {
//       imageUrl = await uploadImageToCloudinary(image);
//     }

//     if (!imageUrl) return; // Stop if image upload failed

//     const productData = {
//       name: data.name,
//       description: data.description,
//       price: Number(data.price),
//       category: data.category,
//       imageUrl // Send Cloudinary image URL
//     };

//     // Retrieve token from localStorage or context
//     const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token key name

//     if (!token) {
//       toast.error('Authentication failed. Please login again.');
//       return;
//     }

//     try {
//       const response = await axios.post(`${url}/api/food/add`, productData, {
//         headers: {
//           Authorization: `Bearer ${token}` // Send token as authorization header
//         }
//       });

//       if (response.data.success) {
//         setData({
//           name: '',
//           description: '',
//           price: '',
//           category: 'Salad'
//         });
//         setImage(null);
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         toast.error('Authentication failed. Please login again.');
//       } else {
//         toast.error('Failed to add product. Please try again.');
//       }
//       console.error('Error submitting form data:', error);
//     }
//   };

//   return (
//     <div className="container add mt-5">
//       <form className="row g-4" onSubmit={onSubmitHandler}>
//         {/* Image Upload Section */}
//         <div className="col-12 text-center">
//           <label htmlFor="image" className="form-label">
//             Upload Image
//           </label>
//           <div
//             className="border border-primary rounded p-3 d-flex flex-column align-items-center"
//             style={{
//               borderStyle: 'dashed',
//               backgroundColor: '#f8f9fa',
//               cursor: 'pointer'
//             }}
//             onClick={() => document.getElementById('image').click()}
//           >
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Selected"
//                 className="img-fluid rounded mb-2"
//                 style={{ maxWidth: '200px', height: 'auto' }}
//               />
//             ) : (
//               <>
//                 <img
//                   src={assets.upload_area}
//                   alt="Upload Icon"
//                   className="mb-2"
//                   style={{ width: '50px', height: '50px' }}
//                 />
//                 <p className="text-muted">Click to upload an image</p>
//               </>
//             )}
//             <input
//               onChange={(e) => setImage(e.target.files[0])}
//               type="file"
//               id="image"
//               hidden
//               required
//             />
//           </div>
//         </div>

//         {/* Product Name Field */}
//         <div className="col-12">
//           <label className="form-label">Product Name</label>
//           <input
//             onChange={onChangeHandler}
//             value={data.name}
//             type="text"
//             name="name" // Ensure name attribute is present
//             className="form-control"
//             placeholder="Type Here"
//             required
//           />
//         </div>

//         {/* Product Description Field */}
//         <div className="col-12">
//           <label className="form-label">Product Description</label>
//           <textarea
//             onChange={onChangeHandler}
//             value={data.description}
//             name="description" // Ensure name attribute is present
//             className="form-control"
//             rows="4"
//             placeholder="Write content here"
//             required
//           ></textarea>
//         </div>

//         {/* Product Category Field */}
//         <div className="col-md-6">
//           <label className="form-label">Product Category</label>
//           <select
//             onChange={onChangeHandler}
//             name="category" // Ensure name attribute is present
//             className="form-select"
//             required
//           >
//             <option value="Salad">Salad</option>
//             <option value="Rolls">Rolls</option>
//             <option value="Deserts">Deserts</option>
//             <option value="Sandwich">Sandwich</option>
//             <option value="Cake">Cake</option>
//             <option value="Pure Veg">Pure Veg</option>
//             <option value="Pasta">Pasta</option>
//             <option value="Noodles">Noodles</option>
//             <option value="Homemade Item">Homemade Item</option>
//             <option value="Catering Service">Catering Service</option>
//             <option value="Street Food">Street Food</option>
//           </select>
//         </div>

//         {/* Product Price Field */}
//         <div className="col-md-6">
//           <label className="form-label">Product Price</label>
//           <input
//             onChange={onChangeHandler}
//             value={data.price}
//             type="number"
//             name="price" // Ensure name attribute is present
//             className="form-control"
//             placeholder="$20"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="col-12 text-center">
//           <button type="submit" className="btn btn-primary w-100">
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Add;












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