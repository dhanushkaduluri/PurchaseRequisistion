
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const {
        MediaFile
    } = this.entities;


    /**
     * Handler method called before creating data entry
     * for entity Mediafile.
     */
    this.before('CREATE', MediaFile.drafts, req => {
        console.log(req.data);
        req.data.url = `/odata/v4/purchase-req/PurchaseRequisition(ID=${req.data.PurchaseHeader_ID},IsActiveEntity=true)/_Attachments(id=${req.data.id},IsActiveEntity=true)/content`
    });

    this.on('CREATE', MediaFile.drafts, async ( req, next) => {
        // Optionally log or process the created data
        const createdRecord = await next();

        // Respond with the created record and ensure 201 Created
        // Set the status code explicitly
        return createdRecord;
    });

    
})