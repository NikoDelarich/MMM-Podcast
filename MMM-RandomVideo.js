Module.register("MMM-RandomVideo",{
    // Default module config.
    defaults: {
		videoFolder: 'modules/MMM-RandomVideo/videos',
		noneInterval: [300, 420],
		userFolders: ["None", "stranger"],
		currentUser: "stranger"
    },
	getScripts: function() {
		return [
			'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
		]
	},
	start: function() {
		Log.info("Starting module: " + this.name);
	},
	playVideo: function(){
		Log.log("Sending playVideo command...");
		this.sendSocketNotification('PLAY_VIDEO', this.config);
	},
	notificationReceived: function(notification, payload, sender) {
		console.log("Received " + notification);
		if(notification == "BUTTON_PRESSED") {
			Log.log(this.name + " received a system notification: " + notification);
			this.playVideo();
		} else if(notification === "HOTWORD" && sender.name === "MMM-Voice-Recognition"){
			this.checkCommands(payload);
    	} else if(notification === "CURRENT_USER") {
			console.log("Set current user to '" + payload + "'");
			this.config.currentUser = payload;
		}
	},	
	// test for your commands
	checkCommands: function(data){
    	if(/(PlayVideo)/g.test(data)){
			this.playVideo();
		}
		if(/(StopVideo)/g.test(data)){
			this.stopVideo();
		}
    }
});
