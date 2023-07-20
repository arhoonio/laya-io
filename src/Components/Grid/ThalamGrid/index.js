import React from "react";
import styled from "styled-components";
import data from "../../../Data/korvaiDetail.js";

const ThalamGrid = styled.table`
    border:none;
    border-collapse: collapse;
    table-layout:fixed;
    width:100%;
    margin-top:0.5em;
    margin-bottom:1em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`;
const Index = (props) => {
    return <ThalamGrid>{props.children}</ThalamGrid>; 
};
export default Index;