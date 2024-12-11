const fs = require("fs").promises;

async function load_secrets(filename){
    const data = await fs.readFile(filename, "utf-8")
    return JSON.parse(data) 
}

module.exports = {load_secrets}
