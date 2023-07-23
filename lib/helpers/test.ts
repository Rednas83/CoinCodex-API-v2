/** Shared tests for validating CoinCodexClient requests */
import { expect } from 'chai'
const shouldBeAValidRequest = function () {

  it('should return object: {success, message, code, data}', function (done) {
    expect(this.data).to.be.an('object')
    done();
  });

  it('should be a successful request', function (done) {
    expect(this.data.success).to.be.true;
    done();
  });

  it('should return a 200 code', function (done) {
    expect(this.data.code).to.equal(200);
    done();
  });
};

export default { shouldBeAValidRequest }