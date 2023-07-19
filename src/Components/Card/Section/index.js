import React from "react";
import styled from "styled-components";
const Section = styled.div`
    background-color: #efedea;
    border-radius: 4px;
    margin-top: 1em;
    margin-bottom:1em;
    padding: 0.75em;
    padding-top: 0.5em;
    padding-bottom: 0;
    display: block;
    text-align: left;
    transition: 0.25s ease-in-out;
    cursor: pointer;
    :hover {
        //transition: 0.25s ease-in-out;
    }
`;
const Index = (props) => {
    return <Section>{props.children}</Section>; 
};
export default Index;