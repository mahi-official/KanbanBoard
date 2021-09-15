import React, { Component } from "react"
import SearchAppBar from "./components/searchAppBar";
import ProductTable from "./components/productTable"
import { withStyles } from '@material-ui/core/styles';
import Paginator from "./components/paginator";
import DefaultFooter from "./components/footer";
import CategoryDropdown from "./components/categoryDropdown";


const useStyles = ({
    container: {
        width: '80%',
        margin: 'auto',
    },
    mBottomSpace: {
        marginBottom: '20px'
    },
    sBottomSpace: {
        marginBottom: '10px'
    },
    sTopSpace: {
        marginTop: '10px',
    },
    defaultTheme: {
        color: '#FFF',
        backgroundColor: '#14A098',
    },
    centerItems: {
        display: 'flex',
        justifyContent: 'center'
    },

});

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
                productList: apiResult.results ?? []
            });
        } catch (e) {
            console.log(e);
        }
    }
    renderItems = () => {
        const { prod } = this.state;
        console.log(typeof (this.state.productList), "chocolate", this.state.productList)
        const newItems = this.state.productList.filter(
            item => item.status === prod
        );
        return newItems.map(item => (
            <li
                key={item.productID}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`product-title mr-2 ${this.state.activeItem.status ? "actice-product" : "inactive-product"
                        }`}
                    title={item.desc}
                >
                    {item.name}
                </span>
            </li>
        ));
    };


    render() {
        const { classes } = this.props;
        return (
            <main className="content">
                <SearchAppBar />
                <div className={classes.container}>
                    <div className={classes.mBottomSpace} style={{ float: 'right' }}>
                        <div align='right' className={classes.sBottomSpace + " " + classes.sTopSpace}>Search by Category</div>
                        <div><CategoryDropdown /> </div>
                    </div>
                    <ProductTable />
                    <div className={classes.sTopSpace + " " + classes.sBottomSpace + " " + classes.centerItems}>
                        <Paginator />
                    </div>
                </div>
                <div>
                    <DefaultFooter />
                </div>
            </main>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(App);