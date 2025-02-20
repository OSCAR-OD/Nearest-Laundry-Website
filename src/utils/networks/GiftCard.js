import { api } from "@/utils/networks/api";
import axios from 'axios';



// Gift Card
const getGiftCardPrices = async () => {
    const response = await axios.get(`${api}gift-card-prices`);
    return response;
}


// send Gift Card
export async function sendGiftCard(data) {
    const response = await axios.post(`${api}send-gift-card`, data);
    return response;
}

export default {
    getGiftCardPrices,
    sendGiftCard
}
