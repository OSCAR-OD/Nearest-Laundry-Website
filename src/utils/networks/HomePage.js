import { api } from "@/utils/networks/api";
import axios from 'axios';

const services = async () => {
    try {
        const response = await axios.get(
            `${api}services`
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

const homePage = async () => {
    try {
        const response = await axios.get(
            `${api}home-page`
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
const videos = async () => {
    try {
        const response = await axios.get(
            `${api}videos`
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

const search = async (q) => {
    try {
        const response = await axios.get(
            `${api}search?q=${q}`
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
    services,
    homePage,
    videos,
    search
}