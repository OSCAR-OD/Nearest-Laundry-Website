const validateOrder = (order) => {
    let errorMessage = '';
    let hasError = false;
    if(!order.postCode){
        errorMessage += 'Post code required. ';
        hasError = true;
    }
    if(!order.streetAddress){
        errorMessage += 'Street address required. ';
        hasError = true;
    }
    if(!order.billingPostcode){
        errorMessage = 'Billing address postcode required. ';
        hasError = true;
    }
    if(!order.billingStreetAddress){
        errorMessage = 'Billing street address required. ';
        hasError = true;
    }
    if(!order.collectionDate){
        errorMessage = 'Collection date required. ';
        hasError = true;
    }
    if(!order.collectionTime){
        errorMessage = 'Collection time required. ';
        hasError = true;
    }

    if(!order.deliveryTime){
        errorMessage = 'Collection date required. ';
        hasError = true;
    }
    if(!order.deliveryDate){
        errorMessage = 'Collection time required. ';
        hasError = true;
    }
    if(!order.email){
        errorMessage = 'Email required. ';
        hasError = true;
    }
    if(!order.name){
        errorMessage = 'Name required. ';
        hasError = true;
    }
    if(!order.mobile){
        errorMessage = 'Mobile / Whatsapp required. ';
        hasError = true;
    }
    return {
        errorMessage, hasError
    }
}
export default validateOrder;