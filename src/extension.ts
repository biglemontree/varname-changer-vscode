// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { toBottomLine, toHump, logWarn, logInfo, deleteQuote } from './util';

function replaceFactory(handler:Function, name:string) {
	// 注册编辑器事件
	return vscode.commands.registerTextEditorCommand(`varnameChanger.${name}`, (textEditor, edit) => {
		const getText = textEditor.document.getText;
		// 选中的内容Range数组
		const selectRange = textEditor.selections;
		selectRange.forEach((range) => {
			const { start, end } = range;
			const text = getText(range);
			if (text) {
				const location = new vscode.Range(start, end);
				edit.replace(location, handler(text));
			} else {
				logWarn('未选中任何文字！');
			}
		});
	});
}
export function activate(context: vscode.ExtensionContext) {
	logInfo(`varnameChanger is now active!`);

	context.subscriptions.push(replaceFactory(toBottomLine, 'toBottomLine'));
	context.subscriptions.push(replaceFactory(toHump, 'toHump'));
	context.subscriptions.push(replaceFactory(deleteQuote, 'deleteQuote'));
}

// this method is called when your extension is deactivated
export function deactivate() {}
