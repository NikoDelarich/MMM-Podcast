'use strict';

/* Magic Mirror
 * Module: MMM-RandomVideo
 *
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
module.exports = NodeHelper.create({
	start: function () {
		this.loaded = false;
	},
	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		const self = this;
		this.config = payload;
		if (notification == 'VIDEO_CHANGED') {		
			var omx = require('omxdirector');
			this.config = payload;	
			var status = omx.getStatus();
			if(status.playing){
				omx.stop();
			}  
			else if(this.loaded){
				//TODO
				omx.play("modules/MMM-RandomVideo/videos/vid1.mp4");
			}
			else{
				setTimeout(function(){this.socketNotificationReceived(notification, payload)},2000);
			}
		}
	}
});
