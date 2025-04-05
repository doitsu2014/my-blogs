import dynamic from 'next/dynamic';
import { RichTextEditorProps } from './rich-text-editor';
import { useEffect, useState } from 'react';

const RichTextEditor = dynamic(() => import('./rich-text-editor'), {ssr: false});

export const RichTextEditorWrapper: React.FC<RichTextEditorProps> = ({
  id,
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editorDefaultValue, setEditorDefaultValue] = useState(defaultValue);

  useEffect(() => {
    setIsLoading(true);
    if (defaultValue) {
      setTimeout(() => {
        setEditorDefaultValue(defaultValue);
        setIsLoading(false);
      }, 500);
    }
    else {
      setIsLoading(false);
    }
  }, [defaultValue]);

  return (
    <div>
      {isLoading ? (
        <div className="loading loading-spinner loading-lg"></div>
      ) : (
        <RichTextEditor
          key={id}
          id={id}
          readOnly={readOnly}
          defaultValue={editorDefaultValue}
          onTextChange={onTextChange}
          onSelectionChange={onSelectionChange}
          className={className}
        />
      )}
    </div>
  );
};
