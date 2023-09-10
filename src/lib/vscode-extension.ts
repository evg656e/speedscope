/**
 * VS Code extension integration code.
 * This code works only when app running in [VS Code webview](https://code.visualstudio.com/api/extension-guides/webview).
 */

import type { WebviewApi } from 'vscode-webview'
import { CallTreeNode } from './profile'

export const VSCODE_ENABLED = typeof acquireVsCodeApi !== 'undefined'

let vscode: WebviewApi<unknown>
if (VSCODE_ENABLED) {
  vscode = acquireVsCodeApi()
}

export function sendJumpToMessage(node: CallTreeNode) {
  const file = node.frame.file
  if (!file) {
    return
  }
  const line = node.frame.line ?? 0
  const col = node.frame.col ?? 0

  vscode.postMessage({
    command: 'jumpTo',
    file,
    line,
    col,
  })
}
