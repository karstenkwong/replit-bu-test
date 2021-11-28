module.exports = {
    appId: 'HKBUCSD.Replit.Desktop',
    productName: 'HKBUCS Replit Desktop',
    generateUpdatesFilesForAllChannels: false,
    npmRebuild: false,
    electronDownload: { cache: `${__dirname}/.cache/electron-download` },
    directories: {
        output: 'build/',
        app: 'ts-out-prod/',
        buildResources: __dirname
    },
    mac: {
        target: [
            { target: 'dmg', arch: ['arm64', 'x64'] },
            { target: 'zip', arch: ['arm64', 'x64'] }
        ],
        darkModeSupport: true,
        icon: 'logos/replit-logo/icns/icon_new.icns'
    },
    dmg: { writeUpdateInfo: false },
    win: {
        target: [{ target: 'nsis' }, { target: 'zip' }],
        icon: 'logos/replit-logo/logo-clear.png'
    },
    nsis: {
        oneClick: false,
        differentialPackage: false,
        allowToChangeInstallationDirectory: true,
        differentialPackage: false,
        //perMachine: true,
        createDesktopShortcut: true
    },
    linux: {
        target: [
            { target: 'deb', arch: ['x64', 'armv7l', 'arm64'] },
            { target: 'tar.gz', arch: ['x64', 'armv7l', 'arm64'] }
        ],
        //icon: 'src/assets/replit-logo/256x256.png',
        maintainer: 'HKBUCSD',
        category: 'Development'
    }
};
