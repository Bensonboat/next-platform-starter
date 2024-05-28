import * as apiUrl from "../api-url";
import axios from "../interceptors";

export const getSingleCampaign = (id: number) => {
    return axios({
        method: "GET",
        url: `${apiUrl.TQ88_CAMPAIGN}/${id}`,
    });
};

export const getCampaignList = () => {
    return axios({
        method: "GET",
        url: `api/landing_page_activity`,
    });
};
