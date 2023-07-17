import styled from "styled-components";
import React from 'react';
import './index.css';


const Input = styled.div`
    //background-color: red;
    display: flex;
    border-radius: 4px;
    padding:0.5em;
    padding-left:0;
    vertical-align:middle;
    flex-flow: row wrap;
    align-items: center;
    row-gap: 0.6em;
    `;

const Index = styled.span`
    background-color: transparent;
    text-align: left;
    transition: 0.25s ease-in-out;
    cursor: pointer;
    border:none;
    border-radius: 4px;
    font-family: "Courier New";
    font-size:1em;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
    flex-shrink:1;
    min-width:0.3em;
    `;

const Tags = ({childInputRef, props}) => {

    const [tags, setTags] = React.useState([]);
    const [error, setError] = React.useState("");
    const [inputcontent, setInputcontent] = React.useState("type here...");

    const handleTags =  (event) => {
        var contenteditable = document.querySelector('[contenteditable]'),
        text = contenteditable.textContent;
        if (event.key === " " && text !== "") {
            setTags([...tags, inputcontent]);
        }
        else if (event.key === "Backspace" && text == 0){
            const tagsCopy = [...tags];
            tagsCopy.pop();
            event.preventDefault();
            setTags(tagsCopy);
        }
        else if(tags.length < 1 && event.key === "Backspace"){
            setError("Since there is no tags you can't able to delete any tags");
        }
        else if(text === "" && event.key === " "){
            setError("The tag should be one character long!");
        }
        else if (event.key === "Enter") {

        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
        };


    return (<Input>
    {tags.map((tag, index) => (
        <div key={index}>
            <span className="single-tag" onDoubleClick={() => removeTags(index)}>{tag}</span>
        </div>
    ))}
    
        <Index
            type="text"
            onKeyDown={event => handleTags(event)}
            placeholder="type here..."
            ref={childInputRef}
            contentEditable
            list="autofill"
            onInput={(e) => setInputcontent(e.target.innerHTML)}
            
        >
        </Index>
    </Input>
    );
}
export default Tags;