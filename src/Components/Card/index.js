import React from "react";
import styled from "styled-components";
const Card = styled.div`
    background-color: #efedea;
    //box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0.75em;
    padding-top: 0.5em;
    padding-bottom: 0;
    display: flex;
    flex-flow: column wrap;
    text-align: left;
    transition: 0.25s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
    :hover {
        transition: 0.25s ease-in-out;
        box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.2);
    }
`;
const Index = (props) => {
    return <Card>{props.children}</Card>; 
};
export default Index;