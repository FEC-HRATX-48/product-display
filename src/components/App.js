import React, { Component } from "react";
import ProductMainView from './ProductMainView.js';

let axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doneFetching: false,
      name: "Rugged Wrist Strap",
      productInfo: null
    };
    this.getData = this.getData.bind(this);
    
    // this.getDataByName = this.getDataByName.bind(this);
  }

  componentDidMount(){
    this.getData();
    console.log('hi from didMount');
    document.addEventListener('submit', () => {
      this.getSearchValue();
    })
    // this.getDataByName()
  }
  getSearchValue() {
    let search = document.getElementById('wilsoninputtag');
    if(search){
      let currentProduct = search.value;
      console.log(currentProduct);
      this.setState({
        name: currentProduct
      }, () => {
        this.getData();
      })
    }
  }
  //fetching product details function based off state saved sku
  getData() {
    axios.get('http://eb-cli-test-3-dev.us-east-2.elasticbeanstalk.com/view', {
      params: {
        name: this.state.name
      }
    })
    //sets product details object in the state
    .then((productData) => {
      console.log('hi from data fetch', productData);
      this.setState({
        productInfo: productData.data[0],
        doneFetching: true
      });
    })
    .catch(err => {
      console.log('error fetching data', err);
    })
  }
    //fetching product details function based off state saved name

  // getDataByName() {
  //   axios.get('http://eb-cli-test-3-dev.us-east-2.elasticbeanstalk.com/view/name', {
  //     params: {
  //       name: this.state.name
  //     }
  //   })
  //   //sets product details object in the state
  //   .then((productData) => {
  //     this.setState({
  //       productInfo: productData.data[0],
  //       doneFetching: true
  //     });
  //   })
  //   .catch(err => {
  //     console.log('error fetching data', err);
  //   })
  // }
  render() {
    return (
      <div>
      {/* if not able to fetch product details it will display a loading type message */}
        {this.state.doneFetching ? <ProductMainView details={this.state.productInfo}/> : 'Fetching product'}
      </div>
    );
  }
}

// window.addEventListener('click', (event) => {
//   if (event.target.getAttribute('data-id') && event.target.getAttribute('data-id') !== this.state.productId && !isNaN(event.target.getAttribute('data-id'))) {
//     this.setState({productId: event.target.getAttribute('data-id') }, () => {
//       this.getRequest();
//     });
//   }
// });