"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const util_1 = require("./util");
function replaceFactory(handler, name) {
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
            }
            else {
                util_1.logWarn('未选中任何文字！');
            }
        });
    });
}
function activate(context) {
    util_1.logInfo(`varnameChanger is now active!`);
    context.subscriptions.push(replaceFactory(util_1.toBottomLine, 'toBottomLine'));
    context.subscriptions.push(replaceFactory(util_1.toHump, 'toHump'));
    context.subscriptions.push(replaceFactory(util_1.deleteQuote, 'deleteQuote'));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map