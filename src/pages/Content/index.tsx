import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const root = document.createElement('div');
root.id = 'hackbar-app-root';

render(<App />, root);
