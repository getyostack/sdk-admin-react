import React from "react";
import {EditorProps} from "../editor/editor-props.interface";

export interface EditorContextState extends EditorProps {
}

// @ts-ignore
export const EditorContext = React.createContext<EditorContextState>({});