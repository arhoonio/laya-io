import React from "react";
import styled from "styled-components";

const Button = styled.button`
    margin-left: 1em;
    margin-right: 1em;    
    background-color: #efedea;
    border: 0px;
    font-family: 'Courier New', Courier, monospace;
`;

const Index = (props) => {
    return <Button>{props.children}</Button>; 
};

export default Index;