var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = new XMLHttpRequest();

function sendWebhook () {
    request.open("POST", "https://discord.com/api/webhooks/702652537026904095/xBnS_W4nsGM24NmdUrJA4uGQWAThrkYxSMbDA1t1hhEK5xh7CsF06cagkO5twzSYN4RK");
    // again, replace the url in the open method with yours
    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        username: "Purpl",
        avatar_url: "https://pbs.twimg.com/profile_images/1341157346295296001/6aIEu_7I_400x400.jpg",
        embeds: [{
            title: 'Purpl SNKRS Checkout',
            author: {
                'name': 'purpl',
            },
            description: 'hey you hit',
            footer: {
                'text': '@purplapps',
            },
            color: 0xff0000,
            timestamp: new Date(),
            }]
        }

    request.send(JSON.stringify(params));
    console.log(request)
}

sendWebhook()