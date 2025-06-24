import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

type Props = {
  data: SerializedEditorState<SerializedLexicalNode>
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, ...rest } = props
  return <RichTextConverter content={props.data} className={className} {...rest} />
}
