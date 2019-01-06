export default class Storage {

    get(key,defaultVal){
        return JSON.parse(localStorage.getItem(key)) || defaultVal
    }

    set(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }
}