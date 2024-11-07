import PaymentButton from './components/PaymentButton';
const Payments = () => {
    const customer = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        address: '123 Main St',
        phone: '0123456789',
    };

    return (
        <div>
            <h1>Product Checkout</h1>
            <p>Total Amount: 1000 BDT</p>
            <PaymentButton amount="1000" customer={customer} />
        </div>
    );
};

export default Payments;