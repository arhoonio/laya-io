import React, {useState} from "react";
import "./App.css";
import Grid from "./Grid";
import Block from "./Card/Block";
import Section from "./Card/Section";
import Button from "./Button";
import Input from "./Input";

function App() {

  const [count, setCount] = useState("nadai");
  const [detailName, setDetailName] = useState("detail");

    return (
        <div className="App">
          <h2>laya.io</h2>
          <Grid>
            <Section> notes
              <Block>nadai
              </Block>
              <Block>korvai</Block>
              <ul>
                <Button onClick={() => setCount("nadai")}>
                  new nadai
                </Button>
                <Button onClick={() => setCount("korvai")}>
                  new korvai
                </Button>
                <Button onClick={() => setCount("theermanam")}>
                  new theermanam
                </Button>
              </ul>
            </Section>
            <Section>detail 
              <Block>poorvangam</Block> 
              <Block>madhyangam</Block> 
              <Block>uttarangam</Block> 
            </Section>
          </Grid>
        </div>
    );
}
export default App;
