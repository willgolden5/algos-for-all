//class with start and stop methods that start the bot on a 1 second interval and stop it
function BotService() {
    var interval: NodeJS.Timer;
    return {
        start: function() {
            interval = setInterval(() => console.log('started bot'), 1000);
        },
        stop: function() {
            console.log(interval)
            clearInterval(interval);
        }
    };
}

export default BotService;


