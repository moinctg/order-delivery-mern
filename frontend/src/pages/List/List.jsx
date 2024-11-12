import React, { useEffect, useState, useContext } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../components/context/StoreContext';

const List = () => {
  const { url } = useContext(StoreContext);
  const [list, setList] = useState([]);

  // Fetch all food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching food list');
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error('Server error');
    }
  };

  // Remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error('Error removing food item');
      }
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            {/* Display image from the imageUrl stored in the database */}
            <img src={item.imageUrl} alt={item.name} className="food-image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;








// import React, { useEffect, useState, useContext } from 'react';
// import './List.css';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { StoreContext } from '../../components/context/StoreContext';

// const List = () => {
//   const { url } = useContext(StoreContext);
//   const [list, setList] = useState([]);

//   // Fetch all food items
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${url}/api/food/list`);
//       if (response.data.success) {
//         setList(response.data.data);
//       } else {
//         toast.error('Error fetching food list');
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       toast.error('Server error');
//     }
//   };

//   // Remove a food item
//   const removeFood = async (foodId) => {
//     try {
//       const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList(); // Refresh the list after deletion
//       } else {
//         toast.error('Error removing food item');
//       }
//     } catch (error) {
//       console.error("Error removing food item:", error);
//       toast.error('Server error');
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => {
//           // Construct Cloudinary URL for the image
//           const imageUrl = `https://res.cloudinary.com/dsx5abzif/image/upload/v1632761891/uploads/image/${item.image}`;

//           return (
//             <div key={index} className="list-table-format">
//               {/* Display image from Cloudinary */}
//               <img src={imageUrl} alt={item.name} className="food-image" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <p onClick={() => removeFood(item._id)} className="cursor">
//                 X
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default List;
