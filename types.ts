import { paths } from "./schema";

export interface fetchOptions {
  apikey: string;
  path: string;
  query?: Record<string, any>;
  body?: Record<any, any>;
  baseurl?: string;
  method?: "GET" | "POST";
}

export type CoordinatesOptions =
  paths["/stations/search"]["get"]["parameters"]["query"];
export type CoordinatesResult =
  paths["/stations/search"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"];

// We want to accept an array for easier usage
// https://stackoverflow.com/a/51507473 explains how we override the parameter ids
export type IdsOptions = Omit<
  paths["/stations/ids"]["get"]["parameters"]["query"],
  "ids"
> & { ids: string[] };
export type IdsResult =
  paths["/stations/ids"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"];

export type PostalcodeOptions =
  paths["/stations/postalcode"]["get"]["parameters"]["query"];
export type PostalcodeResult =
  paths["/stations/postalcode"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"];

export type StatsOptions = paths["/stats"]["get"]["parameters"]["query"];
export type StatsResult =
  paths["/stats"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"];

export type ComplaintOptions =
  paths["/complaint"]["post"]["requestBody"]["content"]["application/json"];
export type ComplaintResult =
  paths["/complaint"]["post"]["responses"]["200"]["content"]["application/json; charset=utf-8"];

// The API returns Errors in this format, although it directly contradicts the docs...
export interface APIErrorResponse {
  statusCode: number;
  message: string;
}
