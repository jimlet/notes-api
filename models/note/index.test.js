const chai = require('chai');
const dirtyChai = require('dirty-chai');

const { expect } = chai;
// This gives us function form for terminating assertion properties.
// to.be.true becomes to.be.true() and ESLint is happy.
chai.use(dirtyChai);

const SUT = require('../../models/note');

describe('note', () => {
  it('should be invalid if body is empty', (done) => {
    const note = new SUT();
    note.validate((err) => {
      expect(err.errors.body).to.exist();
      done();
    });
  });
});

describe('note', () => {
  it('should be invalid if title is empty', (done) => {
    const note = new SUT();
    note.validate((err) => {
      expect(err.errors.title).to.exist();
      done();
    });
  });
});
