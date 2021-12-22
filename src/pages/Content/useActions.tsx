import { Action } from 'kbar';
import * as React from 'react';
import defaultActions from './defaultActions';
import { NoteIcon } from './icon/NoteIcon';

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

// function wait(delay) {
//   return new Promise((resolve) => setTimeout(resolve, delay))
// }
// function fetchWithRetry(url, delay, tries)

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
  const [recentNoteActions, setRecentNoteActions] = React.useState<Action[]>([]);
  const [teamActions, setTeamActions] = React.useState<Action[]>([]);

  /**
   * The reason why putting defaultActions here again is a workaround to order the actions,
   * making recentNoteActions above the defaultActions.
   * The ordering feature has not been developed yet, see https://github.com/timc1/kbar/issues/66
   */
  const actions = React.useMemo(
    () => [...recentNoteActions, ...defaultActions, ...teamActions],
    [recentNoteActions, teamActions]
  );

  const fetchNotes = async () => {
    try {
      const response: HistoryResponse = await fetch('/api/_/history?limit=3').then((r) =>
        r.json()
      );
      const recentNotes: Action[] = response.history.map(({ id, title, tags }) => ({
        id,
        name: title,
        section: 'Recent Opened',
        subtitle: tags.map((t) => `#${t}`).join(' '),
        perform: () => {
          window.location.pathname = `/${id}`;
        },
        icon: <NoteIcon />,
      }));
      setRecentNoteActions(recentNotes);
    } catch (error) {
      setRecentNoteActions([]);
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
    }
  };

  React.useEffect(() => {
    fetchTeams();
  }, []);

  React.useEffect(() => {
    fetchNotes();
  }, [window.location.pathname]);

  return { actions };
}

function TeamAvatar(props: { src: string }) {
  return <img width={24} height={24} style={{ borderRadius: 12 }} src={props.src}></img>;
}

export default useActions;
