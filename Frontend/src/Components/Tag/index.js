import styled from 'styled-components';

const Tag = styled.span`
padding:0.5em;
display:block;
position:sticky;
vertical-align:middle;
background-color: #3C343110;
border-radius: 7px;
margin-right:0.35em;
margin-left:0.35em;
white-space:nowrap;

text-align:center;
word-break: break-all;
`
const Index = (props) => {
    return <Tag>{props.children}</Tag>; 
};
export default Index;