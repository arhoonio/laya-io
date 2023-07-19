import React from "react";
import styled from "styled-components";
const Block = styled.div`
    background-color: #e8e4db75;
    border-radius: 4px;
    margin-top: calc(10em/16);
    display:flex;
    margin-bottom: calc(10em/16);
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
    flex-flow:row wrap;
`;

const Drop = styled.select`
    font-family: "Courier New";
    background-color: transparent;
    font-size:0.9em;
    border:none;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
`

const Index = (props) => {
    return <Block>
        <Drop name="type" id="type">
            <option value="nadai">nadai</option>
            <option value="korvai">korvai</option>
            <option value="theermanam">theermanam</option>
            <option value="other">other</option>
        </Drop>
        {props.children}
        </Block>; 
};
export default Index;