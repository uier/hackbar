import type { Action } from "kbar";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useDebounce } from "usehooks-ts";
import { defaultActions, emptyNoteAction } from "./defaultActions";
import { fetchRecentNotes, fetchTeams, fetchTemplaces, searchNotes } from "./fetchActions";

function useActions(query: string) {
    const [recentNoteActions, setRecentNoteActions] = useState<Action[]>([]);
    const [teamActions, setTeamActions] = useState<Action[]>([]);
    const [templateActions, setTemplateActions] = useState<Action[]>([]);
    const [searchedNoteActions, setSearchedNoteActions] = useState<Action[]>([]);
    const debouncedQuery = useDebounce<string>(query, 500);

    /**
     * Putting defaultActions here again is a workaround to order the actions,
     * making recentNoteActions above the defaultActions.
     * The ordering feature has not been developed yet, see https://github.com/timc1/kbar/issues/66
     */
    const actions = useMemo(
        () =>
            searchedNoteActions.length > 0
                ? [...searchedNoteActions, ...defaultActions, ...templateActions, ...teamActions]
                : [...recentNoteActions, ...defaultActions, ...templateActions, ...teamActions],
        [searchedNoteActions, recentNoteActions, teamActions, templateActions],
    );

    const collectRecentNoteActions = useCallback(() => {
        fetchRecentNotes()
            .then(setRecentNoteActions)
            .catch(console.error)
            .catch(() => setRecentNoteActions([]));
    }, []);

    const collectTeamActions = useCallback(() => {
        fetchTeams()
            .then(setTeamActions)
            .catch(console.error)
            .catch(() => setTeamActions([]));
    }, []);

    const collectTemplaceActions = useCallback(() => {
        fetchTemplaces()
            .then((actions) => [emptyNoteAction, ...actions])
            .then(setTemplateActions)
            .catch(console.error)
            .catch(() => setTeamActions([]));
    }, []);

    const collectSearchedNoteActions = useCallback((query) => {
        searchNotes(query)
            .then(setSearchedNoteActions)
            .catch(console.error)
            .catch(() => setSearchedNoteActions([]));
    }, []);

    useEffect(() => {
        collectTeamActions();
        collectTemplaceActions();
    }, []);

    useEffect(() => {
        collectRecentNoteActions();
    }, [window.location.pathname]);

    useEffect(() => {
        collectSearchedNoteActions(debouncedQuery);
    }, [debouncedQuery]);

    return { actions };
}

export default useActions;
