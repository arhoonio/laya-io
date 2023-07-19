import React from "react";
import styled from "styled-components";
import data from "../../../Data/korvaiDetail.js";

const ThalamGrid = styled.table`
    display:grid;
    grid-template-columns: repeat(${data.content.cols}, 1fr);
    table-layout:fixed;
    grid-row-gap:0.5em;
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