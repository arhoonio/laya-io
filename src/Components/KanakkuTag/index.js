import styled from 'styled-components';

const Tag = styled.span.attrs(props => ({
    // or we can define dynamic ones
    $karvai: props.$karvai
  }))`
    //display:block;
    padding:0.5em;
    position:sticky;
    float:left;
    vertical-align:middle;
    background-color: ${props => props.$karvai === true? "#e4e4e4" : "#3C343110"};
    color: ${props => props.$karvai === true? "#787878" : "black"} ;
    border-radius: 10px;
    margin-right:0.5em;
    text-align:center;
    `
const Index = (props) => {
    return <Tag $karvai={props.karvai}>{props.children}</Tag>; 
};
export default Index;