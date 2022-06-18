import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Favourites from './pages/Favourites';
import AppContext from './context';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  React.useEffect(() => {
    async function fetchData(){
      const cartResponse = await axios.get('https://62ac44ecbd0e5d29af1e9587.mockapi.io/cart');
      const favouritesResponse = await axios.get('https://62ac44ecbd0e5d29af1e9587.mockapi.io/favourites'); 
      const itemsResponse = await axios.get('https://62ac44ecbd0e5d29af1e9587.mockapi.io/items');
      setCartItems(cartResponse.data);
      setFavourites(favouritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);
  const onAddToCart = (obj) => {
    try {
      if(cartItems.find((item)=>Number(item.id)===Number(obj.id))){
        axios.delete(`https://62ac44ecbd0e5d29af1e9587.mockapi.io/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item=>Number(item.id) !== Number(obj.id)));
      }else{
        axios.post('https://62ac44ecbd0e5d29af1e9587.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
      }
      
    } catch (error) {
      
    }
  };
  const onAddToFavourite = async(obj) => {
    if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      axios.delete(`https://62ac44ecbd0e5d29af1e9587.mockapi.io/favourites/${obj.id}`);
      setFavourites((prev) => prev.filter((item)=>Number(item.id) !== Number(obj.id)));
    } else {
      const {data} = await axios.post('https://62ac44ecbd0e5d29af1e9587.mockapi.io/favourites', obj);
      setFavourites((prev) => [...prev, data]);
    }

  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) =>{
    return cartItems.some((obj)=>Number(obj.id)===Number(id));
  }
  const onRemoveItem = (id) => {
    axios.delete(`https://62ac44ecbd0e5d29af1e9587.mockapi.io/cart/${id}`);
    setCartItems(prev => prev.filter(item => item.id !== id));
  }
  return (
    <AppContext.Provider value={{items, cartItems, favourites, isItemAdded, onAddToFavourite, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>  <Route path="/" exact element={<Home
        cartItems={cartItems}
        items={items}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onChangeSearchInput={onChangeSearchInput}
        onAddToFavourite={onAddToFavourite}
        onAddToCart={onAddToCart}

      />} />

      </Routes>

      <Routes>
        <Route path="/favourites" exact element={
          <Favourites />
        } />

      </Routes>

      <Routes>
        <Route path="/orders" exact element={
          <Orders />
        } />

      </Routes>

    </div>
    </AppContext.Provider>
  );
}

export default App;
