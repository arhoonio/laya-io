import React, {useState} from "react";
import "./App.css";
import Grid from "./Grid";
import Block from "./Card/Block";
import Section from "./Card/Section";
import Input from "./Input";
import { useRef } from "react";

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
            </Section>
          </Grid>
        </div>
    );
}
export default App;
