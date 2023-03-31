/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ardmmcopolr/ard_mm_co_polr/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
