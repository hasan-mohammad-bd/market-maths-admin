/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ content, readOnly = false, handleContent }) => {
  const editor = useRef(null);

  const config = {
    readonly: readOnly,
    toolbar: !readOnly,
    statusbar: false
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => handleContent && handleContent(newContent)}
    />
  );
};

export default Editor;
