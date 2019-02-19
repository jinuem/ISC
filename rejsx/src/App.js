import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)  
    this.state = {
      products :[],
      cart:[],
      activePage:'products',
      cartTotal:0
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000')
      .then((response)=>{ 
//        console.log(response)
        let data = response.json()

        return data;
      })
      .then((data) => {
        this.setState({ products:data })
      });
      
  }

  render() {
  
    return (
      <div>
          {this.state.activePage==='products'?this.productsComponent():this.cartComponent()}
      </div>

    );
  }


  productsComponent=()=>{
    return(
      <div className="App">
        <header className="App-header">
        <h1>Products</h1>
        <div className="cartCount"onClick={()=>this.setState({activePage:'cart'})} >Cart({this.state.cart.length})</div>
        </header>
          {this.state.products.map((product,index)=>{
              return <div  id={index} className="product-list" key={index}>
              <img src={logo}/>
              <div className="product-name">{product.name}</div>
              <div className="product-price">${product.price}</div>
              <button onClick={()=>this.addToCart(index)}>Add To Cart</button>
              </div>
          })}

      </div>
    )
  }
  cartComponent=()=>{
    return(<div className="App">
    <header className="App-header">
    <h1>Cart Page</h1>
    <div className="cartCount">Total:{this.state.cartTotal}</div>
    <div className="cartCount" onClick={()=>this.setState({activePage:'products'})}>Go To Products</div>
    </header>
      {this.state.cart.map((product,index)=>{
          return <div  id={index} className="cart-list" key={index}>
          <div className="product-name">{product.name}</div>
          <div className="product-price">${product.price}</div>
          <button onClick={()=>this.removeFromCart(index)}>Remove from Cart</button>
          </div>
      })}

  </div>)
  }

  addToCart=(index)=> {
    let newCart = this.state.cart;
    newCart.push(this.state.products[index])
    var total = 0;
    newCart.forEach(product => {
      total=  total+parseInt(product.price);
    });
    this.setState({cart:newCart,cartTotal:total})
      
    console.log(this.state.cart)

  }

  removeFromCart=(index)=> {
    let newCart = this.state.cart;
    let productIndex = newCart.indexOf(this.state.cart[index])
    newCart.splice(productIndex, 1);
    var total = 0;
    newCart.forEach(product => {
      total=  total+parseInt(product.price);
    });
    this.setState({cart:newCart,cartTotal:total})
    console.log(this.state.cart)
  }
}

export default App;
