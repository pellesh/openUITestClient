/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"openUIProject/test/integration/Translate"
	], function() {
		QUnit.start();
	});
});
