import React from 'react';

const Input = ({ value, onChange, defaultValue, className }) => {
    return (
        <input
        className={className}
        type="text"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        />
    );
};

export default Input;
