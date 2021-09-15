import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

function createData(id, image, name, desc, price, status) {
    return { id, image, name, desc, price, status };
}

const rows = [
    createData(1, 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg', 'Frozen yoghurt', 'Any desc', '10', true),
    createData(2, 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg', 'Ice cream sandwich', 'Any desc', '20', true),
    createData(3, 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg', 'Eclair', 'Any desc', '30', true),
    createData(4, 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg', 'Cupcake', 'Any desc', '40', false),
    createData(5, 'https://im.rediff.com/money/2014/aug/27logo-answers8.jpg', 'Gingerbread', 'Any desc', '50', true),
];

const useStyles = makeStyles({
    table: {
        width: '100%',
        padding: 0,
        margin: 0,
        display: 'table',

    },
});

export default function ProductTable() {
    const classes = useStyles();

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
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>
                                    <img src={row.image} alt="product" width='100px' height='100px' />
                                </StyledTableCell>
                                <StyledTableCell>
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.desc}</StyledTableCell>
                                <StyledTableCell >$ {row.price}.00</StyledTableCell>
                                <StyledTableCell>
                                    <span style={{ borderRadius: "50%", padding: '10px', backgroundColor: 'limegreen', color: 'white' }}>
                                        {row.status ? "Available" : "Not available"}
                                    </span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button variant="contained" color="primary"
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
