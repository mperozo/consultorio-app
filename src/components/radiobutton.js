import React from 'react'

export default (props) => {

    return (
        <div className="custom-control custom-radio">
            <input type="radio"
                id={props.id}
                className="custom-control-input"
                name={props.name}
                value={props.value}
                checked={props.checkedCondition}
                onChange={props.onChangeEvent} />
            <label className="custom-control-label" for={props.id}>{props.label}</label>
        </div>
    )
}