import { BrowserWindow, clipboard, Menu, MenuItem, MenuItemConstructorOptions, shell } from 'electron';

import { ElectronWindow, promptYesNoSync, selectInput } from '../../common';
import { App } from '../app';
import { PopoutHandler } from '../popoutHandler/popoutHandler';
import { settings } from '../settingHandler';
import { ThemeHandler } from '../themeHandler/themeHandler';

function appMenuSetup(mainApp: App, themeHandler: ThemeHandler, popoutHandler: PopoutHandler): Menu {
    const template: MenuItemConstructorOptions[] = [
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Go Back',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        if (win.webContents.canGoBack()) {
                            win.webContents.goBack();
                        }
                    }
                },
                {
                    label: 'Go Forward',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        if (win.webContents.canGoForward()) {
                            win.webContents.goForward();
                        }
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Open in Browser',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        shell.openExternal(win.webContents.getURL());
                    }
                },
                {
                    label: 'Replit Homepage',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        win.loadURL('https://replit.com/~').catch();
                    }
                },
                /*
                {
                    accelerator: 'CmdOrCtrl+f',
                    label: 'Select input',
                    click(i: MenuItem, win: BrowserWindow) {
                        selectInput(<ElectronWindow>win);
                    }
                },*/
                {
                    type: 'separator'
                },
                {
                    accelerator: 'CmdOrCtrl+R',
                    label: 'Reload',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        if (win) win.reload();
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click: (i: MenuItem, win: BrowserWindow) => {
                        if (win) win.webContents.toggleDevTools();
                    }
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetZoom'
                },
                {
                    role: 'zoomIn'
                },
                {
                    role: 'zoomOut'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                },
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'App',
            submenu: [
                /*
                {
                    label: 'Themes',
                    submenu: [
                        {
                            label: 'Choose Theme',
                            click() {
                                themeHandler.openWindow();
                            }
                        },
                        {
                            label: 'Make Theme',
                            click() {
                                themeHandler.openMaker();
                            }
                        }
                    ]
                },
                {
                    label: 'Discord',
                    submenu: [
                        {
                            label: 'Reconnect to Discord',
                            click() {
                                mainApp.discordHandler.connectDiscord();
                            }
                        },
                        {
                            label: 'Disconnect from Discord',
                            click() {
                                mainApp.discordHandler.disconnectDiscord();
                            }
                        }
                    ]
                },*/
                { type: 'separator' },
                {
                    label: 'Restore Session',
                    type: 'checkbox',
                    checked: <boolean>settings.has('restore-url'),
                    click(item: MenuItem, win: BrowserWindow) {
                        mainApp.toggleRestoreSession(item, <ElectronWindow>win);
                    }
                },
                {
                    label: 'Clear Cookies',
                    click() {
                        mainApp.clearCookies(false, false, true);
                    }
                },
                {
                    label: 'Reset Settings',
                    click() {
                        mainApp.resetPreferences();
                    }
                },
                { type: 'separator' },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                {
                    role: 'pasteAndMatchStyle'
                },
                {
                    role: 'delete'
                },
                {
                    role: 'selectAll'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Copy URL to clipboard',
                    click(i: MenuItem, win: BrowserWindow) {
                        clipboard.writeText(win.webContents.getURL());
                    }
                }
            ]
        },
        /*{
            label: 'View',
            submenu: [
                {
                    label: 'Popout Terminal',
                    click(i: MenuItem, win: BrowserWindow) {
                        popoutHandler.launch(<ElectronWindow>win);
                    }
                },
                {
                    label: 'Mobile View',
                    type: 'checkbox',
                    checked: <boolean>settings.get('enable-ace'),
                    click(item: MenuItem) {
                        mainApp.toggleAce(item);
                    }
                },
                {
                    label: 'Crosis Logs',
                    click(i: MenuItem, win: ElectronWindow) {
                        // suggestion: check if the page is on a repl, and if so, just add ?debug=1
                        win.webContents.executeJavaScript(
                            "if(!window.store){alert('You need to be on a repl to use this feature.')};window.store.dispatch({type: 'LOAD_PLUGIN',pluginPud: 'adminpanel',pluginType: 'adminpanel',title: 'adminpanel'});window.store.dispatch({type: 'ADD_SIDE_NAV_ITEM',navItem: {pud: 'adminpanel',pluginType: 'adminpanel',tooltip: 'Crosis Logs',svg: 'Alien'}});"
                        );
                    }
                }
            ]
        },*/
        {
            label: 'Links',
            submenu: [
                {
                    label: 'Moodle',
                    click() {
                        shell.openExternal('https://buelearning.hkbu.edu.hk/login/index.php');
                    }
                },
                {
                    label: 'Buniport',
                    click() {
                        shell.openExternal('https://buniport03.hkbu.edu.hk/');
                    }
                },
                {
                    label: 'HKBUCSD',
                    click() {
                        shell.openExternal('https://www.comp.hkbu.edu.hk/v1/');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Docs',
                    click() {
                        let win = new ElectronWindow(
                            {
                                height: 900,
                                width: 1600
                            },
                            '',
                            true
                        );
                        win.loadURL('https://docs.replit.com');
                    }
                },
                {
                    label: 'CLI',
                    click(i: MenuItem, win: BrowserWindow) {
                        win.loadURL('https://replit.com/~/cli').catch();
                    }
                }
            ]
        },
        {
            role: 'help',
            submenu: [
                /*{
                    label: 'Replit discord',
                    click() {
                        shell.openExternal('https://replit.com/discord');
                    }
                },*/
                {
                    label: 'Report an issue',
                    click() {
                        shell.openExternal(
                            'https://mail.google.com/mail/?view=cm&fs=1&to=karsten@comp.hkbu.edu.hk&su=Report HKBUCS Replit Desktop issue'
                        );
                    }
                },
                /*{
                    label: 'Github Repo',
                    click() {
                        shell.openExternal('https://github.com/repl-it-discord/repl-it-electron');
                    }
                },*/
                { label: 'Version', role: 'about' }
            ]
        }
    ];
    return Menu.buildFromTemplate(template);
}

export { appMenuSetup };
