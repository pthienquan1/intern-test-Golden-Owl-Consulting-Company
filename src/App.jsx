import { useState, useEffect } from "react";
import trashIcon from "./assets/trash.png";
import nike from "./assets/nike.png";
import "./App.css";
import shoeData from "./shoe.json";
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (shoe) => {
    const existingItem = cartItems.find((item) => item.id === shoe.id);
    if (existingItem && existingItem.quantity === 0) {
      removeItem(shoe);
    } else if (!selectedItems.includes(shoe.id)) {
      setCartItems([...cartItems, { ...shoe, quantity: 1 }]);
      setSelectedItems([...selectedItems, shoe.id]);
    }
  };

  const decreaseQuantity = (shoe) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === shoe.id) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        if (updatedItem.quantity === 0) {
          removeItem(item);
        }
        return updatedItem;
      }
      return item;
    });
    setCartItems(updatedCartItems.filter((item) => item.quantity !== 0));
  };

  const increaseQuantity = (shoe) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === shoe.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeItem = (shoe) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== shoe.id);
    setCartItems(updatedCartItems);
    setSelectedItems(selectedItems.filter((id) => id !== shoe.id));
  };

  return (
    <div className="container">
      <div className="list-items">
        <div className="logo">
          <img src={nike} alt="Nike logo" />
        </div>
        <div className="title">Our Products</div>
        <div className="main-product">
          {shoeData.shoes.map((shoe) => (
            <div key={shoe.id} className="product-item">
              <img src={shoe.image} alt={shoe.name} />
              <h3>{shoe.name}</h3>
              <p>{shoe.description}</p>
              <div className="product-price-and-addToCart">
                <span>${shoe.price}</span>
                <button
                  onClick={() => addToCart(shoe)}
                  disabled={
                    selectedItems.includes(shoe.id) && shoe.quantity !== 0
                  }
                >
                  {selectedItems.includes(shoe.id) && shoe.quantity !== 0
                    ? "This is added"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="list-items">
        <div className="logo">
          <img src={nike} alt="Nike logo" />
        </div>
        <div className="title-cart">
          <div className="title">Your cart</div>
          <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{color:"#F24C3D",fontWeight:"700",fontSize:"20px"}}> ! No items in your cart.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="describe">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                    <img
                      src={trashIcon}
                      alt="Trash Icon"
                      className="trash-icon"
                      onClick={() => removeItem(item)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
