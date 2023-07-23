import { CoinCodex } from '../lib/CoinCodex'
import test from '../lib/helpers/test'
describe('CoinCodex', function () {
  beforeEach(function (done) {
    this.CoinCodexClient = new CoinCodex();
    done();
  });

  describe('firstPageHistory', function () {
    beforeEach(function (done) {
      this.CoinCodexClient.firstPageHistory({
        days: 31,
        coins_limit: 5,
        samples: 31,
      }).then((data: any) => {
        this.data = data;
        done();
      });
    });
    test.shouldBeAValidRequest();
  });

  describe('coins', function () {
    describe('all', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.all().then((data: any) => {
          this.data = data;
          done();
        });
      });

      test.shouldBeAValidRequest();
    });

    describe('fetch', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.fetch('btc').then((data: any) => {
          this.data = data;
          done();
        });
      });

      test.shouldBeAValidRequest();
    });

    describe('fetchHistory', function () {
      beforeEach(function (done) {
        this.CoinCodexClient.coins.fetchHistory('btc', {
          start_date: '2018-01-01',
          end_date: '2018-01-31',
          samples: 31,
        }).then((data: any) => {
          this.data = data;
          done();
        });
      });

      test.shouldBeAValidRequest();
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
        ]).then((data: any) => {
          this.data = data;
          done();
        });
      });

      test.shouldBeAValidRequest();
    });
  });
});