const {app, dialog} = require('electron')
const {CreateUserFiles} = require('./CreateUserFiles')
const baseConfiguration = require('../../config.json');

exports.CheckUserFiles = function () {
    const application = app.config.application
    const user = app.config.user
    const paths = {application, user}
    CreateUserFiles("SampleConfig", paths)
    let MissingKeys = []

    try {
        Object.keys(baseConfiguration.css).forEach(function (key) {
            if (!app.config.css.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key.toString())
            }
        })

        Object.keys(baseConfiguration.preferences).forEach(function (key) {
            if (!app.config.preferences.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key)
            }
        })

        Object.keys(baseConfiguration.advanced).forEach(function (key) {
            if (!app.config.advanced.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key)
            }
        })

        Object.keys(baseConfiguration.transparency).forEach(function (key) {
            if (!app.config.transparency.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key)
            }
        })

        Object.keys(baseConfiguration.login).forEach(function (key) {
            if (!app.config.login.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key)
            }
        })

        Object.keys(baseConfiguration.lastfm).forEach(function (key) {
            if (!app.config.lastfm.hasOwnProperty(key)) {
                console.log(`[MissingKey] ${key}`)
                MissingKeys.push(key)
            }
        })
    } catch(err) {
        console.log(`[CheckUserFiles] File check failed. ${err}`)
        app.configInitializationFailed = true
        MissingKeys.push('ConfigurationInitializationFailure')
    }

    CreateUserFiles('CopyThemes', paths)

    if (MissingKeys.length !== 0 || app.configInitializationFailed) {
        MissingKeys = MissingKeys.toString()
        CreateUserFiles("SampleConfig", paths)
        dialog.showMessageBox(app.win, {
            message: `Your current configuration is incompatible, make a backup of your current configuration. Pressing OK will overwrite your current configuration.`,
            title: "Missing Keys in Configuration",
            type: "warning",
            detail: `Missing Keys: \n${MissingKeys}`,
            buttons: []
        }).then(() => CreateUserFiles("Config", paths))
    }
}