import React, {useState} from "react";
import "./App.css";
import Grid from "./Components/Grid";
import Block from "./Components/Card/Block";
import Section from "./Components/Card/Section";
import Input from "./Components/Input";
import { useRef } from "react";
import ThalamGrid from "./Components/Grid/ThalamGrid";
import data from "./Data/korvaiDetail.js";
import Tag from "./Components/Tag";
import KanakkuTag from "./Components/KanakkuTag";

function App() {

    const childInputRef = useRef(null);

    const focusChild = () => {
        childInputRef.current && childInputRef.current.focus()
      }
    
    function splitKanakkuTags(fullSollu, value, karvai) {

      var sollu = fullSollu.split("-");
      var tags = []

      for (var i = 0; i < value; i++){
        tags.push(<KanakkuTag 
          karvai={karvai} 
          value={value}>{sollu[i]}
        </KanakkuTag>); 
      }

      return tags
    };

    return (
        <div className="App">
          <ul className="navbar">
            <li className="logo"><h2>laya.io</h2></li>
            <li className="navoption"><a href="#">video + audio annotation</a></li>
            <li className="navoption"><a href="#">about</a></li>
          </ul>
          <Grid>
            <Section> notes
              <Block onClick={focusChild}>
                <Input childInputRef={childInputRef}/>
              </Block>
              <Block onClick={focusChild}><Input childInputRef={childInputRef}/></Block>
              <Block onClick={focusChild}><Input childInputRef={childInputRef}/></Block>
            </Section>
            <Section> detail
              <ThalamGrid>

                {data.content.poorvangam.map((tag) => (tag.type !== "karvai" && tag.type !== "kanakku") 
                  ? <Tag>{tag.value}</Tag> 
                  : splitKanakkuTags(tag.sollu, tag.value, tag.type==="karvai"? true : false))}

                {data.content.madhyangam.map((tag) => (tag.type !== "karvai" && tag.type !== "kanakku") 
                  ? <Tag>{tag.value}</Tag> 
                  : splitKanakkuTags(tag.sollu, tag.value, tag.type==="karvai"? true : false))}

                {data.content.uttarangam.map((tag) => (tag.type !== "karvai" && tag.type !== "kanakku") 
                  ? <Tag>{tag.value}</Tag> 
                  : splitKanakkuTags(tag.sollu, tag.value, tag.type==="karvai"? true : false))}

              </ThalamGrid>
            </Section>
          </Grid>
        </div>
    );
}
export default App;
