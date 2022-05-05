import { ErrorAPIKeyMissing } from './errors';
import { fetchOptions, IdsOptions, IdsResult, PostalcodeOptions, PostalcodeResult, CoordinatesOptions, StatsOptions, StatsResult, CoordinatesResult, ComplaintOptions, ComplaintResult } from './types';
import { $fetch } from 'ohmyfetch';

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
  query.apikey = apikey;

  if (method === 'POST') {
    body = { ...body, apikey: apikey }
  }

  return $fetch(path, {
    method,
    body,
    baseURL: baseurl,
    params: query,
  })
};

/**
 * Simple wrapper around the /stations/search endpoint, can be used to fetch stations around a certain location
 * @param options 
 * @param baseurl 
 */
export const byCoordinates = async (options: CoordinatesOptions, baseurl?: string) => {
  const { lat, lng, rad, apikey } = { ...options, rad: 2 };
  const stations = await fetchAPI({
    path: '/stations/search',
    apikey: apikey,
    baseurl: baseurl,
    query: { lat, lng, rad }
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
