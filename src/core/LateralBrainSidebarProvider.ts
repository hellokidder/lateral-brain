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
    const inDevelopmentMode =
      this.context?.extensionMode === vscode.ExtensionMode.Development;

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
    const devScriptUri = 'http://localhost:5173/@vite/client';
    const devMainUri = 'http://localhost:5173/src/main.tsx';

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="${stylesUri}">
        <meta http-equiv="Content-Security-Policy" content="
          default-src 'none';
          script-src 'self' http://localhost:5173 'unsafe-inline' 'unsafe-eval';
          connect-src ws://localhost:5173;
          style-src 'self' http://localhost:5173 'unsafe-inline';
          img-src 'self' data:;
          font-src 'self';
        ">
        <title>Lateral Brain</title>
      </head>
      <body>
        <div id="root">hello kidder</div>
        ${
          inDevelopmentMode
            ? `<script type="module">
          import RefreshRuntime from "http://localhost:5173/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        <script type="module" src="${devScriptUri}"></script>
        <script type="module" src="${devMainUri}"></script>
        `
            : `
        <script src="${scriptUri}"></script>
        `
        }
      </body>
      </html>`;
  }
}
// import * as vscode from 'vscode';
// import { getUri } from './getUri';

// export class LateralBrainSidebarProvider implements vscode.WebviewViewProvider {
//   // public static readonly viewType = 'lateral-brain.webview';

//   constructor(readonly context: vscode.ExtensionContext) {}

//   public resolveWebviewView(webviewView: vscode.WebviewView) {
//     webviewView.webview.options = {
//       enableScripts: true,
//       localResourceRoots: [this.context.extensionUri],
//     };
//     console.log('Setting HTML content for webview');
//     webviewView.webview.html = this._getWebviewContent(webviewView.webview);
//   }

//   private _getWebviewContent(webview: vscode.Webview): string {
//     const inDevelopmentMode =
//       this.context?.extensionMode === vscode.ExtensionMode.Development;
//     const stylesUri = getUri(webview, this.context.extensionUri, [
//       'lateral-brain-ui',
//       'build',
//       'assets',
//       'index.css',
//     ]);
//     const devScriptUri = 'http://localhost:5173/@vite/client';
//     const devMainUri = 'http://localhost:5173/src/main.tsx';

//     return `<!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" type="text/css" href="${stylesUri}">

//       </head>
//       <body>
//         <div id="root">123</div>
//          <script type="module">
//           import RefreshRuntime from "http://localhost:5173/@react-refresh"
//           RefreshRuntime.injectIntoGlobalHook(window)
//           window.$RefreshReg$ = () => {}
//           window.$RefreshSig$ = () => (type) => type
//           window.__vite_plugin_react_preamble_installed__ = true
//         </script>
//         <script type="module" src="${devScriptUri}"></script>
//         <script type="module" src="${devMainUri}"></script>
//       </body>
//     </html>`;
//   }
// }
