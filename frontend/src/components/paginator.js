import React, { useState } from 'react';
import { Pagination } from '@mui/material';


export default function Paginator(props) {
    const [value, setValue] = useState(1);
    const count = props.count % props.pageSize === 0 ? Math.floor(props.count / props.pageSize) : Math.floor(props.count / props.pageSize) + 1

    const handlePageClick = (event, value) => {
        setValue(value);
        props.callback(value);
    }

    return (
        <Pagination count={count} page={value} defaultPage={1} shape="rounded" variant="outlined" onChange={handlePageClick} />
    );
}
