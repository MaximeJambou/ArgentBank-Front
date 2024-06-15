import React from 'react';
import "./InputField.scss";

const InputField = ({ label, type, id, value, onChange, checked }) => {

    return (
        <div className="input-wrapper">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                checked={checked}
            />
        </div>
    );
};

export default InputField;
