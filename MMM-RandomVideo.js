Module.register("MMM-RandomVideo",{
    // Default module config.
    defaults: {
		//download time for video
		updateVideoHours: 4,
		updateVideoMinutes: 0,
		//add your static server url here (if needed)
		videoUrl: '',
		//add your feed url here:
		//sadly there are not so many English RandomVideos:
		//feedUrl: 'http://podcastfeeds.nbcnews.com/audio/podcast/MSNBC-MADDOW-NETCAST-M4V.xml',
		//German news in 100 seconds:
		feedUrl: 'http://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden/',
		
		videoFolder: 'modules/MMM-RandomVideo/videos'
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
		this.sendSocketNotification('VIDEO_CHANGED', this.config);
	},
	notificationReceived: function(notification, payload, sender) {
		 if(notification === "ALL_MODULES_STARTED"){
			this.sendNotification("REGISTER_VOICE_MODULE", {
			    mode: "RANDOMVIDEO",
			    sentences: [
				"SHOW RANDOM VIDEO",
				"HIDE RANDOM VIDEO"
			    ]
			});
		    }
		//register MMM-Button click
		else if(notification == "BUTTON_PRESSED") {
			Log.log(this.name + " received a system notification: " + notification);
			this.playVideo();
		}
		else if(notification === "VOICE_PODCAST" && sender.name === "MMM-voice"){
			this.checkCommands(payload);
    	}
	},	
	// test for your commands
	checkCommands: function(data){
    		if(/(SHOW)/g.test(data) && /(PODCAST)/g.test(data)){
			this.playVideo();
		}
		if(/(HIDE)/g.test(data) && /(PODCAST)/g.test(data)){
			this.playVideo();
		}
    	}
});
