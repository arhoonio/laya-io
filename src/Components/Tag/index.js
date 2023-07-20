import styled from 'styled-components';

const Tag = styled.div`
padding:0.5em;
display:block;
position:sticky;
vertical-align:middle;
background-color: #3C343110;
border-radius: 5px;
margin-right:0.25em;
margin-left:0.25em;

text-align:center;
word-break: break-all;
`
const Index = (props) => {
    return <Tag>{props.children}</Tag>; 
};
export default Index;