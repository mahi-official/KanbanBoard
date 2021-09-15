import React, { Component } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
    input: {
        width: '20em',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

class CategoryDropdown extends Component {

    render() {
        return (
            <NativeSelect
                id="select-native"
                //onChange={handleChange}
                input={<BootstrapInput />}
            >
                <option aria-label="All" value="All">All</option>
                <option value={"Categories"}>Cat1</option>
                <option value={20}>Cat2</option>
                <option value={30}>Cat3</option>
            </NativeSelect>
        );
    }
}

export default (CategoryDropdown);