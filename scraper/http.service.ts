import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { MAX_TIMEOUT_MS } from "./constants";

const instance = axios.create({
  timeout: MAX_TIMEOUT_MS,
});

const get = <T>(
  URL: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return instance.get<T>(URL, config);
};

export const httpService = {
  get,
};
