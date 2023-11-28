const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (expections = []) => {
    let localCommands = [];

    const commandCatagories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true 
    );

    for (const commandCatagory of commandCatagories){
        const commandFiles = getAllFiles(commandCatagory);

        for (const commandFile of commandFiles){
            const commandObject = require(commandFile);

            if (expections.includes(commandObject.name)){
                continue;
            }
            localCommands.push(commandObject);
        }
    }    

    return localCommands;
}