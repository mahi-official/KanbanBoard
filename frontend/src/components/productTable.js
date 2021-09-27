import React, { useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { baseURL, headers } from "./../backend";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#627296",
        color: theme.palette.common.white,
        fontWeight: 700,
    },
    body: {
        fontSize: 14,
        border: '1px solid #cccccc',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


export default function ProductTable(props) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [productList, setProductList] = React.useState([]);
    
    const getProducts = () =>{
        if(props.category !== null){
            axios.get(`${baseURL}/products/?category=${props.category}`)
            .then((response) => {
                const result = response.data.results;
                setProductList(result ?? []);
                setIsLoading(false);
            })
            .catch((e) => {
            console.error(e);
            });
        } else {
            axios.get(`${baseURL}/products/`, {headers,})
            .then((response) => {
                const result = response.data.results;
                setProductList(result ?? []);
                setIsLoading(false);
            })
            .catch((e) => {
            console.error(e);
            });
        }
    }
    
    useEffect(() => {
        getProducts();
    }, [props.category, setProductList])


    const handleAddToCart = (item) => {
        const updatedCart = []
        let cart = []
        let match = false
        
        if (typeof window !== undefined){
            if (localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
        }
        cart.forEach(product =>{
            if (product.id === item.id) {
                product.pcs += 1;
                match = true
            } 
            updatedCart.push(product)
        });
        if (!match){
            item["pcs"]=1
            updatedCart.push(item)
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    if (isLoading) {
        return <div>Loading Data</div>
    }
    
    else {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className="product-catalog" aria-label="product0-catalog">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell component="th" scope="row" align="left">Preview</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">Name</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">Description</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">Price&nbsp;(in $)</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left">Status</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="left"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productList.filter(item => item.status !== props.includeOFS).map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        
                                        <img src={row.productImgUrl ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="product" width='100px' height='100px' />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.desc}</StyledTableCell>
                                    <StyledTableCell >$ {row.price}.00</StyledTableCell>
                                    <StyledTableCell>
                                    {row.status ? 
                                    <span style={{ borderRadius: "50%", padding: '10px', backgroundColor: 'limegreen', color: 'white' }}>
                                        Available
                                    </span>
                                    :
                                    <span style={{ borderRadius: "50%", padding: '10px', backgroundColor: 'red', color: 'white' }}>
                                        Not Available
                                    </span>
                                    }
                                        
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant="contained" color="primary"
                                            onClick = {handleAddToCart.bind(this, row)}
                                            disabled={!row.status}
                                            disableElevation style={{ width: '80%' }}>
                                            Add to Cart
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
