
const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

    const {
        MediaFile
    } = this.entities;


    /**
     * Handler method called before creating data entry
     * for entity Mediafile.
     */
    this.before('CREATE', 'MediaFile', async (req) => {

        req.data.url = `/odata/v4/purchase-req/MediaFile(${req.data.id})/content`;

       
    });

    
})