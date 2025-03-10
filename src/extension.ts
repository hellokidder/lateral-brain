// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

class CustomSidebarProvider implements vscode.WebviewViewProvider {
  // public static readonly viewType = 'lateral-brain.webview';

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    // 设置HTML内容
    webviewView.webview.html = this._getWebviewContent(
      webviewView.webview,
      this._extensionUri
    );
  }

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ): string {
    // 获取对资源的路径
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'out/webview', 'index.js')
    );

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React View</title>
    </head>
    <body>
      <div id="root">hello kidder</div>
      <script src="${scriptUri}"></script>
    </body>
    </html>`;
  }
}
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "lateral-brain" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'lateral-brain.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World from lateral-brain!');
    }
  );

  context.subscriptions.push(disposable);

  // 注册侧边栏视图;
  const sidebarProvider = new CustomSidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('ChatView', sidebarProvider)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
