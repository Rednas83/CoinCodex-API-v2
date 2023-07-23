"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Shared tests for validating CoinCodexClient requests */
const chai_1 = require("chai");
const shouldBeAValidRequest = function () {
    it('should return object: {success, message, code, data}', function (done) {
        (0, chai_1.expect)(this.data).to.be.an('object');
        done();
    });
    it('should be a successful request', function (done) {
        (0, chai_1.expect)(this.data.success).to.be.true;
        done();
    });
    it('should return a 200 code', function (done) {
        (0, chai_1.expect)(this.data.code).to.equal(200);
        done();
    });
};
exports.default = { shouldBeAValidRequest };
