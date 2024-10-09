import React from 'react';

const Button = ({ onClick, children, className }) => {// props에 대한 타입 검증이 없을 때 나타남..?
    return (
        <button className={className} onClick={onClick}>
        {children}
        </button>
    );
};

export default Button;
