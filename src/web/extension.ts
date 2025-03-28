// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { decodingUserPrompt } from './helper';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ai-gallery" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//let helloGallery = vscode.commands.registerCommand('ai-gallery.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
	//	vscode.window.showInformationMessage('Hello World from ai-gallery in a web extension host!');
	//});

	//context.subscriptions.push(helloGallery);

	// uses a url encoded query parameter named "aiGalleryParam" in the href
	const href = (await vscode.commands.executeCommand('vscode-dev-azurecloudshell.webOpener.getHref') as { href: string }).href;
	vscode.window.showInformationMessage(`Got href: ${href}`);
	const galleryPromptParameter = new URLSearchParams(href).get('aiGalleryParam');
	// Test prompt string: "N4IgbiBcAMA0IAcogMICcCmBDALhgBFgHb4CCAXgK6YC0ARlgM4YAm-GReaCaAls_gBKpAOKEECADa8Axrl4B7EjgAWuSAB0iAYm34UCzPgCSRAGZomONJRk5qBAGT4AQlhkBrDiy018AEQwpBQBPMiojXnNLRmtbeyMACgNOLCiMNDIJRgB6Ugl8AGUMsFkMWHwAeQQOUmMKgwBzIl4cXjACYqw0GRUKwpxDLEaMAEpfEwBbKQxJjhx8AAUQ1SV8Bk9vfAB3VpUhUXwEXC4SSkYoxvCHKpqiOonihcoEfBYFGUo5ziO0D4xGBciFcELwatIiAQzIYlv4AGIVAASABUALIAGQqxDYsRsdgcbBYuCwEwAqgI4VZSItjDkAIqUboLXaqfAyBTTTAqDgXDrsNB_TJqIgsCGNLS6IoYT58HBhZzVDLyJSMCbGaaSWbza5GUj-QiUVks_bvT7fHA0TUdSRkFDowgioQuUgoR4vBCGBZ0BSshCUOjSGQOtg8dq4AiQnDbQweS5qogySSUFgESZKVqGS4VblYSSs3rSjyMLGOlj8KwZfCYdkdNAhCbVNqTXjkKEwmpoaFoSbEGQEbFshSxLRwhSSSQKbZsifJmhEeR8gfMGWtMJ0AELHjuNp9xj4VR_SiNFQKQ0AOhAAF8gA"

	if (galleryPromptParameter) {
		const galleryPrompt =  await decodingUserPrompt(galleryPromptParameter);
		await vscode.commands.executeCommand("workbench.action.chat.open", galleryPrompt);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
