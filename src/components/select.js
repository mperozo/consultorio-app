import React from 'react'

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

//criando componente de função como arrow function
export default (props) => {

    const menuItemList = props.lista.map((option, index) => {
        return (
            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
        )
    })

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <InputLabel>{props.inputLabel}</InputLabel>
                <Select {...props}>
                    {menuItemList}
                </Select>
            </FormControl>
        </div>
    )
}