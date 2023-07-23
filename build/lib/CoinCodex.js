"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinCodex = void 0;
const https_1 = __importDefault(require("https"));
const utilities_1 = __importDefault(require("./helpers/utilities"));
const constants_1 = __importDefault(require("./helpers/constants"));
/**
 * @description A Node.js wrapper for the CoinCodex API with no dependencies. For more information, visit: https://coincodex.com/page/api/
 * @example
 *     const CoinCodex = require('coincodex-api');
 *     const CoinCodexClient = new CoinCodex();
 */
class CoinCodex {
    /** Returns historic data for coins needed to draw the graph on the frontpage */
    firstPageHistory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //Must be object
            if (!utilities_1.default.isObject(params))
                utilities_1.default._WARN_('Invalid parameter', 'params must be of type: Object');
            if (!params['days'])
                utilities_1.default._WARN_('Missing parameter', 'params must include `days` and be a string or number');
            if (!params['coins_limit'])
                utilities_1.default._WARN_('Missing parameter', 'params must include `coins_limit` and be a string or number');
            //If no 'samples', just set to default: 1
            if (utilities_1.default.isNumber(params['samples']))
                params['samples'] = `${params['samples']}`;
            if (!utilities_1.default.isString(params['samples']) || utilities_1.default.isStringEmpty(params['samples'])) {
                params['samples'] = 1;
            }
            //Get values
            const { days, samples, coins_limit } = params;
            const path = `/api/coincodex/get_firstpage_history/${days}/${samples}/${coins_limit}`;
            const options = this._buildRequestOptions(path);
            return this._request(options);
        });
    }
    ;
    /** Calls related to coins */
    get coins() {
        return {
            /** Returns all coins on the platform with properties that are needed to display them on the frontpage */
            all: () => __awaiter(this, void 0, void 0, function* () {
                const path = `/apps/coincodex/cache/all_coins.json`;
                const options = this._buildRequestOptions(path);
                return this._request(options);
            }),
            /** Returns all properties for the coin needed to display the coin details page */
            fetch: (coinId) => __awaiter(this, void 0, void 0, function* () {
                //Must have coinId
                if (!utilities_1.default.isString(coinId) || utilities_1.default.isStringEmpty(coinId))
                    utilities_1.default._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');
                const path = `/api/coincodex/get_coin/${coinId}`;
                const options = this._buildRequestOptions(path);
                return this._request(options);
            }),
            /** Returns historical price data for a single coin */
            fetchHistory: (coinId, params) => __awaiter(this, void 0, void 0, function* () {
                //Must have coinId
                if (!utilities_1.default.isString(coinId) || utilities_1.default.isStringEmpty(coinId))
                    utilities_1.default._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');
                //Must be object
                if (!utilities_1.default.isObject(params))
                    utilities_1.default._WARN_('Invalid parameter', 'params must be of type: Object');
                //If no params.start_date, params.end_date... Warn
                if (!utilities_1.default.isString(params['start_date']) || utilities_1.default.isStringEmpty(params['start_date']))
                    utilities_1.default._WARN_('Missing parameter', 'params must include `start_date` and be a string in format: `YYYY-MM-DD`');
                if (!utilities_1.default.isString(params['end_date']) || utilities_1.default.isStringEmpty(params['end_date']))
                    utilities_1.default._WARN_('Missing parameter', 'params must include `end_date` and be a string in format: `YYYY-MM-DD`');
                //If no 'samples', just set to default: 1
                if (utilities_1.default.isNumber(params['samples']))
                    params['samples'] = `${params['samples']}`;
                if (!utilities_1.default.isString(params['samples']) || utilities_1.default.isStringEmpty(params['samples'])) {
                    params['samples'] = 1;
                }
                //Get values
                const { start_date, end_date, samples } = params;
                const path = `/api/coincodex/get_coin_history/${coinId}/${start_date}/${end_date}/${samples}`;
                const options = this._buildRequestOptions(path);
                return this._request(options);
            }),
            /** Returns exchanges and markets for a coin */
            markets: (coinId) => __awaiter(this, void 0, void 0, function* () {
                //Must have coinId
                if (!utilities_1.default.isString(coinId) || utilities_1.default.isStringEmpty(coinId))
                    utilities_1.default._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');
                const path = `/api/exchange/get_markets_by_coin/${coinId}`;
                const options = this._buildRequestOptions(path);
                return this._request(options);
            }),
            /** Returns min and max ranges of given coinId(s) for 1 hour, 1 day, 7 day, 30 day, 90 day, 180 day, year to date, last 365 days and all time */
            ranges: (coinIds) => __awaiter(this, void 0, void 0, function* () {
                if (utilities_1.default.isString(coinIds) && utilities_1.default.isStringEmpty(coinIds))
                    utilities_1.default._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');
                if (Array.isArray(coinIds)) {
                    if (coinIds.length === 0)
                        utilities_1.default._WARN_('Invalid parameter', 'coinId must be of type: String or Array and greater than 0 characters, items.');
                    //If are arrays, convert to string
                    coinIds = coinIds.join(',');
                }
                const path = `/api/coincodex/get_coin_ranges/${coinIds}`;
                const options = this._buildRequestOptions(path);
                return this._request(options);
            }),
        };
    }
    ;
    /** Build options for https.request */
    _buildRequestOptions(path) {
        return {
            path,
            method: 'GET',
            host: constants_1.default.HOST,
            port: 443,
        };
    }
    ;
    /** Perform https request */
    _request(options) {
        return new Promise((resolve, reject) => {
            //Perform request
            let req = https_1.default.request(options, (res) => {
                let body = [];
                //Set body on data
                res.on('data', (chunk) => {
                    body.push(chunk);
                });
                //On end, end the Promise
                res.on('end', () => {
                    try {
                        body = Buffer.concat(body);
                        body = body.toString();
                        //Check if page is returned instead of JSON
                        if (body.startsWith('<!DOCTYPE html>'))
                            utilities_1.default._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');
                        //Attempt to parse
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        reject(error);
                    }
                    ;
                    //Create return object
                    resolve({
                        success: !(res.statusCode < 200 || res.statusCode >= 300),
                        message: res.statusMessage,
                        code: res.statusCode,
                        data: body
                    });
                });
            });
            //On error, reject the Promise
            req.on('error', (error) => reject(error));
            //End request
            req.end();
        });
    }
}
exports.CoinCodex = CoinCodex;
