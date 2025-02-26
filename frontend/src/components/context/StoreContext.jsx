
import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

// Create the main StoreContext
export const StoreContext = createContext(null);

// Create the ProductContext
export const ProductContext = createContext();

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");  // State to store the token
    const [user, setUser] = useState(null);  // User state

    const url = "http://localhost:8000";  // Backend URL

    // Check token validity (you might need an endpoint or logic for this)
    const validateToken = async (authToken) => {
        try {
            const response = await axios.get(`${url}/api/user/me`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.status === 200) {
                return true; // Token is valid
            }
        } catch (error) {
            console.error("Token validation failed:", error);
            return false;  // Token is invalid or expired
        }
        return false;
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };

    const loadCartData = async (authToken) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: authToken } });
        setCartItems(response.data.cartData);
    };

    const fetchUserData = async (authToken) => {
        try {
            const response = await axios.get(`${url}/api/user/me`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setUser(response.data.user);  // Set user data
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            // Fetch food list
            await fetchFoodList();

            // Check if a token exists in localStorage
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                const isValid = await validateToken(storedToken);
                if (isValid) {
                    await fetchUserData(storedToken); // Fetch user info if token is valid
                    await loadCartData(storedToken);
                } else {
                    // Handle invalid token (logout or prompt user to re-login)
                    setToken("");  // Clear token if invalid
                    localStorage.removeItem("token"); // Remove invalid token
                }
            }
        }

        loadData();
    }, []);

    const contextValue = {
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        food_list,
        cartItems,
        setCartItems,
        url,
        token,
        setToken,
        user,
        setUser
    };

    return (
        <StoreContext.Provider value={contextValue}>
            <ProductContext.Provider value={{ food_list, setFoodList }}>
                {props.children}
            </ProductContext.Provider>
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;







// import React, { createContext, useEffect, useState } from "react";
// import axios from 'axios'

// export const StoreContext = createContext(null)
// // // Create the ProductContext
// export const ProductContext = createContext();

// const StoreContextProvider = (props) => {

//     const [cartItems, setCartItems] = useState({});
//     // const url = "https://order-delivery-mern-backend-1.onrender.com";
//            const url = "http://localhost:8000"
//     const [token,setToken] = useState("");

//     const [food_list, setFoodList] = useState([]);


//     // products context 

    

//     const addToCart = async (itemId) => {
//         if (!cartItems[itemId]) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
//         } else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
//         }
//         if(token){
//             await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
//         }
//     }

//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         if(token){
//             await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
//         }
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = food_list.find((product) => product._id === item);
//                 totalAmount += itemInfo.price * cartItems[item];
//             }

//         }

//         return totalAmount;
//     }

//     const fetchFoodList = async () =>{
//         const response = await axios.get(url+"/api/food/list");
//         setFoodList(response.data.data)
//     }

//     const loadCartData = async (token) =>{
//         const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
//         setCartItems(response.data.cartData);
//     }

//     useEffect(()=>{
        
//         async function loadData(){
//             await fetchFoodList();
//             if(localStorage.getItem("token")){
//                 setToken(localStorage.getItem("token"));
//                 await loadCartData(localStorage.getItem("token"))
//             }
//         }
//         loadData();
//     },[])

//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken
//     }

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
// //         <ProductContext.Provider value={{ foodList, setFoodList }}>
// // //       <StoreContext.Provider value={contextValue}>
// // //         {props.children}
// // //       </StoreContext.Provider>
// // //     </ProductContext.Provider>
//     )
// }

// export default StoreContextProvider;



















//  editing some issue 

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios';

// // Create the main StoreContext
// export const StoreContext = createContext(null);

// // Create the UserContext
// export const UserContext = createContext();

// // Custom hook to use UserContext
// export const useUser = () => useContext(UserContext);

// const StoreContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState({});
//     const [food_list, setFoodList] = useState([]);
//     const [token, setToken] = useState("");
//     const [user, setUser] = useState(null); // User state for UserContext

//     // const url = "https://order-delivery-mern-backend-1.onrender.com";
//     const url= "https://order-delivery-mern-backend-1.onrender.com"
//     // const url = "http://localhost:8000"

//     const addToCart = async (itemId) => {
//         if (!cartItems[itemId]) {
//             setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//         } else {
//             setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         }
//         if (token) {
//             await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         if (token) {
//             await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
//         }
//     };

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = food_list.find((product) => product._id === item);
//                 if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
//             }
//         }
//         return totalAmount;
//     };

//     const fetchFoodList = async () => {
//         const response = await axios.get(url + "/api/food/list");
//         setFoodList(response.data.data);
//     };

//     const loadCartData = async (token) => {
//         const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
//         setCartItems(response.data.cartData);
//     };

//     useEffect(() => {
//         async function loadData() {
//             await fetchFoodList();
//             const storedToken = localStorage.getItem("token");
//             if (storedToken) {
//                 setToken(storedToken);
//                 await loadCartData(storedToken);
//             }
//         }
//         loadData();
//     }, []);

//     // StoreContext and UserContext combined values
//     const contextValue = {
//         food_list,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken,
//         user,
//         setUser, // User context methods
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             <UserContext.Provider value={{ user, setUser }}>
//                 {props.children}
//             </UserContext.Provider>
//         </StoreContext.Provider>
//     );
// };

// export default StoreContextProvider;






// import { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios';

// // Create the main StoreContext
// export const StoreContext = createContext(null);

// // Create the UserContext
// export const UserContext = createContext();

// // Custom hook to use UserContext
// export const useUser = () => useContext(UserContext);

// const StoreContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState({});
//     const [food_list, setFoodList] = useState([]);
//     const [token, setToken] = useState("");
//     const [user, setUser] = useState(null); // User state for UserContext

//     // const url = "https://order-delivery-mern-backend-1.onrender.com";
//          const url = " http://localhost:8000";
   


//               const addToCart = async (itemId) => {
//                 if (!cartItems[itemId]) {
//                     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//                 } else {
//                     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//                 }
//                 if (token) {
//                     await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
//                 }
//             };
        
//             const removeFromCart = async (itemId) => {
//                 setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//                 if (token) {
//                     await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
//                 }
//             };
        
//             const getTotalCartAmount = () => {
//                 let totalAmount = 0;
//                 for (const item in cartItems) {
//                     if (cartItems[item] > 0) {
//                         let itemInfo = food_list.find((product) => product._id === item);
//                         if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
//                     }
//                 }
//                 return totalAmount;
//             };
        
//             const fetchFoodList = async () => {
//                 const response = await axios.get(url + "/api/food/list");
//                 setFoodList(response.data.data);
//             };
        
//             // const loadCartData = async (token) => {
//             //     const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
//             //     setCartItems(response.data.cartData);
//             // };

//     // Fetch user information
//     const fetchUserData = async (authToken) => {
//         try {
//             const response = await axios.get(`${url}/api/user/me`, {
//                 headers: { Authorization: `Bearer ${authToken}` },
//             });
//             setUser(response.data.user); // Set the user data from the response
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//         }
//     };

//     const loadCartData = async (authToken) => {
//         try {
//             const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${authToken}` } });
//             setCartItems(response.data.cartData);
//         } catch (error) {
//             console.error("Error loading cart data:", error);
//         }
//     };

//     useEffect(() => {
//         async function loadData() {
//             await fetchFoodList();

//             // Check if a token exists in localStorage
//             const storedToken = localStorage.getItem("token");
//             if (storedToken) {
//                 setToken(storedToken);
//                 await fetchUserData(storedToken); // Fetch user info
//                 await loadCartData(storedToken);
//             }
//         }
//         loadData();
//     }, []);

//     const contextValue = {
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         food_list,
//         cartItems,
//         setCartItems,
//         url,
//         token,
//         setToken,
//         user,
//         setUser,
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             <UserContext.Provider value={{ user, setUser }}>
//                 {props.children}
//             </UserContext.Provider>
//         </StoreContext.Provider>
//     );
// };

// export default StoreContextProvider;
