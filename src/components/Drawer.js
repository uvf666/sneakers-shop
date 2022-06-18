import React from "react";
import Info from "./Info";
import axios from 'axios';
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems, totalPrice } = useCart()
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    

    const onClickOrder = async () => {
        try {
            const { data } = await axios.post('https://62ac44ecbd0e5d29af1e9587.mockapi.io/orders', { items: cartItems });

            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62ac44ecbd0e5d29af1e9587.mockapi.io/cart/' + item.id);
                await delay(1000);
            }


        } catch (error) {
            
        }
    }

    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина
                    <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
                </h2>

                {
                    items.length > 0 ?
                        (<div className="d-flex flex-column flex">
                            <div className="items mb-40">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice * 0.05} руб.</b>
                                    </li>
                                </ul>
                                <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
                            </div>
                        </div>
                        ) :
                        (
                            <Info
                                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                                image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"} />
                        )
                }


            </div>
        </div>
    );
}
export default Drawer;