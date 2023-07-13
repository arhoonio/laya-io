import React from "react";
import styled from "styled-components";
const Block = styled.div`
    background-color: #e8e4db75;
    border-radius: 4px;
    margin-top: calc(10em/16);
    margin-bottom: calc(10em/16);
    display: flex;
    flex-flow: column wrap;
    text-align: left;
    transition: 0.25s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0.75em;
    padding-top: 0.5em;
    &:hover {
        transition: 0.25s ease-in-out;
        border: 1px solid black;
    }
`;
const Index = (props) => {
    return <Block>{props.children}</Block>; 
};
export default Index;