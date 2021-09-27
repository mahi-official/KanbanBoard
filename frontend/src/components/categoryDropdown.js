import React, { Component } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core';
import axios from "axios";
import { baseURL } from "./../backend";

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
        axios.get(`${baseURL}/categories/`)
        .then((response) => {
            const result = response.data.results;
            this.setState({...this.state, categoryList: result ?? [] });
        })
        .catch((e) => {
        console.error(e);
        });
    }
  

    handleChange = (event) => {
        this.setState({...this.state, selected: event.target.value});
        if (event.target.value !== "All"){
            this.props.onChange(event.target.value);
        } else{
            this.props.onChange(null);
        }
        
    };

    render() {
        return (
            <NativeSelect
                id="select-native"
                onChange={this.handleChange.bind(this)}
                input={<BootstrapInput />}
            >
            <option key="0" aria-label="All Selected" value="All">All</option>
            
            {this.state.categoryList.map((category) => (
                <option key={category.categoryID} aria-label={category.name} value={category.id}>{category.name}</option>
            ))}
            </NativeSelect>
        );
    }
}

export default (CategoryDropdown);