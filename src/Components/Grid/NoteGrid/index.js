import React, { useCallback } from "react";
import styled from "styled-components";
import './index.css';
import data from '../../../Data/notesData.json'

// {"type":"karvai", "sollu": "dhee-ee-ngu", "value":"tha", "articulation": 2, "speed": 2}


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
    flex-direction:row;
    flex-shrink:1;
`;

const NoteTag = styled.span.attrs(props => ({
    $karvai: props.$karvai,
    $rowIndex: props.$rowIndex,
    $tagIndex: props.$tagIndex
}))`
    padding: 0.5em 0.75em;
    background-color: ${props => props.$karvai === true? "#787878" : "#3C343110"} ;
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

    const [lastEditedRow, setlastEditedRow] = React.useState(0);
    const [lastEditedTag, setlastEditedTag] = React.useState(0);
    const [lastCallback, setlastCallback] = React.useState("")

    const autoFocusFn = useCallback(element => {if (element) element.focus();}, []);

    function addTag (value, rowIndex, tagIndex) {
        var gridCopy = {...grid};
        console.log("rowIndex: " + rowIndex)
        console.log("tagIndex: " + tagIndex)
        gridCopy.rows[rowIndex].tags[tagIndex].value = value;
        gridCopy.rows[rowIndex].tags.splice(tagIndex+1, 0, {value:""});
        setGrid(gridCopy);
        //setInputcontent("")
        //console.log(grid)
    }

    function backspaceTag (rowIndex, tagIndex) {
        if (grid.rows.length > 1 || tagIndex > 0) {
            var gridCopy = {...grid};
            gridCopy.rows[rowIndex].tags.splice(tagIndex, 1)
            // if (gridCopy.rows[rowIndex].tags.length === 0) {
            //     gridCopy.rows[rowIndex].tags.splice(tagIndex, 1)
            // }
            setGrid(gridCopy);
        }
    }

    function newLine (rowIndex, tagIndex) {
        var gridCopy = {...grid};
        gridCopy.rows.push({tags: [{value:""}]});
        setGrid(gridCopy)
    }

    function handleTags (event, rowIndex, tagIndex) {

        setlastEditedRow(rowIndex);
        setlastEditedTag(tagIndex);

        if (event.key === " " && event.target.innerHTML !== "") {
            setlastCallback("add")
            event.preventDefault()
            addTag(parse(event.target.innerHTML), rowIndex, tagIndex);
        }
        else if (event.key === "Backspace" && event.target.innerHTML === ""){
            setlastCallback("backspace")
            backspaceTag(rowIndex, tagIndex);
        }
        else if (event.key === "Enter") {
            setlastCallback("enter")
            event.preventDefault()
            newLine(rowIndex, tagIndex);
        }
        else{ 
            setlastCallback("")
        }

        console.log("lastCallback:" + "\"" + lastCallback+ "\" ")
        console.log("lastEditedRow:" + "\"" + lastEditedRow+ "\" ")
        console.log("lastEditedTag:" + "\"" + lastEditedTag+ "\" ")
        console.log("innerHTML:" + "\"" + event.target.innerHTML+ "\" ")
        console.log(grid)

    }

    function renderRows () {
        return grid.rows.map((row, rowIndex) => <tr>{row.tags.map((tag, tagIndex) => 
        <td style={{paddingBottom: "calc(0.85em/2)", paddingTop: "calc(0.85em/2)", flexShrink:"1", marginBottom:"0.5em", flexGrow:"unset"}}> {
            (lastCallback === "add" && tagIndex===lastEditedTag + 1) ||
            (lastCallback === "backspace" && tagIndex===lastEditedTag - 1) ||
            (lastCallback === "enter" && rowIndex===grid.rows.length - 1) ||
            (rowIndex === lastEditedRow && tagIndex === lastEditedTag)
            ? <NoteTag 
                $rowIndex={rowIndex}
                $tagIndex={tagIndex}
                ref={autoFocusFn}
                onFocus={(e)=>{
                    let sel = window.getSelection();
                    sel.selectAllChildren(e.target);
                    sel.collapseToEnd();
                }}
                contentEditable
                onKeyDown={event => handleTags(event, rowIndex, tagIndex)}
                spellCheck="false"
                suppressContentEditableWarning={true}
                >
                    {parse(tag.value)}
            </NoteTag> 
            : <NoteTag 
                onFocus={(e)=>{
                    let sel = window.getSelection();
                    sel.selectAllChildren(e.target);
                    sel.collapseToEnd();
                }}
                $rowIndex={rowIndex}
                $tagIndex={tagIndex}
                onKeyDown={event => handleTags(event, rowIndex, tagIndex)}
                contentEditable
                spellCheck="false"
                onInput={(e) => {
                    handleTags(e, rowIndex, tagIndex)
                }
                }
                suppressContentEditableWarning={true}>
                    {parse(tag.value)}
                
            </NoteTag>}</td>)}</tr>)
    }

    
    // return <div style={{backgroundColor: '#3C343109',height:'100%', whiteSpace:'nowrap', position: 'relative', marginTop: '0.075em', marginBottom: '0.75em', 
    // paddingLeft:'0.5em', borderRadius:'4px'}}>
    //     <NoteGrid>{renderRows()}</NoteGrid>
    // </div>
    return <NoteGrid>{renderRows()}</NoteGrid>
};
export default Index;