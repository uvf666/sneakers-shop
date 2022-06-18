import React from 'react';
import Card from '../components/Card';



function Home({
    items,
    cartItems,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavourite,
    onAddToCart
}) {
   
    return (
        <div className="content p-40">
            <div className="d-flex align-center mb-40 justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}" ` : 'Все кроссовки'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img className="clear cu-p" src="/img/btn-remove.svg" onClick={() => setSearchValue('')} alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">

                {items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                    <Card
                        key={index}
                        onPlus={(obj) => onAddToCart(obj)}
                        onFavourite={onAddToFavourite}
                     
                        {...item} />
                ))}
            </div>
        </div>
    );
}

export default Home;