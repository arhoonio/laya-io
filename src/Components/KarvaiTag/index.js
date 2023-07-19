import styled from 'styled-components';

const Tag = styled.span`
padding:0.5em;
position:relative;
float:left;
vertical-align:middle;
background-color: #e4e4e4;
color: #787878;
border-radius: 10px;
margin-right:0.5em;
text-align:center;
`
const Index = (props) => {
    return <Tag>{props.children}</Tag>; 
};
export default Index;