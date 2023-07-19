import React from "react";
import styled from "styled-components";
import data from "../../../Data/korvaiDetail.js";

const ThalamGrid = styled.div`
    display:grid;
    grid-column-gap: 0.5em;
    grid-template-columns: repeat(${data.content.cols}, 1fr);
    grid-row-gap:0.5em;
    margin-top:0.5em;
`;
const Index = (props) => {
    return <ThalamGrid>{props.children}</ThalamGrid>; 
};
export default Index;