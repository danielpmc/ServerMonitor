//let client = require("../../../../index.js").client;
const axios = require('axios');
module.exports = async (client, guild, files) => {
    console.log(chalk.magenta('[DISCORD] ') + chalk.green(client.user.username + " has logged in!"));

    //Check make sure create account channels are closed after a hour
    setTimeout(() => {
        client.guilds.get("639477525927690240").channels.filter(x => x.parentID == '738539016688894024' && (Date.now() - x.createdAt) > 1800000 ).forEach(x => x.delete())
    }, 60000)

    //Auto Activities List
    const activities = [{
            "text": "over DanBot Hosting",
            "type": "WATCHING"
        },
        {
            "text": "DanBot FM",
            "type": "LISTENING"
        },
        {
            "text": "Stalking Dan coding me :)",
            "type": "WATCHING"
        }
    ];
    setInterval(() => {
        const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, {
            type: activity.type
        });
    }, 30000);

    //Reaction-Roles:

    let reactionRoles = require('../reactionRoles');
    client.reactionRoles = reactionRoles;

    // end of Reaction-Roles

    global.invites = {};
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
    
    //Voice channel stats updator
    setInterval(async () => {
        let guild1 = await client.guilds.get("639477525927690240").fetchMembers();
        let roleID1 = '748117822370086932';
        let staffCount = guild1.roles.get(roleID1).members.size;
        client.channels.get("739821419910791348").edit({ name: `Staff: ${staffCount}`, reason: "Staff count update" });
        
        let guild2 = await client.guilds.get("639477525927690240").fetchMembers();
        let roleID2 = '639490038434103306';
        let memberCount = guild2.roles.get(roleID2).members.size;
        client.channels.get("739821366991257621").edit({ name: `Members: ${memberCount}`, reason: "Member count update" });
        
        let guild3 = await client.guilds.get("639477525927690240").fetchMembers();
        let roleID3 = '704467807122882562';
        let botCount = guild3.roles.get(roleID3).members.size;
        client.channels.get("739821468296413254").edit({ name: `Bots: ${botCount}`, reason: "Bot count update" });

        let guild4 = await client.guilds.get("639477525927690240")
        const ticketcount = guild4.channels.filter(x=> x.name.endsWith("-ticket")).size
        client.channels.get("739821447924416562").edit({ name: `Tickets: ${ticketcount}`, reason: "Ticket count update"})

        axios({
            url: config.Pterodactyl.hosturl + "/api/application/servers",
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + config.Pterodactyl.apikey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            }
        }).then(response => {
        client.channels.get("757199549977722890").edit({ name: `Servers Hosting: ${response.data.meta.pagination.total}`, reason: "Server count update"})
        });

        axios({
            url: config.Pterodactyl.hosturl + "/api/application/users",
            method: 'GET',
            followRedirect: true,
            maxRedirects: 5,
            headers: {
                'Authorization': 'Bearer ' + config.Pterodactyl.apikey,
                'Content-Type': 'application/json',
                'Accept': 'Application/vnd.pterodactyl.v1+json',
            }
        }).then(response => {
        client.channels.get("757222585015599214").edit({ name: `Clients Hosting: ${response.data.meta.pagination.total}`, reason: "Client count update"})
        });
        client.channels.get("758746579636191382").edit({ name: `Boosts: ${client.guilds.get("639477525927690240").premiumSubscriptionCount}`, reason: "Boosts count update" })
    }, 30000);


};
