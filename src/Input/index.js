import React from "react";
import styled from "styled-components";
const Input = styled.textarea`
    background-color: transparent;
    display: flex;
    flex-flow: column wrap;
    text-align: left;
    transition: 0.25s ease-in-out;
    box-sizing: border-box;
    cursor: pointer;
    padding: 0.75em;
    padding-top: 0.5em;
    border:none;
    resize:none;
`;
const Index = (props) => {
    return <Input><textarea name="" id="" rows="1" style={{backgroundColor:"#e8e4db75", border:"none"}}></textarea></Input>; 
};
export default Index;