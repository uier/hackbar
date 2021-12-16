import { KBarProvider } from 'kbar';
import React from 'react';
import './Popup.css';

const actions = [
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'blog'),
  },
  {
    id: 'contact',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'contact'),
  },
];

const Popup = () => {
  return (
    <KBarProvider actions={actions}>
      <div className="App">
        <header className="App-header">
          Hello {actions[0].name} {actions[1].name}
        </header>
      </div>
    </KBarProvider>
  );
};

export default Popup;
