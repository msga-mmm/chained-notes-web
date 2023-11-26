import {
  $getRoot,
  $createParagraphNode,
  $createTextNode,
  LexicalEditor,
  EditorState,
} from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ErrorBoundary from "./ErrorBoundary";

function onError(error: Error) {
  alert(`Error initializing text editor: ${error.cause}`);
}

function getContent(editorState: EditorState, _editor: LexicalEditor) {
  return new Promise<string>((resolve, _reject) => {
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
  placeholder: JSX.Element;
}

export default function Editable(props: IProps) {
  const initialConfig = {
    namespace: "editable",
    onError,
    editorState: () => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      const text = $createTextNode(props.content);
      paragraph.append(text);
      root.append(paragraph);
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
        onChange={async (editorState: EditorState, _editor: LexicalEditor) => {
          const content = await getContent(editorState, _editor);
          props.handleChange(content);
        }}
      />
    </LexicalComposer>
  );
}
