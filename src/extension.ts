import { commands, ExtensionContext } from "vscode";
import { GITGPTPanel } from "./panels/GITGPTPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("gitgpt.run", () => {
    GITGPTPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand);
}