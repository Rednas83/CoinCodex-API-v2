import https from 'https';
import Utils from './helpers/utilities'
import Constants from './helpers/constants'
import { firstPageHistory, fetchHistory, ReturnObject } from '../types'

/** 
 * @description A Node.js wrapper for the CoinCodex API with no dependencies. For more information, visit: https://coincodex.com/page/api/
 * @example
 *     const CoinCodex = require('coincodex-api');
 *     const CoinCodexClient = new CoinCodex(); 
 */
class CoinCodex {
  /** Returns historic data for coins needed to draw the graph on the frontpage */
  async firstPageHistory(params: firstPageHistory) {
    //Must be object
    if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

    if (!params['days']) Utils._WARN_('Missing parameter', 'params must include `days` and be a string or number');
    if (!params['coins_limit']) Utils._WARN_('Missing parameter', 'params must include `coins_limit` and be a string or number');

    //If no 'samples', just set to default: 1
    if (Utils.isNumber(params['samples'])) params['samples'] = `${params['samples']}`;
    if (!Utils.isString(params['samples']) || Utils.isStringEmpty(params['samples'])) {
      params['samples'] = 1;
    }

    //Get values
    const { days, samples, coins_limit } = params;

    const path = `/api/coincodex/get_firstpage_history/${days}/${samples}/${coins_limit}`;
    const options = this._buildRequestOptions(path);

    return this._request(options);
  };

  /** Calls related to coins */
  get coins() {
    return {

      /** Returns all coins on the platform with properties that are needed to display them on the frontpage */
      all: async () => {
        const path = `/apps/coincodex/cache/all_coins.json`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /** Returns all properties for the coin needed to display the coin details page */
      fetch: async (coinId: string) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/api/coincodex/get_coin/${coinId}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /** Returns historical price data for a single coin */
      fetchHistory: async (coinId: string, params: fetchHistory) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.start_date, params.end_date... Warn
        if (!Utils.isString(params['start_date']) || Utils.isStringEmpty(params['start_date'])) Utils._WARN_('Missing parameter', 'params must include `start_date` and be a string in format: `YYYY-MM-DD`');
        if (!Utils.isString(params['end_date']) || Utils.isStringEmpty(params['end_date'])) Utils._WARN_('Missing parameter', 'params must include `end_date` and be a string in format: `YYYY-MM-DD`');

        //If no 'samples', just set to default: 1
        if (Utils.isNumber(params['samples'])) params['samples'] = `${params['samples']}`;
        if (!Utils.isString(params['samples']) || Utils.isStringEmpty(params['samples'])) {
          params['samples'] = 1;
        }

        //Get values
        const { start_date, end_date, samples } = params;

        const path = `/api/coincodex/get_coin_history/${coinId}/${start_date}/${end_date}/${samples}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /** Returns exchanges and markets for a coin */
      markets: async (coinId: string) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/api/exchange/get_markets_by_coin/${coinId}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },

      /** Returns min and max ranges of given coinId(s) for 1 hour, 1 day, 7 day, 30 day, 90 day, 180 day, year to date, last 365 days and all time */
      ranges: async (coinIds: string | string[]) => {
        if (Utils.isString(coinIds) && Utils.isStringEmpty(coinIds)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');

        if (Array.isArray(coinIds)) {
          if (coinIds.length === 0) Utils._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');

          //If are arrays, convert to string
          coinIds = coinIds.join(',');
        }

        const path = `/api/coincodex/get_coin_ranges/${coinIds}`;
        const options = this._buildRequestOptions(path);

        return this._request(options);
      },
    };
  };

  /** Build options for https.request */
  _buildRequestOptions(path: string) {
    return {
      path,
      method: 'GET',
      host: Constants.HOST,
      port: 443,
    };
  };

  /** Perform https request */
  _request(options: object): Promise<ReturnObject> {
    return new Promise((resolve, reject) => {
      //Perform request
      let req = https.request(options, (res: any) => {
        let body: any = [];

        //Set body on data
        res.on('data', (chunk: any) => {
          body.push(chunk);
        });

        //On end, end the Promise
        res.on('end', () => {
          try {
            body = Buffer.concat(body);
            body = body.toString();

            //Check if page is returned instead of JSON
            if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

            //Attempt to parse
            body = JSON.parse(body);
          }
          catch (error) {
            reject(error);
          };

          //Create return object
          resolve({
            success: !(res.statusCode < 200 || res.statusCode >= 300),
            message: res.statusMessage,
            code: res.statusCode,
            data: body
          }
          );
        });
      });

      //On error, reject the Promise
      req.on('error', (error) => reject(error));

      //End request
      req.end();
    });
  }
}

export { CoinCodex }

