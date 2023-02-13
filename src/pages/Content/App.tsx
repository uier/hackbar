import { Ref } from "react";
import type { ActionId } from "kbar";
import React, { useMemo, forwardRef, Fragment } from "react";
import {
    KBarAnimator,
    KBarProvider,
    KBarPortal,
    KBarPositioner,
    KBarSearch,
    KBarResults,
    useMatches,
    ActionImpl,
    useRegisterActions,
    useKBar,
} from "kbar";
import { defaultActions } from "./defaultActions";
import useActions from "./useActions";

const App = (props: { shortcut: string }) => {
    return (
        <KBarProvider actions={defaultActions} options={{ toggleShortcut: props.shortcut }}>
            <KBarPortal>
                <KBarPositioner style={positionerStyle}>
                    <KBarAnimator style={animatorStyle}>
                        <KBarSearch style={searchStyle} defaultPlaceholder="Search Note's title, Team name, Tag..." />
                        <RenderResults />
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
            <ActionHandler />
        </KBarProvider>
    );
};

const ActionHandler = () => {
    const { search } = useKBar((state) => ({ search: state.searchQuery }));
    const { actions } = useActions(search.trim());
    useRegisterActions(actions, [actions.map((e) => e.id).join("")]);
    return null;
};

/**
 * The following code is modified from the official kbar example:
 * https://github.com/timc1/kbar/tree/main/example
 */

const backgroundColor = "#1c1c1d";
const color = "#fcfcfc";
const searchStyle = {
    padding: "12px 16px",
    fontFamily: `'Source Code Pro', monospace`,
    fontSize: "16px",
    width: "100%",
    outline: "none",
    border: "none",
    backgroundColor,
    color,
};
const positionerStyle = {
    zIndex: 99, // HackMD's .ui-resizable-handle has { z-index: 90 }
};
const animatorStyle = {
    maxWidth: "600px",
    width: "100%",
    backgroundColor,
    color,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "rgb(0 0 0 / 50%) 0px 16px 70px",
};
const groupNameStyle = {
    padding: "8px 16px",
    fontSize: "12px",
    opacity: 0.5,
};

function RenderResults() {
    const { results, rootActionId } = useMatches();

    if (results.length === 0) return <div style={{ padding: "8px 16px" }}>No Results.</div>;

    return (
        <KBarResults
            items={results}
            onRender={({ item, active }) =>
                typeof item === "string" ? (
                    <div style={groupNameStyle}>{item}</div>
                ) : (
                    <ResultItem action={item} active={active} currentRootActionId={rootActionId || ""} />
                )
            }
        />
    );
}

const ResultItem = forwardRef(
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
        ref: Ref<HTMLDivElement>,
    ) => {
        const ancestors = useMemo(() => {
            if (!currentRootActionId) return action.ancestors;
            const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
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
                    margin: "2px 8px",
                    padding: "8px 8px",
                    background: active ? "rgb(53 53 54)" : "transparent",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        fontSize: 14,
                    }}
                >
                    {action.icon && action.icon}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            {ancestors.length > 0 &&
                                ancestors.map((ancestor) => (
                                    <Fragment key={ancestor.id}>
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
                                    </Fragment>
                                ))}
                            <span>{action.name}</span>
                        </div>
                        {action.subtitle && <span style={{ fontSize: 12, opacity: 0.75 }}>{action.subtitle}</span>}
                    </div>
                </div>
                {action.shortcut?.length && (
                    <div style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}>
                        {action.shortcut.map((sc) => (
                            <kbd
                                key={sc}
                                style={{
                                    padding: "4px 6px",
                                    background: "rgba(0 0 0 / .1)",
                                    borderRadius: "4px",
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
    },
);

export default App;
