import { ReactNode } from 'react'


import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'
import { defaultColors } from '@payloadcms/richtext-lexical';


// @ts-ignore
import type { StateValues } from '@payloadcms/richtext-lexical/dist/features/textState/feature.server';

const colorState = {
    color: { 
        ...defaultColors.text,
        'aryes-blue': {
            label: 'Aryes Blue',
            css: {
                color: '#417aff',
            },
        },
    },
};

type ExtractAllColorKeys<T> = {
    [P in keyof T]: T[P] extends StateValues ? keyof T[P] : never;
  }[keyof T];
  
type ColorStateKeys = ExtractAllColorKeys<typeof colorState>;


const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6

function parseStyles(node: SerializedTextNode): React.CSSProperties {
    const styles: Record<string, string> = {}

    if (node.$) {
        for (const [stateKey, stateValues] of Object.entries(colorState)) {
            const stateValue = node.$ && node.$[stateKey] as ColorStateKeys

            if (stateValue && stateValues[stateValue]) {
                Object.assign(styles, stateValues[stateValue].css)
            }
        };
    }

    return styles
}

export const textConverter: JSXConverters<SerializedTextNode> = {
	text: ({ node }: { node: SerializedTextNode }) => {
		const { text, format } = node;

        const styles = parseStyles(node);

        if (format & IS_BOLD) styles.fontWeight = 'bold'
        if (format & IS_ITALIC) styles.fontStyle = 'italic'
        if (format & IS_UNDERLINE) {
            styles.textDecoration = styles.textDecoration
            ? `${styles.textDecoration} underline`
            : 'underline'
        }
        if (format & IS_STRIKETHROUGH) {
            styles.textDecoration = styles.textDecoration
            ? `${styles.textDecoration} line-through`
            : 'line-through'
        }
        if (format & IS_CODE) {
            styles.fontFamily = 'monospace'
            styles.backgroundColor = 'rgba(0, 0, 0, 0.05)'
            styles.padding = '0.125em 0.25em'
            styles.borderRadius = '0.25em'
        }

        let content: ReactNode = text

        // Wrap with sub/sup elements (can't be done with CSS alone)
        if (format & IS_SUBSCRIPT) content = <sub>{content}</sub>
        if (format & IS_SUPERSCRIPT) content = <sup>{content}</sup>

        return <span style={styles}>{content}</span>;
	},
}