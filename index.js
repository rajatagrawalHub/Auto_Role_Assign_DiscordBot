const {Client, GatewayIntentBits} = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent 
    ]
});

const rolesData = JSON.parse(fs.readFileSync("roles.json"));
const users = rolesData["Junior Core"];

client.on("messageCreate",message=>{
    if(message.channel.name === "get-roles"){
        if(message.author.bot) return;
        
        const role = message.guild.roles.cache.find((r) => r.name === "Junior Core");
        if(message.content.length === 11){
            if(users.includes(message.content)){
                message.member.roles.add(role);
                message.delete();
                message.channel.send(`Junior Core Assigned to ${message.member}`);
            }else{
                message.channel.send("Invalid User");
            }
        }else{
            message.channel.send("Invalid Credentials");
        }
    }
});


client.login("MTE5Njc3OTI3MDg4Mjc0MjI4Mw.GHvc6o.eqn6n52uqG0OhEWuj7VkSNaAFJrln39FssbSiE");