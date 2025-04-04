import dynamic from 'next/dynamic';
import { RichTextEditorProps } from './rich-text-editor';

export const RichTextEditorWrapper: React.FC<RichTextEditorProps> = ({
  id,
  readOnly,
  defaultValue,
  onTextChange,
  onSelectionChange,
  className
}) => {
  const RichTextEditor = dynamic(
    () => import('./rich-text-editor').then((module) => module.default),
    {
      ssr: false
    }
  );

  return (
    <RichTextEditor
      id={id}
      readOnly={readOnly}
      defaultValue={defaultValue}
      onTextChange={onTextChange}
      onSelectionChange={onSelectionChange}
      className={className}
    />
  );
};
