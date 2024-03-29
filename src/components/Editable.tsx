import ErrorBoundary from "./ErrorBoundary";

import React from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  EditorState,
  // TODO: avoid disabling eslint rule
  // eslint-disable-next-line import/namespace
} from "lexical";
import { ReadonlyDeep } from "type-fest";

function onError(error: ReadonlyDeep<Error>) {
  alert(`Error initializing text editor: ${error.cause}`);
}

function getContent(editorState: ReadonlyDeep<EditorState>) {
  return new Promise<string>((resolve) => {
    editorState.read(() => {
      const root = $getRoot();
      const content = root.getTextContent();
      resolve(content);
    });
  });
}

interface IProps {
  content: string;
  handleChange: (content: string) => void;
  className: string;
  placeholder: React.JSX.Element;
}

export default function Editable(props: ReadonlyDeep<IProps>) {
  const initialConfig = {
    namespace: "editable",
    onError,
    editorState: () => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      const text = $createTextNode(props.content);
      const paragraphWithText = paragraph.append(text);
      return root.append(paragraphWithText);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex flex-col h-full w-full">
        <PlainTextPlugin
          contentEditable={<ContentEditable className={props.className} />}
          placeholder={props.placeholder}
          ErrorBoundary={ErrorBoundary}
        />
      </div>

      <OnChangePlugin
        onChange={async (editorState: ReadonlyDeep<EditorState>) => {
          const content = await getContent(editorState);
          props.handleChange(content);
        }}
      />
    </LexicalComposer>
  );
}
