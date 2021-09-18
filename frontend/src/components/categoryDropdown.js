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
    constructor(props) {
        super(props);
        this.state= {
            selected: null,
            categoryList: []
        };
    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/products-api/categories/');
            const apiResult = await res.json();
            this.setState({
                categoryList: apiResult.results ?? []
            });
        } catch (e) {
            console.log(e);
        }
    }
  

    handleChange = (event) => {
        this.setState({selected: event.target.value});
        this.props.onChange(event.target.value, event.target.name);
    };

    render() {
        return (
            <NativeSelect
                id="select-native"
                onChange={this.handleChange.bind(this)}
                input={<BootstrapInput />}
            >
            {this.state.categoryList.map((category) => (
                <option key={category.categoryID} aria-label={category.name} value={category.id}>{category.name}</option>
            ))}
            </NativeSelect>
        );
    }
}

export default (CategoryDropdown);