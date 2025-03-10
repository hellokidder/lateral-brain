import * as vscode from 'vscode';
import { getUri } from './getUri';

export class LateralBrainSidebarProvider implements vscode.WebviewViewProvider {
  // public static readonly viewType = 'lateral-brain.webview';

  constructor(readonly context: vscode.ExtensionContext) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };
    // 设置HTML内容
    webviewView.webview.html = this._getWebviewContent(webviewView.webview);
  }

  private _getWebviewContent(webview: vscode.Webview): string {
    // 获取对资源的路径
    // const scriptUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(extensionUri, 'out/webview', 'index.js')
    // );

    const stylesUri = getUri(webview, this.context.extensionUri, [
      'lateral-brain-ui',
      'build',
      'assets',
      'index.css',
    ]);
    // The JS file from the React build output
    const scriptUri = getUri(webview, this.context.extensionUri, [
      'lateral-brain-ui',
      'build',
      'assets',
      'index.js',
    ]);
    // const codiconsUri = getUri(webview, this.context.extensionUri, [
    //   'node_modules',
    //   '@vscode',
    //   'codicons',
    //   'dist',
    //   'codicon.css',
    // ]);

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <title>Lateral Brain</title>
      </head>
      <body>
        <div id="root">hello kidder</div>
        <script src="${scriptUri}"></script>
      </body>
      </html>`;
  }
}
