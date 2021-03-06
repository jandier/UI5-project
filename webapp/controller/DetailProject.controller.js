/*eslint-disable no-console, no-alert*/
/*global history*/

sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./EditProject", "./AddEmployee",
	"./utilities",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, EditProject, AddEmployee, Utilities, History, JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.project3.controller.DetailProject", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App5bfbee02a519720ccef17e57";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype") {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		
		
		_onButtonPress: function() {

			var sDialogName = "EditProject";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new EditProject(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onButtonPress1: function() {
				var oModel = new JSONModel();
				console.log(oModel);
				oModel.read("ProjectSet", {
				success: function(oRetrievedResult) { console.log(oRetrievedResult) },
				error: function(oError) { /* do something */ }
				});
				return 1;

			/*return new Promise(function(fnResolve, fnReject) {
				if (oSourceBindingContext) {
					var oModel = oSourceBindingContext.getModel();
					oModel.remove(oSourceBindingContext.getPath(), {
						success: function() {
							oModel.refresh();
							fnResolve();
						},
						error: function() {
							oModel.refresh();
							fnReject(new Error("remove failed"));
						}
					});
				}
			}).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});*/

		},
		_onButtonPress2: function() {

			var sDialogName = "AddEmployee";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new AddEmployee(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("DetailProject").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
			var oView = this.getView();
			oView.addEventDelegate({
				onBeforeShow: function() {
					if (sap.ui.Device.system.phone) {
						var oPage = oView.getContent()[0];
						if (oPage.getShowNavButton && !oPage.getShowNavButton()) {
							oPage.setShowNavButton(true);
							oPage.attachNavButtonPress(function() {
								this.oRouter.navTo("MasterPage", {}, true);
							}.bind(this));
						}
					}
				}.bind(this)
			});

		}
	});
}, /* bExport= */ true);
