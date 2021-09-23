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


const useStyles = makeStyles({
    table: {
        width: '100%',
        padding: 0,
        margin: 0,
        display: 'table',

    },
});

export default function ProductTable(props) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(true);
    const [state, setState] = React.useState({
        productList: []
    });
    
    const getProducts = () =>{
        if(props.category !== null){
            axios.get(`${baseURL}/products/?category=${props.category}`)
            .then((response) => {
                const result = response.data.results;
                setState({ productList: result ?? [] });
                setIsLoading(false);
            })
            .catch((e) => {
            console.error(e);
            });
        } else {
            axios.get(`${baseURL}/products/`, {headers,})
            .then((response) => {
                const result = response.data.results;
                setState({ productList: result ?? [] });
                setIsLoading(false);
            })
            .catch((e) => {
            console.error(e);
            });
        }
    }
    
    useEffect(() => {
        getProducts();
    }, [props.category, setState])

    const handleAddToCart = (event) => {
        console.log(event.target, "cheesy")
        
    }

    if (isLoading) {
        return <div>Loading Data</div>
    }
    else {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="product0-catalog">
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
                            {state.productList.filter(item => item.status !== props.includeOFS).map((row) => (
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
                                            value = {row.id}
                                            onClick = {handleAddToCart.bind(this)}
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
