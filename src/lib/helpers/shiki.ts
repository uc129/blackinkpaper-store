
// let _highlighter: any = null;

import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: ['javascript', 'typescript', 'tsx', 'python', 'ruby', 'go', 'java', 'csharp', 'cpp', 'php', 'rust'],
})
export async function highlight(code: string, lang: string = 'javascript', theme: string = 'github-dark') {
    return highlighter.codeToHtml(code, { lang: lang, theme: theme, });
}

