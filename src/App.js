// @flow
import React, { Component } from 'react';
import Clipboard from 'clipboard';

//import styles
import 'weui';
import 'react-weui/lib/react-weui.min.css';

import Page from './components/Page';
import style from './App.css';

import encrypt from './lib/encrypt';

import {
  CellsTitle, 
  Form,
  FormCell,
  Label,
  Input,
  Button,
  Toast
} from 'react-weui';

class App extends Component {
  state = {
    memory: null,
    code: null,
    showToast: false,
    toastCopySuccess: false,
    toastTimer: null,
  };

  updateState(newPart) {
    this.setState(Object.assign(this.state, newPart));
  }

  componentDidMount() {
    const TOAST_TIME = 2000;
    const state = this.state;
    const clipboard = new Clipboard('#password-to-copy');

    const showToast = (success: boolean): void => {
      if (!state.toastTimer) {
        clearTimeout(state.toastTimer);
      }
      this.updateState({
        showToast: true,
        toastCopySuccess: success,
        toastTimer: setTimeout(() => {
          this.updateState({
            toastTimer: null,
            showToast: false,
          });
        }, TOAST_TIME),
      });
    }
    clipboard.on('success', e => {
      showToast(true);
    });

    clipboard.on('error', e => {
      showToast(false);
    });
  }

  render() {
    const state = this.state;
    const buildChangeHandler = (stateName: string) => e => this.setState(Object.assign(state, {[stateName]: e.target.value}));

    return (
      <Page title='EasyPassword' subtitle='Easy way to manage password'>
        <Toast icon={state.toastCopySuccess ? 'success-no-circle': 'error'} show={this.state.showToast}>
          {state.toastCopySuccess ? 'Copied' : 'Error'}
        </Toast>
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
        <Button id='password-to-copy' data-clipboard-target="#password-to-copy" className={style.copyButton}>
          {!(state.code && state.memory) ? 'Click to Copy' : encrypt(state.memory, state.code)}
        </Button>
      </Page>
    );
  }
}

export default App;
