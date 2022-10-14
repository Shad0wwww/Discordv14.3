const { default: Axios, default: axios } = require("axios")
const validator = require("validator")
const fetch = require('node-fetch');
require('dotenv').config();
const { secretToken } = process.env;
module.exports = {
    getIpInfo: async(target) => {

        let info =  (await axios.get("http://api.ipstack.com/"+target+"/?access_key="+secretToken)).data
        return info
    }
}