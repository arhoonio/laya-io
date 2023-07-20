import styled from 'styled-components';

const Tag = styled.div.attrs(props => ({
    // or we can define dynamic ones
    $karvai: props.$karvai,
    $start: props.$start,
    $end: props.$end,
    $lastbutone : props.$lastbutone
  }))`
    display:block;
    padding:0.5em;
    position:sticky;
    vertical-align:middle;
    background-color: ${props => props.$karvai === true? "#e4e4e4" : "#3C343110"};
    color: ${props => props.$karvai === true? "#787878" : "black"} ;
    ${props => ((props.$end || !props.$start) && !props.$end || !props.$start) ? "border-top-left-radius: 0" : "border-top-left-radius: 5px"};
    ${props => ((props.$end || !props.$start) && !props.$end || !props.$start) ? "border-bottom-left-radius: 0" : "border-bottom-left-radius: 5px"};
    ${props => ((props.$start || !props.$end) && !props.$start || !props.$end ) ? "border-top-right-radius: 0" : "border-top-right-radius: 5px"};
    ${props => ((props.$start || !props.$end) && !props.$start || !props.$end ) ? "border-bottom-right-radius: 0" : "border-bottom-right-radius: 5px"};
    ${props => ((props.$start && !props.$end)|| props.$lastbutone || (!props.$start && !props.$end)) ? "margin-right: 0" : "margin-right: 0.25em"};
    ${props => ((props.$start)) ? "margin-left: 0.25em" : "margin-left: 0"};
    text-align:center;
    `
const Index = (props) => {
    return <Tag $start = {props.start} $end = {props.end} $lastbutone = {props.lastbutone} $karvai={props.karvai}>{props.children}</Tag>; 
};
export default Index;