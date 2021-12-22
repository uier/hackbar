import * as React from 'react';
import {
  ActionId,
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  useMatches,
  ActionImpl,
  useRegisterActions,
} from 'kbar';
import defaultActions from './defaultActions';
import useActions from './useActions';

const backgroundColor = '#1c1c1d';
const color = '#fcfcfc';
const searchStyle = {
  padding: '12px 16px',
  fontFamily: `'Source Code Pro', monospace`,
  fontSize: '16px',
  width: '100%',
  outline: 'none',
  border: 'none',
  backgroundColor,
  color,
};
const positionerStyle = {
  zIndex: 99, // HackMD's .ui-resizable-handle has { z-index: 90 }
};
const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  backgroundColor,
  color,
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: 'rgb(0 0 0 / 50%) 0px 16px 70px',
};
const groupNameStyle = {
  padding: '8px 16px',
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  opacity: 0.5,
};

const App = () => {
  return (
    <KBarProvider actions={defaultActions}>
      <KBarPortal>
        <KBarPositioner style={positionerStyle}>
          <KBarAnimator style={animatorStyle}>
            <KBarSearch
              style={searchStyle}
              placeholder="Search Note's title, Team name, Tag..."
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <ActionHandler />
    </KBarProvider>
  );
};

const ActionHandler = () => {
  const { actions } = useActions();
  useRegisterActions(actions, [actions.map((e) => e.id).join('')]);
  return null;
};

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
      // if we are on the "Switch Team" parent action,
      // the UI should not display "Switch Team > My Workspace"
      // but rather just "My Workspace"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        style={{
          padding: '12px 16px',
          background: active ? 'rgb(53 53 54)' : 'transparent',
          borderLeft: `2px solid ${active ? color : 'transparent'}`,
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
              <span style={{ fontSize: 12, opacity: 0.75 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length && (
          <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '4px' }}>
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
        )}
      </div>
    );
  }
);

export default App;
