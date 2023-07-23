import React from "react";
import styled from 'styled-components'

const InputAreaComp = styled.div.attrs( props => ({

})
)`
    display:flex;
    flex-flow: row wrap;
    border-radius: 5px;
    margin-bottom:0.85em;
    margin-top:0.5em;
    gap: 1em;
    padding:0.7em 0.7em 0.7em 0.5em;
    background-color: #3c343109;
    -webkit-appearance: none;
    &:hover {
        border:0.7px solid black;
    }
    &:focus {
        border:1.2px solid black;
        outline:none;
    }
`
const Button = styled.button.attrs( props => ({

})
)`
    background-color: transparent;
    font-family:'Courier New', Courier, monospace;
    padding:0.3em;
    padding-left:0.55em;
    padding-right:0.55em;
    border:0.7px solid #3c3431;
    align-self:center;
    margin:0.5em;
    margin-bottom:0.85em;
    margin-top:0;
    &:hover{
        background-color: #3c343112;
    }

`

const NoteTag = styled.span.attrs(props => ({

}))`
    padding:0.3em;
    background-color: #3C343110;
    border-radius: 7px;
    margin-right:0.35em;
    white-space:nowrap;

    text-align:left;
`;


const Cursor = styled.span.attrs(props => ({

}))`
    background-color: transparent;
    text-align:left;
    cursor: pointer;
    flex-shrink:1;
    min-width:0.3em;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
`;

const InputArea = ({props}) => {

    const [tags, setTags] = React.useState([]);
    const [inputcontent, setInputcontent] = React.useState("")
    const parse = require('html-react-parser');

    const handleTags =  (event) => {
        var contenteditable = document.querySelector('[contenteditable]'),
        text = contenteditable.textContent;
        if (event.key === " " && text !== "") {
            setTags([...tags, inputcontent]);
        }
        else if (event.key === "Backspace" && text===""){
            const tagsCopy = [...tags];
            removeTags(tagsCopy.length-1);
        }
        else if (event.key === "Enter") {

        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return <div style={{height:'100%', whiteSpace:'nowrap', position: 'relative'}}>
        <InputAreaComp>
        {tags.map((tag, index) => (
            <div key={index}>
                <NoteTag onDoubleClick={() => removeTags(index)}>{parse(tag)}</NoteTag>
            </div>
        ))}
            <Cursor 
                contenteditable='true' 
                onKeyDown={event => handleTags(event)}
                onInput={(e) => setInputcontent(e.target.innerHTML)}
            />
        </InputAreaComp>
        <ul>
            <Button>new nadai</Button>
            <Button>new korvai</Button>
            <Button>new theermanam</Button>
            <Button>new morah</Button>
        </ul>

    </div>
}

export default InputArea;