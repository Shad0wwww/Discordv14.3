const { default: Axios, default: axios } = require("axios")
const validator = require("validator")

module.exports = {
    getUuid: async(username) => {
        console.log("1 " + username)
        let uuid = null;
        if(validator.isUUID(username)) {
            let mcData = (await Axios.get("https://sessionserver.mojang.com/session/minecraft/profile/" + username)).data
            uuid = mcData.id ? mcData.id.substr(0,8)+"-"+mcData.id.substr(8,4)+"-"+mcData.id.substr(12,4)+"-"+mcData.id.substr(16,4)+"-"+mcData.id.substr(20) : null   
            
        } else {
            let mcData = (await Axios.get("https://api.mojang.com/users/profiles/minecraft/" + username)).data
            uuid = mcData.id ? mcData.id.substr(0,8)+"-"+mcData.id.substr(8,4)+"-"+mcData.id.substr(12,4)+"-"+mcData.id.substr(16,4)+"-"+mcData.id.substr(20) : null   
            
        }
        return uuid
    }, 
    getUserName: async(uuid) => {
        let mcData = (await Axios.get("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid)).data
        return mcData.name;
    },
    getNameHistory: async(uuid) => {
        let nameHistory = (await Axios.get("https://api.mojang.com/user/profiles/" + uuid + "/names")).data
        return nameHistory
    }

    
}