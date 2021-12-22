import { Action } from 'kbar';
import * as React from 'react';
import defaultActions from './defaultActions';
import { NoteIcon } from './icon/NoteIcon';
import debounce from 'lodash.debounce';

interface History {
  history: {
    id: string;
    title: string;
    tags: string[];
  }[];
}

interface Profile {
  photo: string;
  teams: {
    id: string;
    name: string;
    path: string;
    logo: string;
  }[];
}

interface SearchResult {
  id: string;
  title: string;
  tags: string[];
  team?: {
    name: string;
  };
}

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

const fetchRecentNotes = async () => {
  const response: History = await fetch('/api/_/history?limit=3').then((r) => r.json());
  const recentNotes: Action[] = response.history.map(({ id, title, tags }) => ({
    id,
    name: title,
    section: 'Recent',
    subtitle: tags.map((t) => `#${t}`).join(' ') || '(no tags)',
    perform: () => {
      window.location.pathname = `/${id}`;
    },
    icon: <NoteIcon />,
  }));
  return recentNotes;
};

const fetchTeams = async () => {
  const response: Profile = await fetch('/me').then((r) => r.json());
  const teamActions: Action[] = response.teams.map((team) => ({
    id: team.id,
    name: team.name,
    section: 'Action',
    perform: () => {
      window.location.pathname = `/team/${team.path}`;
    },
    icon: <TeamAvatar src={team.logo} />,
    parent: 'switch-team',
  }));
  const teamActionsWithMyWorkspaceprepended = [
    myWorkspaceAction(<TeamAvatar src={response.photo} />),
    ...teamActions,
  ];
  return teamActionsWithMyWorkspaceprepended;
};

const searchNotes = async (query: string) => {
  if (!query) return [];
  const response: SearchResult[] = await fetch(`/api/_/search?q=${query}`).then((r) =>
    r.json()
  );
  const noteActions: Action[] = response.map(({ id, title, tags, team }) => ({
    id,
    name: title,
    section: 'Search Results',
    subtitle: `@${team?.name || 'My Workspace'} ${
      (tags || []).map((t) => `#${t}`).join(' ') || '(no tags)'
    }`,
    perform: () => {
      window.location.pathname = `/${id}`;
    },
    icon: <NoteIcon />,
  }));
  return noteActions;
};

function useActions(query: string) {
  const [recentNoteActions, setRecentNoteActions] = React.useState<Action[]>([]);
  const [teamActions, setTeamActions] = React.useState<Action[]>([]);
  const [searchedNoteActions, setSearchedNoteActions] = React.useState<Action[]>([]);

  /**
   * Putting defaultActions here again is a workaround to order the actions,
   * making recentNoteActions above the defaultActions.
   * The ordering feature has not been developed yet, see https://github.com/timc1/kbar/issues/66
   */
  const actions = React.useMemo(
    () =>
      searchedNoteActions.length > 0
        ? [...searchedNoteActions, ...defaultActions, ...teamActions]
        : [...recentNoteActions, ...defaultActions, ...teamActions],
    [searchedNoteActions, recentNoteActions, teamActions]
  );

  const collectRecentNoteActions = React.useCallback(() => {
    fetchRecentNotes()
      .then(setRecentNoteActions)
      .catch(console.error)
      .catch(() => setRecentNoteActions([]));
  }, []);

  const collectTeamActions = React.useCallback(() => {
    fetchTeams()
      .then(setTeamActions)
      .catch(console.error)
      .catch(() => setTeamActions([]));
  }, []);

  const collectSearchedNoteActions = React.useCallback(
    debounce((query) => {
      searchNotes(query)
        .then(setSearchedNoteActions)
        .catch(console.error)
        .catch(() => setSearchedNoteActions([]));
    }, 800),
    []
  );

  React.useEffect(() => {
    collectTeamActions();
  }, []);

  React.useEffect(() => {
    collectRecentNoteActions();
  }, [window.location.pathname]);

  React.useEffect(() => {
    collectSearchedNoteActions(query);
  }, [query]);

  return { actions };
}

function TeamAvatar(props: { src: string }) {
  return <img width={24} height={24} style={{ borderRadius: 12 }} src={props.src}></img>;
}

export default useActions;
