import React from 'react';
import { Action } from 'kbar';
import { PlusIcon } from './icon/PlusIcon';
import { SwitchIcon } from './icon/SwitchIcon';

const defaultActions: Action[] = [
  {
    id: 'new-note',
    name: 'New Note',
    shortcut: ['+'],
    keywords: 'new +',
    section: 'Action',
    icon: <PlusIcon />,
    perform: () => {
      window.location.pathname = '/new';
    },
  },
  {
    id: 'switch-team',
    name: 'Switch Team',
    shortcut: ['@'],
    keywords: 'switch team @',
    section: 'Action',
    icon: <SwitchIcon />,
  },
];

export default defaultActions;
