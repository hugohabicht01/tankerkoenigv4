/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/stations/search": {
    /** Aktuelle Kraftstoffpreise an Tankstellen im Umkreis */
    get: {
      parameters: {
        query: {
          /** Gültiger API-key / Valid API key. */
          apikey: string;
          /** Latitude */
          lat: number;
          /** Longitude */
          lng: number;
          /** Radius in km (max 25) */
          rad?: number;
        };
      };
      responses: {
        /** Tankstellenliste mit aktuellen Kraftstoffpreisen */
        200: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-200"];
          };
        };
        /** Bad Request */
        400: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-400"];
          };
        };
        /** Unauthorized - invalid API key */
        401: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-401"];
          };
        };
        /** Not Found */
        404: unknown;
        /** Internal Server Error */
        500: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
        /** Service Unavailable - rate limit exceeded */
        503: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-503"];
          };
        };
      };
    };
  };
  "/stations/ids": {
    /** Aktuelle Kraftstoffpreise an Tankstellen nach IDs */
    get: {
      parameters: {
        query: {
          /** Gültiger API-key / Valid API key. */
          apikey: string;
          /** Liste von Land, Tankstellen-IDs (komma-separiert) / List of country / station ids (comma separated). */
          ids: string;
          /** Latitude. If latitude and longitude are given, dist to this coordinates is shown in the output */
          lat?: number;
          /** Longitude. If latitude and longitude are given, dist to this coordinates is shown in the output */
          lng?: number;
        };
      };
      responses: {
        /** Liste von Tankstellen. */
        200: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-200"];
          };
        };
        /** Bad Request */
        400: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-400"];
          };
        };
        /** Unauthorized - invalid API key */
        401: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-401"];
          };
        };
        /** Not Found */
        404: unknown;
        /** Internal Server Error */
        500: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
        /** Service Unavailable - rate limit exceeded */
        503: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-503"];
          };
        };
      };
    };
  };
  "/stations/postalcode": {
    /** Aktuelle Kraftstoffpreise an Tankstellen nach Postleitzahl */
    get: {
      parameters: {
        query: {
          /** Gültiger API-key / Valid API key. */
          apikey: string;
          /** Land:Postleitzahl / county:postalcode */
          postalcode: string;
        };
      };
      responses: {
        /** Liste von Tankstellen. */
        200: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-200"];
          };
        };
        /** Bad Request */
        400: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-400"];
          };
        };
        /** Unauthorized - invalid API key */
        401: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-401"];
          };
        };
        /** Not Found */
        404: unknown;
        /** Internal Server Error */
        500: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
        /** Service Unavailable - rate limit exceeded */
        503: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-503"];
          };
        };
      };
    };
  };
  "/stats": {
    get: {
      parameters: {
        query: {
          /** Gültiger API-key / Valid API key. */
          apikey: string;
        };
      };
      responses: {
        /** Statistik / Statistics */
        200: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-stats-200"];
          };
        };
        /** Bad Request */
        400: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-400"];
          };
        };
        /** Unauthorized - invalid API key */
        401: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-401"];
          };
        };
        /** Internal Server Error */
        500: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
        /** Service Unavailable - rate limit exceeded */
        503: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
      };
    };
  };
  "/complaint": {
    /** There are several complaint types allowed, see complaint model. Correction depends on complaint type -- wrongPrice - the correct price as float. wrongPetrolLocation - correct location as LAT,LON (2 floats). Omitted for wrongStatus. For all others - corrected value */
    post: {
      responses: {
        /** OK */
        200: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-stats-200"];
          };
        };
        /** Bad Request */
        400: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-400"];
          };
        };
        /** Unauthorized - invalid API key */
        401: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-401"];
          };
        };
        /** Internal Server Error */
        500: {
          content: {
            "application/json; charset=utf-8": components["schemas"]["response-500"];
          };
        };
      };
      /** Content of complaint with corrrection */
      requestBody: {
        content: {
          "application/json": components["schemas"]["complaint"];
        };
      };
    };
  };
}

export interface components {
  schemas: {
    "response-200": {
      /** @example 4.0.6 */
      apiVersion: string;
      /**
       * Format: date-time
       * @example 2020-01-04T22:14:06+01:00
       */
      timestamp: string;
      stations: components["schemas"]["stations"];
    };
    fuelstat: {
      /**
       * Format: integer
       * @example 12345
       */
      count?: number;
      /**
       * Format: float
       * @example 1.11
       */
      mean?: number;
      /**
       * Format: float
       * @example 1.12
       */
      median?: number;
    };
    station: {
      /** @example de */
      country?: string;
      /** @example 83d5ac80-4f23-4106-b054-7c7704bfcb95 */
      id: string;
      /** @example Aral Tankstelle */
      name?: string;
      /** @example ARAL */
      brand?: string;
      /** @example Cannstatter Straße 3 */
      street?: string;
      /** @example 70190 */
      postalCode: string;
      /** @example Stuttgart */
      place?: string;
      coords: {
        /**
         * Format: float
         * @example 48.78922
         */
        lat: number;
        /**
         * Format: float
         * @example 9.192324
         */
        lng: number;
      };
      /** @example true */
      isOpen?: boolean;
      /**
       * Format: date-time
       * @example 2020-01-05T06:00:00+01:00
       */
      closesAt?: string;
      /**
       * Format: date-time
       * @example 2020-01-05T06:00:00+01:00
       */
      opensAt?: string;
      openingTimes?: {
        days?: (
          | "mon"
          | "tue"
          | "wed"
          | "thu"
          | "fri"
          | "sat"
          | "sun"
          | "hol"
        )[];
        times?: {
          /** @example 06:00 */
          open?: string;
          /** @example 20:00 */
          close?: string;
        }[];
      }[];
      /**
       * Format: float
       * @example 2.5
       */
      dist?: number;
      fuels: {
        /**
         * @example gasoline
         * @enum {string}
         */
        category: "diesel" | "lpg" | "gasoline" | "cng";
        /** @example Super E5 */
        name: string;
        /**
         * Format: float
         * @example 1.399
         */
        price: number;
        lastChange?: {
          /**
           * Format: date-time
           * @example 2020-01-04T22:05:06+01
           */
          timestamp: string;
          /**
           * Format: float
           * @example -0.07
           */
          amount: number;
        };
      }[];
    };
    stations: components["schemas"]["station"][];
    openingTimes: {
      days?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "hol")[];
      times?: {
        /** @example 06:00 */
        open?: string;
        /** @example 20:00 */
        close?: string;
      }[];
    }[];
    days: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "hol")[];
    times: {
      /** @example 06:00 */
      open?: string;
      /** @example 20:00 */
      close?: string;
    }[];
    openingTimesEntry: {
      days?: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun" | "hol")[];
      times?: {
        /** @example 06:00 */
        open?: string;
        /** @example 20:00 */
        close?: string;
      }[];
    };
    fuel: {
      /**
       * @example gasoline
       * @enum {string}
       */
      category: "diesel" | "lpg" | "gasoline" | "cng";
      /** @example Super E5 */
      name: string;
      /**
       * Format: float
       * @example 1.399
       */
      price: number;
      lastChange?: {
        /**
         * Format: date-time
         * @example 2020-01-04T22:05:06+01
         */
        timestamp: string;
        /**
         * Format: float
         * @example -0.07
         */
        amount: number;
      };
    };
    /** @description Complaint entry, used to give  feedback for incorrect data. */
    complaint: {
      /**
       * @description API key of the submitter
       * @example cffa4fb8-7a16-cd85-7946-263722530f15
       */
      apikey: string;
      /**
       * @description UUID of station for which a complaint is sent
       * @example cb1f0588-d517-40f0-8ce3-3edadebea40d
       */
      id: string;
      /**
       * @description Type of complaint
       * @example wrongStatusOpen
       * @enum {string}
       */
      type:
      | "wrongPetrolStationName"
      | "wrongStatusOpen"
      | "wrongStatusClosed"
      | "wrongPriceE5"
      | "wrongPriceE10"
      | "wrongPriceDiesel"
      | "wrongPetrolStationBrand"
      | "wrongPetrolStationStreet"
      | "wrongPetrolStationHouseNumber"
      | "wrongPetrolStationPostcode"
      | "wrongPetrolStationPlace"
      | "wrongPetrolStationLocation";
      /** @description wrongPrice - the correct price as float. wrongPetrolLocation - correct location as LAT,LON (2 floats). Omitted for wrongStatus. For all others - corrected value */
      correction?: string;
    };
    "response-400": {
      /** @example 400 */
      code: number;
      /** @example Bad request */
      message: string;
    };
    "response-stats-200": {
      /** @example 4.0.6 */
      apiVersion: string;
      /**
       * Format: date-time
       * @example 2020-01-04T22:14:06+01:00
       */
      timestamp: string;
      /** @example CC BY NC http://www.tankerkoenig.de */
      license: string;
      Diesel?: components["schemas"]["fuelstat"];
      E5?: components["schemas"]["fuelstat"];
      E10?: components["schemas"]["fuelstat"];
    };
    "response-401": {
      /** @example 401 */
      code: number;
      /** @example Unauthorized - invalid API key */
      message: string;
    };
    "response-500": {
      /** @example 500 */
      code: number;
      /** @example Internal Server Error */
      message: string;
    };
    "response-503": {
      /** @example 503 */
      code: number;
      /** @example Service Unavailable - rate limit exceeded */
      message: string;
    };
  };
}

export interface operations { }

export interface external { }
