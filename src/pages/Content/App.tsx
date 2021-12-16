import './index.scss';
import * as React from 'react';
import {
  ActionId,
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  createAction,
  useMatches,
  ActionImpl,
} from 'kbar';

const searchStyle = {
  padding: '12px 16px',
  fontFamily: 'monospace',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  outline: 'none',
  border: 'none',
  background: 'rgb(28 28 29)',
  color: 'rgba(252 252 252 / 0.9)',
};

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  background: 'rgb(28 28 29)',
  color: 'rgba(252 252 252 / 0.9)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'rgb(0 0 0 / 50%) 0px 16px 70px',
};

const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '10px',
  textTransform: 'uppercase' as const,
  opacity: 0.5,
};

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" /> <line x1="12" y1="8" x2="12" y2="16" />{' '}
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const NoteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <line x1="9" y1="11" x2="15" y2="11" />
    <line x1="9" y1="15" x2="13" y2="15" />
  </svg>
);

const SwitchIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const initialNoteActions = [
  {
    id: 'newNote',
    name: 'New',
    shortcut: ['+'],
    keywords: 'new',
    section: 'Note',
    perform: () => {
      window.location.pathname = '/new';
    },
    icon: <PlusIcon />,
    subtitle: 'Create new note.',
  },
];

const initialTeamActions = [
  {
    id: 'switchTeam',
    name: 'Team',
    shortcut: ['@'],
    keywords: 'team',
    section: 'Team',
    perform: () => console.log(`switch team`),
    icon: <SwitchIcon />,
    subtitle: 'Switch to other team (workspace).',
  },
];

const App = () => {
  const [noteActions, setNoteActions] = React.useState<any[]>([]);
  const [teamActions, setTeamActions] = React.useState<any[]>([]);
  const [tagActions, setTagActions] = React.useState<any[]>([]);
  const actions = React.useMemo(
    () => [...noteActions, ...teamActions, ...tagActions],
    [noteActions, teamActions, tagActions]
  );
  const fetchNotes = () => {
    fetch('/api/overview')
      .then((resp) => resp.json())
      .then((resp) => {
        const notes = resp
          .slice(0, 3)
          .map(
            (note: {
              id: string;
              title: string;
              path: string;
              logo: string;
            }) => ({
              id: note.id,
              name: note.title,
              section: 'Note',
              perform: () => {
                window.location.pathname = `/${note.id}`;
              },
              icon: <NoteIcon />,
            })
          );
        setNoteActions([...initialNoteActions, ...notes]);
      })
      .catch(() => {
        setNoteActions(initialNoteActions);
      });
  };
  const fetchTags = () => {};
  const fetchTeams = () => {
    fetch('/me')
      .then((resp) => resp.json())
      .then((resp) => {
        const teams = resp.teams.map(
          (team: { id: string; name: string; path: string; logo: string }) => ({
            id: team.id,
            name: team.name,
            section: 'Team',
            perform: () => {
              window.location.pathname = `/team/${team.path}`;
            },
            icon: <img width={24} height={24} src={team.logo}></img>,
          })
        );
        setTeamActions([...initialTeamActions, ...teams]);
      })
      .catch(() => {
        setTeamActions(initialTeamActions);
      });
  };

  React.useEffect(() => {
    fetchNotes();
    fetchTeams();
    // fetchTags();
  }, []);

  React.useEffect(() => {
    console.log(actions);
  }, [actions]);

  if (actions.length <= 12) return <div />;

  return (
    <KBarProvider
      options={{
        enableHistory: true,
      }}
      actions={actions}
    >
      <CommandBar />
    </KBarProvider>
  );
};

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch
            style={searchStyle}
            placeholder="Search ... | '@' for team | '#' for tag"
          />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

function RenderResults() {
  const { results, rootActionId } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div style={groupNameStyle}>{item}</div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId || ''}
          />
        )
      }
    />
  );
}

const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = React.useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      );
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        style={{
          padding: '12px 16px',
          background: active ? 'rgb(53 53 54)' : 'transparent',
          borderLeft: `2px solid ${
            active ? 'rgba(252 252 252 / 0.9)' : 'transparent'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            fontSize: 14,
          }}
        >
          {action.icon && action.icon}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span
                      style={{
                        opacity: 0.5,
                        marginRight: 8,
                      }}
                    >
                      {ancestor.name}
                    </span>
                    <span
                      style={{
                        marginRight: 8,
                      }}
                    >
                      &rsaquo;
                    </span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}
          >
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                style={{
                  padding: '4px 6px',
                  background: 'rgba(0 0 0 / .1)',
                  borderRadius: '4px',
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

export default App;
