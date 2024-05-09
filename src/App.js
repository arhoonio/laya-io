import React from "react";
import "./App.css";
import Grid from "./Components/Grid";
import Section from "./Components/Card/Section";
import NoteGrid from "./Components/Grid/NoteGrid";
import ThalamGrid from "./Components/Grid/ThalamGrid";
import data from "./Data/notesData.json";
import Tag from "./Components/Tag";
import KanakkuTag from "./Components/KanakkuTag";

function App() {
    
    function splitKanakkuTags(fullSollu, value, karvai) {

      var sollu = fullSollu.length !== 1? fullSollu.split("-") : fullSollu;
      var tags = []
      var start = true
      var end = false
      var lastbutone = false;

      for (var i = 0; i < value; i++){
        end = (i === value - 1)? true:false;
        lastbutone = (value > 1 && i === value - 2)? true:false;
        start = (i === 0)? true:false;
        tags.push(<KanakkuTag 
          karvai={karvai} 
          value={value}
          end={end}
          lastbutone = {lastbutone}
          start={start}>{sollu[i]}
        </KanakkuTag>); 
      }

      return tags
    };

    function renderKorvai () {

      var allTags = []

      data.content.tags.map((tag) => (tag.type !== "karvai" && tag.type !== "kanakku") 
      ? allTags.push(<Tag>{tag.value}</Tag>)
      : splitKanakkuTags(tag.sollu, tag.value, tag.type==="karvai"? true : false).map((tag) => allTags.push(tag)))
    
      function renderRow (start) {
        var rowElms = []
        for (var i = 0; i < data.content.cols; i++){
          rowElms.push( <td>
            {allTags[start + i]}
          </td>)
        }
        return rowElms;
      }

      var fullElms = []

      for (var start=0; start < allTags.length; start+=data.content.cols){
        
        fullElms.push( <tr>
            {renderRow(start)}
        </tr>);
      }
      return fullElms;
    }

    return (
        <div className="App">
          <h2>laya.io</h2>
          <Grid>
              <NoteGrid />
            {/* <Section> detail
              <ThalamGrid>

                {renderKorvai()}

              </ThalamGrid>
            </Section> */}
          </Grid>
        </div>
    );
}
export default App;
