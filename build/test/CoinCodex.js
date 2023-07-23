"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoinCodex_1 = require("../lib/CoinCodex");
const test_1 = __importDefault(require("../lib/helpers/test"));
describe('CoinCodex', function () {
    beforeEach(function (done) {
        this.CoinCodexClient = new CoinCodex_1.CoinCodex();
        done();
    });
    describe('firstPageHistory', function () {
        beforeEach(function (done) {
            this.CoinCodexClient.firstPageHistory({
                days: 31,
                coins_limit: 5,
                samples: 31,
            }).then((data) => {
                this.data = data;
                done();
            });
        });
        test_1.default.shouldBeAValidRequest();
    });
    describe('coins', function () {
        describe('all', function () {
            beforeEach(function (done) {
                this.CoinCodexClient.coins.all().then((data) => {
                    this.data = data;
                    done();
                });
            });
            test_1.default.shouldBeAValidRequest();
        });
        describe('fetch', function () {
            beforeEach(function (done) {
                this.CoinCodexClient.coins.fetch('btc').then((data) => {
                    this.data = data;
                    done();
                });
            });
            test_1.default.shouldBeAValidRequest();
        });
        describe('fetchHistory', function () {
            beforeEach(function (done) {
                this.CoinCodexClient.coins.fetchHistory('btc', {
                    start_date: '2018-01-01',
                    end_date: '2018-01-31',
                    samples: 31,
                }).then((data) => {
                    this.data = data;
                    done();
                });
            });
            test_1.default.shouldBeAValidRequest();
        });
        // ISSUE: Is not returning a successful request but is according documentation
        // describe('markets', function () {
        //   beforeEach(function (done) {
        //     this.CoinCodexClient.coins.markets('eth').then((data: any) => {
        //       console.log('coincodex-markets-eth', data)
        //       this.data = data;
        //       done();
        //     });
        //   });
        //   test.shouldBeAValidRequest();
        // });
        describe('ranges', function () {
            beforeEach(function (done) {
                this.CoinCodexClient.coins.ranges([
                    'btc',
                    'eth',
                ]).then((data) => {
                    this.data = data;
                    done();
                });
            });
            test_1.default.shouldBeAValidRequest();
        });
    });
});
