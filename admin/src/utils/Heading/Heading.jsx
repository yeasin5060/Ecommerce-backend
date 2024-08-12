import React from 'react'

const Heading = ({ level, text, className}) => {
    const Tag = `${level}`;

    return <Tag className={className}>{text}</Tag>;
}

export default Heading