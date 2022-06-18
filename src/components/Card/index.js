import React from 'react';
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({id, onFavourite, title, imageUrl, price, onPlus, favourited=false}) {
    const {isItemAdded} = React.useContext(AppContext);
    const[isFavourite, setIsFavourited] = React.useState(favourited);

    const onClickPlus = () => {
        onPlus({title, imageUrl, price, id});
    }

    const onClickFavourite = () => {
        onFavourite({id, title, imageUrl, price});
        setIsFavourited(!isFavourite);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favourite} onClick={onClickFavourite}>
                <img src={isFavourite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Favourite" />
            </div>
            <img width="133px" height="112px" src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {onPlus &&(
                    <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" />
                )
                    
                }
            </div>
        </div>
    );
}
export default Card;