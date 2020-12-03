import React, { createContext, Dispatch, FC, useContext, useReducer } from "react";

import { ActionMap } from "../utils/ActionMap";

type LayoutStateContextData = {
  isSidebarOpened?: boolean;
};

export enum LayoutActionsTypes {
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
}

type LayoutPayload = {
  [LayoutActionsTypes.TOGGLE_SIDEBAR]: undefined;
};

export type LayoutActions = ActionMap<LayoutPayload>[keyof ActionMap<
  LayoutPayload
>];

const LayoutStateContext = createContext<LayoutStateContextData>({
  isSidebarOpened: false,
});
const LayoutDispatchContext = createContext<Dispatch<LayoutActions>>({} as any);

function layoutReducer(state: LayoutStateContextData, action: LayoutActions) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      const isOpen = !state.isSidebarOpened;
      localStorage.setItem("isSidebarOpened", isOpen ? "true" : "false");
      return { ...state, isSidebarOpened: isOpen };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const LayoutProvider: FC = ({ children }) => {
  const storagedIsSidebarOpened = localStorage.getItem("isSidebarOpened");

  const [state, dispatch] = useReducer(layoutReducer, {
    isSidebarOpened: storagedIsSidebarOpened !== "false",
  });

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
};

function useLayoutState() {
  const context = useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  const context = useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };

// ###########################################################
function toggleSidebar(dispatch: Dispatch<LayoutActions>) {
  dispatch({
    type: LayoutActionsTypes.TOGGLE_SIDEBAR,
  });
}
