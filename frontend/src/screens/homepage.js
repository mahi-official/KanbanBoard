import React, { Component } from "react"
import SearchAppBar from "../components/searchAppBar";
import ProductTable from "../components/productTable"
import { withStyles } from '@material-ui/core/styles';
import Paginator from "../components/paginator";
import DefaultFooter from "../components/footer";
import CategoryDropdown from "../components/categoryDropdown";

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

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryID: null,
        };
    }

    handleDropdownCallback = (catID) =>{
        this.setState({categoryID: catID});
    }
    handleAddButtonCallback = () =>{
        
    }

    render() {
        const { classes } = this.props;
        return (
            <main className="content">
                <SearchAppBar />
                <div className={classes.container}>
                    <div className={classes.mBottomSpace} style={{ float: 'right' }}>
                        <div align='right' className={classes.sBottomSpace + " " + classes.sTopSpace}>Search by Category</div>
                        <div><CategoryDropdown onChange={this.handleDropdownCallback}/> </div>
                    </div>
                    <ProductTable category={this.state.categoryID} includeOFS={null} onAdd={this.handleAddButtonCallback}/>
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

export default withStyles(useStyles, { withTheme: true })(Home);