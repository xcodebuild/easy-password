// @flow
import React, { Component } from 'react';
import './App.css';

//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import Page from './components/Page';
import style from './App.css';

import encrypt from './lib/encrpty';

import {
  CellsTitle, 
  Form,
  FormCell,
  CellHeader,
  Label,
  CellBody,
  Input,
  Button
} from 'react-weui';

class App extends Component {
 
  render() {
    const state = this.state || {};
    const buildChangeHandler = (stateName: string) => e => this.setState(Object.assign(state, {[stateName]: e.target.value}));

    return (
      <Page title='EasyPassword' subtitle='Easy way to manage password'>
        <CellsTitle></CellsTitle>
        <Form>
          <FormCell>
            <cellheader>
              <Label>memory</Label>
            </cellheader>
            <cellbody>
              <Input type="password" placeholder="password" onChange={buildChangeHandler('memory')}/>
            </cellbody>
          </FormCell>
          <FormCell>
            <cellheader>
              <Label>code</Label>
            </cellheader>
            <cellbody>
              <Input type="text" placeholder="site code" onChange={buildChangeHandler('code')}/>
            </cellbody>
          </FormCell>
        </Form>
        <Button className={style.copyButton}>
          {!(state.code && state.memory) ? 'Click to Copy' : encrypt(state.memory, state.code)}
        </Button>
      </Page>
    );
  }
}

export default App;
