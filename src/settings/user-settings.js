import Storage from "../storage";

export default class UserSettings {

    constructor(){
        this.storage = new Storage()
    }

    get(){
        let userSettings = this.storage.get('userSettings',{});
        if (!userSettings.hasOwnProperty('darkMode')) {
            userSettings['darkMode'] = false
        }
        if (!userSettings.hasOwnProperty('theme')) {
            userSettings['theme'] = 'mud'
        }
        return userSettings;
    }

    set(data){
        let userSettings = this.get();
        if (data.hasOwnProperty('darkMode')) {
            userSettings['darkMode'] = data['darkMode']
        }
        if (data.hasOwnProperty('theme')) {
            userSettings['theme'] = data['theme']
        }
        this.storage.set('userSettings',userSettings)
    }
}