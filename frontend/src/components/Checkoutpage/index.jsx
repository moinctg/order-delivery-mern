// import axios from 'axios';
// import { useEffect, useState, useContext } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import { VscLoading } from 'react-icons/vsc';
// import { MultiStepForm, Step } from 'react-multi-form';
// import styles from '../../styles/CheckoutStyles.module.scss';
// import CartItems from './CartItem';
// import CustomerInfo from './CustomerInfo';
// import PaymentInfo from './PaymentInfo';
// import ShippingInfo from './ShippingInfo';
// import { StoreContext } from '../../components/context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//     const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//     const navigate = useNavigate();

//     const [active, setActive] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [name, setName] = useState({
//         firstName: '',
//         lastName: '',
//     });

//     const [formData, setFormData] = useState({
//         cartItems: cartItems, // Use context cartItems here
//         totalAmount: getTotalCartAmount(),
//         deliveryMethod: 'Courier',
//         numItem: cartItems.length,
//         customerInfo: {
//             cusName: '',
//             cusEmail: '',
//             cusAdd1: '',
//             cusAdd2: '',
//             cusCity: '',
//             cusState: '',
//             cusPostcode: '',
//             cusCountry: 'Bangladesh',
//             cusPhone: '',
//             cusFax: '',
//         },
//         shippingInfo: {
//             name: '',
//             shippingAdd1: '',
//             shippingAdd2: '',
//             shippingCity: '',
//             shippingState: '',
//             shippingPostcode: '',
//             shippingCountry: 'Bangladesh',
//         },
//     });

//     // Function to handle name changes
//     const onNameChange = (event) => {
//         setName({
//             ...name,
//             [event.target.name]: event.target.value.trim(),
//         });
//     };

//     // Handle input changes for customer and shipping info
//     const handleInputChangeCustomer = (event) => {
//         setFormData({
//             ...formData,
//             customerInfo: {
//                 ...formData.customerInfo,
//                 [event.target.name]: event.target.value.trim(),
//             },
//         });
//     };

//     const handleInputChangeShopping = (event) => {
//         setFormData({
//             ...formData,
//             shippingInfo: {
//                 ...formData.shippingInfo,
//                 [event.target.name]: event.target.value.trim(),
//             },
//         });
//     };

//     // Handle checkout
//     const onHandleCheckout = async () => {
//         setLoading(true);
//         const orderItems = food_list.filter(item => cartItems[item._id] > 0)
//                                     .map(item => ({ ...item, quantity: cartItems[item._id] }));

//         const orderData = {
//             items: orderItems,
//             amount: getTotalCartAmount() + 2, // Update as needed
//         };

//         try {
//             const response = await axios.post(`${url}/api/payment/checkout`, formData, { headers: { token } });
//             if (response.data?.session_url) {
//                 window.location.replace(response.data.session_url);
//             } else {
//                 alert('Checkout failed');
//             }
//         } catch (error) {
//             console.error("Checkout error: ", error);
//             setError("Checkout failed, please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle conditional navigation
//     useEffect(() => {
//         if (!token) {
//             navigate('/cart');
//         } else if (getTotalCartAmount() === 0) {
//             navigate('/cart');
//         }
//     }, [token, getTotalCartAmount, navigate]);

//     useEffect(() => {
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             customerInfo: {
//                 ...prevFormData.customerInfo,
//                 cusName: `${name.firstName} ${name.lastName}`,
//             },
//         }));
//     }, [name]);

//     useEffect(() => {
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             shippingInfo: {
//                 ...prevFormData.shippingInfo,
//                 name: formData.customerInfo.cusName,
//                 shippingAdd1: formData.customerInfo.cusAdd1,
//                 shippingAdd2: formData.customerInfo.cusAdd2,
//                 shippingCity: formData.customerInfo.cusCity,
//                 shippingState: formData.customerInfo.cusState,
//                 shippingPostcode: formData.customerInfo.cusPostcode,
//                 shippingCountry: formData.customerInfo.cusCountry,
//             },
//         }));
//     }, [formData.customerInfo]);

//     return (
//         <div>
//             <main className={styles.checkout}>
//                 {/* <aside className={styles.checkout__cartItems} style={{ width: '300px' }}>
//                     <h3 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', fontWeight: 'bold' }}>
//                         Order Summary
//                     </h3>
//                     <CartItems
//                         checkoutBtn={false}
//                         customStyles={{
//                             boxShadow: 'none',
//                             backgroundImage: 'none',
//                             background: '#f5f5f5',
//                         }}
//                         divStyle={{ background: '#e2e2e2' }}
//                     />
//                 </aside> */}

//                 <aside className={styles.checkout__checkoutForm}>
//                     <MultiStepForm activeStep={active}>
//                         <Step label="Customer">
//                             <CustomerInfo
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 name={name}
//                                 setName={setName}
//                                 onNameChange={onNameChange}
//                                 handleInputChangeCustomer={handleInputChangeCustomer}
//                                 setError={setError}
//                             />
//                         </Step>
//                         <Step label="Shipping">
//                             <ShippingInfo
//                                 formData={formData}
//                                 setFormData={setFormData}
//                                 handleInputChangeShopping={handleInputChangeShopping}
//                                 setError={setError}
//                             />
//                         </Step>
//                         <Step label="Payment">
//                             <PaymentInfo
//                                 formData={formData}
//                                 handleInputChangeCustomer={handleInputChangeCustomer}
//                                 setError={setError}
//                             />
//                         </Step>
//                     </MultiStepForm>

//                     {error && <div className={styles.error}>{error}</div>}

//                     {active !== 1 && (
//                         <button
//                             type="button"
//                             className={styles.textBtn}
//                             onClick={() => setActive(active - 1)}
//                         >
//                             <span>
//                                 <IoIosArrowBack /> &nbsp; Previous
//                             </span>
//                         </button>
//                     )}
//                     {active !== 3 ? (
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 if (active === 1 && formData.customerInfo.cusEmail) {
//                                     setActive(active + 1);
//                                 } else if (active === 2 && formData.shippingInfo.shippingAdd1) {
//                                     setActive(active + 1);
//                                 } else {
//                                     setError('Required fields must be provided');
//                                 }
//                             }}
//                             className={styles.textBtn}
//                             style={{ float: 'right' }}
//                         >
//                             <span>
//                                 Next &nbsp; <IoIosArrowForward />
//                             </span>
//                         </button>
//                     ) : (
//                         <button
//                             type="button"
//                             className={styles.checkout__checkoutForm__btn}
//                             style={{ marginTop: '2rem' }}
//                             onClick={onHandleCheckout}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <>
//                                     <VscLoading className={styles.checkout__loading__icon} />
//                                     <span>Checking out...</span>
//                                 </>
//                             ) : (
//                                 <span>Checkout</span>
//                             )}
//                         </button>
//                     )}
//                 </aside>
//             </main>
//         </div>
//     );
// };

// export default CheckoutPage;



import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { VscLoading } from 'react-icons/vsc';
import { MultiStepForm, Step } from 'react-multi-form';
import styles from '../../styles/CheckoutStyles.module.scss';
import CartItems from './CartItem';
import CustomerInfo from './CustomerInfo';
import PaymentInfo from './PaymentInfo';
import ShippingInfo from './ShippingInfo';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState({
        firstName: '',
        lastName: '',
    });

    const [formData, setFormData] = useState({
        cartItems: cartItems, // Use context cartItems here
        totalAmount: getTotalCartAmount(),
        deliveryMethod: 'Courier',
        numItem: cartItems.length,
        customerInfo: {
            cusName: '',
            cusEmail: '',
            cusAdd1: '',
            cusAdd2: '',
            cusCity: '',
            cusState: '',
            cusPostcode: '',
            cusCountry: 'Bangladesh',
            cusPhone: '',
            cusFax: '',
        },
        shippingInfo: {
            name: '',
            shippingAdd1: '',
            shippingAdd2: '',
            shippingCity: '',
            shippingState: '',
            shippingPostcode: '',
            shippingCountry: 'Bangladesh',
        },
    });

    // Function to handle name changes
    const onNameChange = (event) => {
        setName({
            ...name,
            [event.target.name]: event.target.value.trim(),
        });
    };

    // Handle input changes for customer and shipping info
    const handleInputChangeCustomer = (event) => {
        setFormData({
            ...formData,
            customerInfo: {
                ...formData.customerInfo,
                [event.target.name]: event.target.value.trim(),
            },
        });
    };

    const handleInputChangeShopping = (event) => {
        setFormData({
            ...formData,
            shippingInfo: {
                ...formData.shippingInfo,
                [event.target.name]: event.target.value.trim(),
            },
        });
    };

    // Handle checkout
    const onHandleCheckout = async () => {
        setLoading(true);
        const orderItems = food_list.filter(item => cartItems[item._id] > 0)
                                    .map(item => ({ ...item, quantity: cartItems[item._id] }));

        const orderData = {
            items: orderItems,
            amount: getTotalCartAmount() + 2, // Update as needed
        };

        try {
            const response = await axios.post(`${url}/api/payment/checkout`, formData, { headers: { token } });
            if (response.data?.session_url) {
                window.location.replace(response.data.session_url);
            } else {
                alert('Checkout failed');
            }
        } catch (error) {
            console.error("Checkout error: ", error);
            setError("Checkout failed, please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle conditional navigation
    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            customerInfo: {
                ...prevFormData.customerInfo,
                cusName: `${name.firstName} ${name.lastName}`,
            },
        }));
    }, [name]);

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            shippingInfo: {
                ...prevFormData.shippingInfo,
                name: formData.customerInfo.cusName,
                shippingAdd1: formData.customerInfo.cusAdd1,
                shippingAdd2: formData.customerInfo.cusAdd2,
                shippingCity: formData.customerInfo.cusCity,
                shippingState: formData.customerInfo.cusState,
                shippingPostcode: formData.customerInfo.cusPostcode,
                shippingCountry: formData.customerInfo.cusCountry,
            },
        }));
    }, [formData.customerInfo]);

    return (
        <div>
            <main className={styles.checkout}>
                <aside className={styles.checkout__cartItems} style={{ width: '300px' }}>
                    <h3 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', fontWeight: 'bold' }}>
                        Order Summary
                    </h3>
                    <CartItems
                        checkoutBtn={false}
                        customStyles={{
                            boxShadow: 'none',
                            backgroundImage: 'none',
                            background: '#f5f5f5',
                        }}
                        divStyle={{ background: '#e2e2e2' }}
                    />
                </aside>

                <aside className={styles.checkout__checkoutForm}>
                    <MultiStepForm activeStep={active}>
                        <Step label="Customer">
                            <CustomerInfo
                                formData={formData}
                                setFormData={setFormData}
                                name={name}
                                setName={setName}
                                onNameChange={onNameChange}
                                handleInputChangeCustomer={handleInputChangeCustomer}
                                setError={setError}
                            />
                        </Step>
                        <Step label="Shipping">
                            <ShippingInfo
                                formData={formData}
                                setFormData={setFormData}
                                handleInputChangeShopping={handleInputChangeShopping}
                                setError={setError}
                            />
                        </Step>
                        <Step label="Payment">
                            <PaymentInfo
                                formData={formData}
                                handleInputChangeCustomer={handleInputChangeCustomer}
                                setError={setError}
                            />
                        </Step>
                    </MultiStepForm>

                    {error && <div className={styles.error}>{error}</div>}

                    {active !== 1 && (
                        <button
                            type="button"
                            className={styles.textBtn}
                            onClick={() => setActive(active - 1)}
                        >
                            <span>
                                <IoIosArrowBack /> &nbsp; Previous
                            </span>
                        </button>
                    )}
                    {active !== 3 ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (active === 1 && formData.customerInfo.cusEmail) {
                                    setActive(active + 1);
                                } else if (active === 2 && formData.shippingInfo.shippingAdd1) {
                                    setActive(active + 1);
                                } else {
                                    setError('Required fields must be provided');
                                }
                            }}
                            className={styles.textBtn}
                            style={{ float: 'right' }}
                        >
                            <span>
                                Next &nbsp; <IoIosArrowForward />
                            </span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={styles.checkout__checkoutForm__btn}
                            style={{ marginTop: '2rem' }}
                            onClick={onHandleCheckout}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <VscLoading className={styles.checkout__loading__icon} />
                                    <span>Checking out...</span>
                                </>
                            ) : (
                                <span>Checkout</span>
                            )}
                        </button>
                    )}
                </aside>
            </main>
        </div>
    );
};

export default CheckoutPage;
