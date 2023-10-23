import "./App.css";
import React, { useState, useEffect } from "react";

const Product = ({ id, title, price, inStock, addToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [addedItem, setAddedItem] = useState(null);

  const onIncrement = () => {
    setQuantity((prevState) => {
      if (inStock > prevState) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  };

  const onDecrement = () => {
    setQuantity((prevState) => {
      if (quantity > 0) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };

  useEffect(() => {
    if (quantity > 0) {
      let item = {
        id,
        title,
        price,
        quantity,
      };

      setAddedItem(item);
    } else {
      setAddedItem(null);
    }
  }, [quantity]);

  useEffect(() => {
    if (addedItem) {
      addToCart(addedItem);
    }
  }, [addedItem]);

  return (
    <div className="product">
      <button onClick={onDecrement}>-</button>
      <div className="product-content">
        <h1>{title}</h1>
        <p>${price}</p>
        <p>{inStock > quantity ? "In Stock!" : "Not In Stock"}</p>
        <p>
          {quantity} / {inStock}
        </p>
      </div>
      <button onClick={onIncrement}>+</button>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(() => {
      if (cart.length > 0) {
        let filtered = cart.find((x) => x.id === item.id);

        if (filtered) {
          return { cart, quantity: item.quantity };
        } else {
          return [...cart, item];
        }
      } else {
        return [...cart, item];
      }
    });
  };

  useEffect(() => {
    console.log(cart.length);
  }, [cart]);

  return (
    <div className="app">
      <div className="products">
        <Product
          id={1}
          title="Product 1"
          inStock={5}
          price={25}
          addToCart={addToCart}
        />
        <Product
          id={2}
          title="Product 1"
          inStock={5}
          price={25}
          addToCart={addToCart}
        />
        <Product
          id={3}
          title="Product 1"
          inStock={5}
          price={25}
          addToCart={addToCart}
        />
        <Product
          id={4}
          title="Product 1"
          inStock={5}
          price={25}
          addToCart={addToCart}
        />
      </div>
      <div className="cart">
        <h1>My Cart</h1>
      </div>
    </div>
  );
}

export default App;
