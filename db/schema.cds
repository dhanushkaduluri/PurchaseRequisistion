namespace ust.db;
using { cuid } from '@sap/cds/common';



entity PurchaseRequisition : cuid{
    PRNumber           : String(10);
    PRType             : String;
    StatusCode         : String; // Association to Status
    RequestDescription  : String;
    CreatedBy          : String; // Managed by system
    ChangedBy          : String; // Managed by system
    CreatedAt          : Timestamp; // Managed by system
    ChangedAt          : Timestamp; // Managed by system
    RequestNo          : String(10);
    
    // Associations
    Items             : Composition of  many PurchaseRequisitionItem on Items.Parent = $self;
    _Attachments       : Composition of many MediaFile on _Attachments.PurchaseHeader = $self;
}


entity PurchaseRequisitionItem {
    key UUID                 : UUID;
    Parent             : Association to PurchaseRequisition;
    PRItemNumber            : String(10);
    Material                : String;
    MaterialDescription      : String;
    PurOrg                  : String;
    Plant                   : String;
    Status                  : String; // Association to Status
    CreatedBy               : String; // Managed by system
    ChangedBy               : String; // Managed by system
    CreatedAt               : Timestamp; // Managed by system
    ChangedAt               : Timestamp; // Managed by system
    Quantity                : Integer;
    UoM                     : String;
    Price                   : Decimal;
    ReqItemNo              : String;
}


entity MediaFile  {
    key id        : String;
    PurchaseHeader              : Association to PurchaseRequisition;
    @Core.ContentDisposition.Type: 'inline'
    @Core.MediaType: mediaType
    content       : LargeBinary; // The binary content of the file
    @Core.IsMediaType: true
    mediaType     : String; // MIME type of the file
    fileName      : String; // Name of the uploaded file
    size          : Integer; // Size of the file in bytes
    url           : String; // URL to access the uploaded file
}

