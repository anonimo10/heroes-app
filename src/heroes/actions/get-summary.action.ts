import { heroApi } from "../api/hero.api"
import type { SummaryInformationResponse } from "../type/summary-information.response";

export const getSummaryAction = async() => {
    const { data } = await heroApi.get<SummaryInformationResponse>('/heroes/summary');
    return data;
}
