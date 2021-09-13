import React, { Component } from "react"
import SearchAppBar from "./components/searchAppBar"; 
import CustomizedTables from "./components/table"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: true,
      activeItem: {
        productImgUrl: "",
        name: "",
        desc: "",
        price: 0,
        status: true,
      },
      productList: []
      };
  }

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/products/');
        const apiResult = await res.json();
        this.setState({
          productList: apiResult.results?? []
        });
      } catch (e) {
        console.log(e);
      }
    }
    renderItems = () => {
      const { prod } = this.state;
      console.log(typeof(this.state.productList), "chocolate", this.state.productList)
      const newItems = this.state.productList.filter(
        item => item.status === prod
      );
      return newItems.map(item => (
        <li 
          key={item.productID}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span 
            className={`product-title mr-2 ${
              this.state.status ? "actice-product" : "inactive-product"
            }`}
            title={item.desc}
            >
              {item.name}
            </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <div className="row">
          <SearchAppBar />
          <CustomizedTables />
        </div>
      </main>
      )
    }
  }
  
export default App;