import { Action } from 'kbar';
import * as React from 'react';

interface History {
  id: string;
  title: string;
  tags: string[];
}

interface Team {
  id: string;
  name: string;
  path: string;
  logo: string;
}

interface HistoryResponse {
  history: History[];
}

interface MeResponse {
  photo: string;
  teams: Team[];
}

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

const myWorkspaceAction = (icon: React.ReactElement): Action => ({
  id: 'my-workspace',
  name: 'My Workspace',
  keywords: 'my me i',
  section: 'Action',
  icon,
  perform: () => {
    window.location.pathname = '/';
  },
  parent: 'switch-team',
});

function useActions() {
  const [noteReady, setNoteReady] = React.useState<Boolean>(false);
  const [teamReady, setTeamReady] = React.useState<Boolean>(false);
  const [noteActions, setNoteActions] = React.useState<Action[]>([]);
  const [teamActions, setTeamActions] = React.useState<Action[]>([]);

  const actions = React.useMemo(
    () => [...noteActions, ...defaultActions, ...teamActions],
    [noteActions, teamActions]
  );

  const fetchNotes = async () => {
    try {
      const response: HistoryResponse = await fetch('/api/_/history?limit=3').then((r) =>
        r.json()
      );
      const notes: Action[] = response.history.map(({ id, title, tags }) => ({
        id,
        name: title,
        section: 'Recent Opened',
        subtitle: tags.map((t) => `#${t}`).join(' '),
        perform: () => {
          window.location.pathname = `/${id}`;
        },
        icon: <NoteIcon />,
      }));
      setNoteActions(notes);
    } catch (error) {
      setNoteActions([]);
    } finally {
      setNoteReady(true);
    }
  };
  const fetchTeams = async () => {
    try {
      const response: MeResponse = await fetch('/me').then((r) => r.json());
      const teams: Action[] = response.teams.map((team) => ({
        id: team.id,
        name: team.name,
        section: 'Action',
        icon: <TeamAvatar src={team.logo} />,
        perform: () => {
          window.location.pathname = `/team/${team.path}`;
        },
        parent: 'switch-team',
      }));
      setTeamActions([myWorkspaceAction(<TeamAvatar src={response.photo} />), ...teams]);
    } catch (error) {
      setTeamActions([]);
    } finally {
      setTeamReady(true);
    }
  };

  React.useEffect(() => {
    fetchTeams();
  }, []);

  React.useEffect(() => {
    fetchNotes();
  }, [window.location.pathname]);

  return { actions, isReady: noteReady && teamReady };
}

function NoteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  );
}

function SwitchIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" /> <line x1="12" y1="8" x2="12" y2="16" />{' '}
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function TeamAvatar(props: { src: string }) {
  return <img width={24} height={24} src={props.src}></img>;
}

export default useActions;
