import React, { useCallback } from "react";
import styled from "styled-components";
import './index.css';

const NoteGrid = styled.table`
    border:none;
    border-collapse: collapse;
    table-layout:fixed;
    width:100%;
    margin-top:0.5em;
    margin-bottom:1em;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
`;

const NoteTag = styled.span.attrs(props => ({

}))`
    padding: 0.5em 0.75em;
    background-color: #3C343110;
    border-radius: 7px;
    margin-right:0.5em;
    white-space:nowrap;
    min-width:100px;
    text-align:left;
    -webkit-appearance: none;
    &:focus {
        outline: none;
    }
`;

// const Button = styled.button.attrs( props => ({

// })
// )`
//     background-color: transparent;
//     font-family:'Courier New', Courier, monospace;
//     padding:0.3em;
//     padding-left:0.55em;
//     padding-right:0.55em;
//     border:0.7px solid #3c3431;
//     align-self:center;
//     margin:0.5em;
//     margin-bottom:0.85em;
//     margin-top:0;
//     &:hover{
//         background-color: #3c343112;
//     }

// `

const Index = (props) => {

    const parse = require('html-react-parser');

    const [grid, setGrid] = React.useState({
        rows: [
            {
                tags: [
                    {value: ""},
                ]
            }
        ]
    });

    const [inputcontent, setInputcontent] = React.useState("")

    const autoFocusFn = useCallback(element => {if (element) element.focus();}, []);

    function addTag (value) {
        var gridCopy = {...grid};
        if (value === grid.rows[grid.rows.length-1].tags[grid.rows[grid.rows.length-1].tags.length-1].value)
            gridCopy.rows[gridCopy.rows.length-1].tags[gridCopy.rows[gridCopy.rows.length-1].tags.length-1].value = value;
        gridCopy.rows[gridCopy.rows.length-1].tags.push({value:""});
        setGrid(gridCopy);
        setInputcontent("")
    }

    function backspaceTag () {
        if (grid.rows[0].tags.length > 1) {
            var gridCopy = {...grid};
            gridCopy.rows[gridCopy.rows.length-1].tags.pop();
            setGrid(gridCopy);
        }
        else {

        }
    }

    function newLine () {
        var gridCopy = {...grid};
        gridCopy.rows.push({tags: [{value:""}]});
        setGrid(gridCopy)
    }

    function handleTags (event) {

        if (event.key === " " && inputcontent !== "") {
            event.preventDefault()
            addTag(inputcontent);
        }
        else if (event.key === "Backspace" && inputcontent === ""){
            backspaceTag();
        }
        else if (event.key === "Enter") {
            event.preventDefault()
            newLine();
        }

    }

    function renderRows () {
        return grid.rows.map((row) => <tr>{row.tags.map((tag, index) => 
        <td style={{paddingBottom: "calc(0.85em/2)", paddingTop: "calc(0.85em/2)", flexShrink:"1", marginBottom:"0.5em", flexGrow:"unset"}}> {(index===row.tags.length -1) ?<NoteTag 
                ref={autoFocusFn}
                contentEditable
                onFocus={(e)=>{    let sel = window.getSelection();
                    sel.selectAllChildren(e.target);
                    sel.collapseToEnd();}}
                onKeyDown={event => handleTags(event)}
                onInput={(e) => setInputcontent(e.target.innerHTML)}>
                    {parse(tag.value)}
            </NoteTag> : <NoteTag 
                onKeyDown={event => handleTags(event)}
                contentEditable
                onInput={(e) => setInputcontent(e.target.innerHTML)}>
                    {parse(tag.value)}
            </NoteTag>}</td>)}</tr>)
    }

    
    return <div style={{height:'100%', whiteSpace:'nowrap', position: 'relative'}}>
        <NoteGrid>{renderRows()}</NoteGrid>
        {/* <ul>
            <Button>new nadai</Button>
            <Button>new korvai</Button>
            <Button>new theermanam</Button>
            <Button>new morah</Button>
        </ul> */}
    </div>
};
export default Index;