import React from 'react'
// import './Orders.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from './../../../../frontend/src/assets/assets';

const OrderSummary = ({url}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [summary, setSummary] = useState(null);


  // const [orders, setOrders] = useState([])

  const fetchAllOrdersSummery = async () =>{
    const response = await axios.get(url+`/api/order/summary?startDate=${startDate}&endDate=${endDate}`);
    if(response.data.success){
      console.log(response.data.data);
      setSummary(response.data.data);
      
    }else{
      toast.error("Error")
    }
  }

  

  useEffect(()=>{
    fetchAllOrdersSummery()
  },[])
  return (
    <div className='order add'>
       
            <h2 className='text-center'>Order Summary</h2>

            <div>
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                 <br/>
                <button onClick={fetchAllOrdersSummery}>Get Summary</button>
            </div>

            {summary && (
                <div>
                    <h3>Summary for Selected Dates</h3>
                    <ul>
                        {Object.keys(summary).map(date => (
                            <li key={date}>
                                <strong>{date}</strong>: {summary[date].totalOrders} orders, 
                                Total Revenue: ${summary[date].totalRevenue.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
  )
}

export default OrderSummary