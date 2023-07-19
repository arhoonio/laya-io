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
import KarvaiTag from "./Components/KarvaiTag";

function App() {

    const childInputRef = useRef(null);

    const focusChild = () => {
        childInputRef.current && childInputRef.current.focus()
      }

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
                {data.content.poorvangam.map((tag) => tag.type !== "karvai" ? <Tag>{tag.value}</Tag> : <KarvaiTag>{tag.value}</KarvaiTag>)}
                {data.content.madhyangam.map((tag) => tag.type !== "karvai" ? <Tag>{tag.value}</Tag> : <KarvaiTag>{tag.value}</KarvaiTag>)}
                {data.content.uttarangam.map((tag) => tag.type !== "karvai" ? <Tag>{tag.value}</Tag> : <KarvaiTag>{tag.value}</KarvaiTag>)}
              </ThalamGrid>
            </Section>
          </Grid>
        </div>
    );
}
export default App;
