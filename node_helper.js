'use strict';

/* Magic Mirror
 * Module: MMM-RandomVideo
 *
 * MIT Licensed.
 */

var fs  = require('fs');
 
const NodeHelper = require('node_helper');
module.exports = NodeHelper.create({
	start: function () {
		
	},
	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		const self = this;
		this.config = payload;
		if (notification == 'PLAY_VIDEO') {		
			var omx = require('omxdirector');
			this.config = payload;	
			var status = omx.getStatus();
			if(status.playing){
				//omx.stop();
				//Do nothing
			} else {
				console.log(self.config.currentUser + " is logged in");
				
				var folder = self.config.videoFolder;
				if(self.config.userFolders.indexOf(self.config.currentUser) != -1) {
					folder += "/" + self.config.currentUser;
				} else {
					folder += "/stranger";
				}
				console.log("Playing files from " + folder);
				
				var files = fs.readdirSync(folder);
				var randomItem = files[Math.floor(Math.random() * files.length)];
				console.log("Playing " + randomItem);
				
				omx.play(folder + "/" + randomItem);
			}
		} else if (notification == 'STOP_VIDEO') {		
			var omx = require('omxdirector');
			this.config = payload;	
			var status = omx.getStatus();
			if(status.playing){
				omx.stop();
			}
		}
	}
});
