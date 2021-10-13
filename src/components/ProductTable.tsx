import { Button, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'
import { Product } from '../services/ProductService';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#627296",
        color: theme.palette.common.white,
        fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
        border: '1px solid #cccccc',
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  }));


export const ProductTable = (props: { products: Product[]}) => {

    if (props.products.length === 0) return (
        <div className="container">
            <h2>No Products Found</h2>
        </div>
    )

    const ProductRow = (item: Product, index: number) => {
        return (
            <StyledTableRow key={index} className={index%2 === 0?'odd':'even'}>
                <StyledTableCell>
                    <img src={item.productImgUrl ?? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="product" width='100px' height='100px' />
                </StyledTableCell>
                <StyledTableCell>
                    {item.name}
                </StyledTableCell>
                <StyledTableCell>{item.desc}</StyledTableCell>
                <StyledTableCell >$ {item.price}.00</StyledTableCell>
                <StyledTableCell>
                    {item.status ?
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
                        // onClick={handleAddToCart.bind(this, row)}
                        disabled={!item.status}
                        disableElevation style={{ width: '80%' }}>
                        Add to Cart
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
        )
    }

    const tableValues = props.products.map((product: Product, index: number) => ProductRow(product, index))

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
                        {tableValues}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}