sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/ui/model/json/JSONModel",
"sap/m/MessageToast"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("ard.mm.co.polr.ardmmcopolr.controller.Main", {
        onInit: function (oEvent) {
            var oView = this.getView();
            //debugger;
            oView.byId("smartFilterBar").setModel(this.getOwnerComponent().getModel("m2"));
            var mFBConditions = new JSONModel({
                allFilters: "",
                expanded: false,
                filtersTextInfo: "" // oView.byId("smartFilterBar").getActiveFiltersText()
            });
            oView.setModel(mFBConditions, "fbConditions");
            //MessageToast.show("FilterBar filters are Applied!");
            mFBConditions.setProperty("/filtersTextInfo", "Belegtyp" );
            mFBConditions.setProperty("/filtersTextNo", "1");
        },
        handlers: {
            onFiltersChanged: function (oEvent) {
                var oView = this.getView();
                var filterBar = oView.byId("smartFilterBar");
                var allFilters = filterBar.getFilters();

                var oSource = oEvent.getSource();
                var mFBConditions = oSource.getModel("fbConditions");
                mFBConditions.setProperty("/allFilters", JSON.stringify(allFilters, null, "  "));

                if (Object.keys(allFilters).length > 0) {
                    mFBConditions.setProperty("/expanded", true);
                }
                // MessageToast.show("FilterBar filters are changed!"+oSource.getActiveFiltersText());
                // mFBConditions.setProperty("/filtersTextInfo", oSource.getActiveFiltersText());
            }
        },
        onFiltersChanged: function (oEvent) {
            var oView = this.getView();
            var filterBar = oView.byId("smartFilterBar");
            var allFilters = filterBar.getFilters();

            var oSource = oEvent.getSource();
            var mFBConditions = oSource.getModel("fbConditions");
            mFBConditions.setProperty("/allFilters", JSON.stringify(allFilters, null, "  "));

            if (Object.keys(allFilters).length > 0) {
                mFBConditions.setProperty("/expanded", true);
                mFBConditions.setProperty("/filtersTextNo", "(" + filterBar.getAllFiltersWithValues().length + ")");
            }else{
                mFBConditions.setProperty("/filtersTextNo", " ");
            }
            var getFilters = oSource.getFiltersWithValues();
            var arrayOfFilters = [];
            for (let index = 0; index < getFilters.length; index++) {
                const element = getFilters[index];
                var value = element.getLabel();

                arrayOfFilters.push(value);
            }
            //MessageToast.show("FilterBar filters are changed!");
            mFBConditions.setProperty("/filtersTextInfo", arrayOfFilters);
            oSource.getModel("fbConditions").updateBindings();
        },
        onEblenClick:function(oEvent){
            var oContext=oEvent.getSource().getBindingContext();
            var oObject=oContext.getObject();
            var oParam=`?PurchaseOrder=0${oObject.Ebeln}&uitype=advanced`
            this.navToAnotherApp("PurchaseOrder","display",oParam)
        },
        navToAnotherApp: function(semanticObject, action, param) {
            var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
            oCrossAppNavigator.isIntentSupported([semanticObject + "-" + action])
                .done(function(aResponses) {
                    //debugger;
                })
                .fail(function() {
                    new sap.m.MessageToast("Provide corresponding intent to navigate");
                });
            var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
                target: {
                    semanticObject: semanticObject,
                    action: action
                }
            })) || "";
            hash = hash.split("?")[0];
            var url = window.location.href.split('#')[0] + hash + param;
            //Navigate to second app
            sap.m.URLHelper.redirect(url, true);
        },
    });
});
