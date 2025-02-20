import axios from 'axios';
import {api} from "@/utils/networks/api";

const data = async (service) => {
    try {
        const response = await axios.get(
            `${api}service/${service}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
const servicesInfo = async (page=1, size=20) => {
    try {
        const response = await axios.get(
            `${api}servicesSitemap?page=${page}&size=${size}`
        );
        if (response.status === 200) {
            const data = response.data;
            return data;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

export default {
    data,
    servicesInfo
}