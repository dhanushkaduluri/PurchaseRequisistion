sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
	"sap/ui/core/Item",
	"sap/m/upload/Uploader",
    "sap/m/MessageBox",
], function(MessageToast, Item, MessageBox) {
    'use strict';

    return {
        onAfterItemAdded: async function (oEvent) {
            const oUploadSet = this.byId("UploadSet");
            const oItem = oEvent.getParameter("item");
        
            // Access the model from the upload set
            const oDataModel = oUploadSet.getModel();
            const sHeaderId = this.getBindingContext()?.getObject()?.ID;
        
            // Store file metadata
            this.fileName = oItem.getFileName();
            this.mediaType = oItem.getMediaType();
            this.size = oItem.getFileObject().size;
        
            
        
                const sServiceUrl = oDataModel.sServiceUrl;
        
                // Prepare upload data for POST request
                const oUploadData = {
                    mediaType: this.mediaType,
                    fileName: this.fileName,
                    size: this.size,    
                };
        
                const oSettings = {
                    url: `${sServiceUrl}PurchaseRequisition(ID=${sHeaderId},IsActiveEntity=true)/_Attachments`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        'X-CSRF-Token' : oDataModel.getHttpHeaders()["X-CSRF-Token"]
                    },
                    data: JSON.stringify(oUploadData)
                };
    
                await new Promise((resolve, reject) => {
                    $.ajax(oSettings)
                        .done((results, textStatus, request) => {
                            resolve(results.id);
                        })
                        .fail((error) => {
                            reject(error);
                        })
                })
                .then((id) => {
                    const url = `${sServiceUrl}PurchaseRequisition(ID=${sHeaderId},IsActiveEntity=false)/_Attachments(id=${id},IsActiveEntity=false)/content`;
                    oItem.setUploadUrl(url);
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.addHeaderField(new Item({
                        key: 'X-CSRF-Token',
                        text: oDataModel.getHttpHeaders()["X-CSRF-Token"]
                    }));
                    oUploadSet.uploadItem(oItem);
                })
                .catch((error) => {
                    MessageBox.error(i18n.getText("fileUploadErr", error.responseJSON.error.message));
                })
                
           
        },      
       
        onDownloadSelectedButton: function () {
            var oUploadSet = this.byId("UploadSet");
 
            oUploadSet.getItems().forEach(function (oItem) {
                if (oItem.getListItem().getSelected()) {
                    oItem.download(true);
                }
            });
        },
        onSelectionChange: function() {
            var oUploadSet = this.byId("UploadSet");
            // If there's any item selected, sets version button enabled
            if (oUploadSet.getSelectedItems().length > 0) {
                if (oUploadSet.getSelectedItems().length === 1) {
                    this.byId("versionButton").setEnabled(true);
                } else {
                    this.byId("versionButton").setEnabled(false);
                }
            } else {
                this.byId("versionButton").setEnabled(false);
            }
        },
        onVersionUpload: function(oEvent) {
            var oUploadSet = this.byId("UploadSet");
            this.oItemToUpdate = oUploadSet.getSelectedItem()[0];
            oUploadSet.openFileDialog(this.oItemToUpdate);
        },
       
        onAfterItemRemoved: async function (oEvent) {
            const oRemovedItem = oEvent.getParameter("item"); // Get the item removed
            const sUrl = oRemovedItem.getProperty("url"); // Get the URL from the item
        
            // Extract the ID from the URL
            let mediaId ;
            const regex = /MediaFile\(([^)]+)\)/; // Regular expression to match the ID
            const match = sUrl.match(regex);
            mediaId =  match ? match[1] : null; // Return the ID or null if not found
            if (!mediaId) {
                console.error("Unable to extract ID from URL:", sUrl);
                return;
            }
        
            try {
                const oUploadSet = this.byId("UploadSet");
                const sServiceUrl = oUploadSet.getModel().sServiceUrl;
        
                // Perform the DELETE request
                const deleteResponse = await fetch(`${sServiceUrl}MediaFile(${mediaId})`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete media item from server.");
                }
                oUploadSet.removeItem(oRemovedItem);
                console.log("Media item successfully deleted from the server.");
        
            } catch (error) {
                console.error("Error deleting media item:", error.message);
            }
        },
        
        // Reusable helper method to extract ID from URL
        extractIdFromUrl: function (url) {
            const regex = /MediaFile\(([^)]+)\)/; // Regular expression to match the ID
            const match = url.match(regex);
            return match ? match[1] : null; // Return the ID or null if not found
        }
    };
});
