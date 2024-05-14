import React from "react";
import styled from "styled-components";
const Grid = styled.div`
    display: grid;
    grid-template-columns:  1.618fr 1.5fr;
    grid-column-gap: calc(10em/16);

`;
const Index = (props) => {
    return <Grid>{props.children}</Grid>; 
};
export default Index;