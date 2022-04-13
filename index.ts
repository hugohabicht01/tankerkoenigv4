import fetch from 'node-fetch';
import { ErrorAPIBadRequest, ErrorAPIInternalServerError, ErrorAPINotFound, ErrorAPIServiceUnavailable, ErrorAPIUnauthorizedRequest, ErrorAPIKeyMissing, ErrorAPIGenericError } from './errors';
import { APIBadRequest, APIInternalServerError, APIServiceUnavailable, APIUnauthorizedRequest, fetchOptions, IdsOptions, IdsResult, PostalcodeOptions, PostalcodeResult, CoordinatesOptions, StatsOptions, StatsResult, CoordinatesResult, ComplaintOptions, ComplaintResult } from './types';

const BASEURL = 'https://creativecommons.tankerkoenig.de/api/v4';

/**
 * Simple fetch function to fetch the API, with some error handling
 * @param options {fetchOptions}
 */
const fetchAPI = (options: fetchOptions) => {
  const defaults = {
    baseurl: BASEURL,
    method: 'GET'
  };

  let {
    path,
    query,
    body,
    baseurl,
    apikey,
    method
  } = {
    ...options,
    ...defaults
  };

  if (!apikey) {
    throw new ErrorAPIKeyMissing();
  }

  if (!query) {
    query = {}
  }

  if (method === 'POST') {
    body = { ...body, apikey: apikey }
  }

  const url = new URL(path, baseurl);
  query.apikey = apikey;
  const params = new URLSearchParams(query);
  url.search = params.toString();

  const stringifiedBody = JSON.stringify(body);
  return fetch(url.toString(), {
    body: stringifiedBody,
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async res => {
      if (!res.ok) {
        switch (res.status) {
          case 400: {
            const response = await res.json() as APIBadRequest;
            throw new ErrorAPIBadRequest(response.code, response.message);
          }
          case 401: {
            const response = await res.json() as APIUnauthorizedRequest;
            throw new ErrorAPIUnauthorizedRequest(response.code, response.message);
          }
          case 404: {
            throw new ErrorAPINotFound();
          }
          case 500: {
            const response = await res.json() as APIInternalServerError;
            throw new ErrorAPIInternalServerError(response.code, response.message);
          }
          case 503: {
            const response = await res.json() as APIServiceUnavailable;
            throw new ErrorAPIServiceUnavailable(response.code, response.message);
          }
          default:
            throw new ErrorAPIGenericError(0 ,'The API returned an error');
        }
      }
      return res.json()
    })
};

/**
 * Simple wrapper around the /stations/search endpoint, can be used to fetch stations around a certain location
 * @param options 
 * @param baseurl 
 */
export const byCoordinates = async (options: CoordinatesOptions, baseurl?: string) => {
  const stations = await fetchAPI({
    path: '/stations/search',
    apikey: options.apikey,
    baseurl: baseurl,
    query: { lat: options.lat, lng: options.lng }
  }) as CoordinatesResult;

  return stations;
}

/**
 * Simple wrapper around the /stations/ids endpoint, can be used to fetch stations by id
 * @param options 
 * @param baseurl 
 */
export const byIds = async (options: IdsOptions, baseurl?: string) => {
  const ids = options.ids.join(',');
  const stations = await fetchAPI({
    path: '/stations/ids',
    apikey: options.apikey,
    baseurl: baseurl,
    query: { ids, lat: options.lat, lng: options.lng }
  }) as IdsResult;
  return stations;
}

/**
 * Simple wrapper around the /stations/postalcode endpoint, can be used to fetch stations at a certain postcode
 * @param options 
 * @param baseurl 
 */
export const byPostalcode = async (options: PostalcodeOptions, baseurl?: string) => {
  const stations = await fetchAPI({
    path: '/stations/postalcode',
    apikey: options.apikey,
    baseurl: baseurl,
    query: { postalcode: options.postalcode }
  }) as PostalcodeResult;
  return stations;
}

/**
 * Simple wrapper around the /stats endpoint, can be used to fetch simple stats about current fuel prices
 * @param options 
 * @param baseurl 
 */
export const stats = async (options: StatsOptions, baseurl?: string) => {
  const stats = await fetchAPI({
    path: '/stats',
    apikey: options.apikey,
    baseurl: baseurl,
  }) as StatsResult;
  return stats;
}

/**
 * Simple wrapper around the /complaint endpoint, can be used to report incorrect data
 * @param options 
 * @param baseurl 
 */
export const complaint = async (options: ComplaintOptions, baseurl?: string) => {
  const { id, type, correction } = options;
  const complaint = await fetchAPI({
    path: '/complaint',
    apikey: options.apikey,
    baseurl: baseurl,
    method: 'POST',
    body: {
      id, type, correction
    }
  }) as ComplaintResult;
  return complaint;
}
