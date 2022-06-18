import React from "react";
import Card from "../components/Card";
import axios from "axios"
import AppContext from "../context";



function Orders() {
    const {onAddToFavourite} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('https://62ac44ecbd0e5d29af1e9587.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        })();
    }, [])
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {orders.map((item, index) => (
                    <Card
                        key={index}
                        onFavourite={onAddToFavourite}

                        {...item} />
                ))}
            </div>
        </div>
    );
}

export default Orders;