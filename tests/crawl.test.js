const { expect } = require('chai');
const { GetFilePaths } = require('../libs/crawl');
const path = require('path');
const CRAWL_PATH = path.resolve(__dirname, 'crawl_test');

describe('Crawl Library', () => {
  it('Should get files path', () => {
    const filespath = GetFilePaths(CRAWL_PATH);
    expect(filespath).to.have.property('length').to.equal(5);
  });

  it('Should get file path with max depth 1', () => {
    const filespath = GetFilePaths(CRAWL_PATH, {}, 1);
    expect(filespath).to.have.property('length').to.equal(4);
  })

  it('Should get php file', () => {
    const filespath = GetFilePaths(CRAWL_PATH, {
      include: /\.php$/
    });
    expect(filespath).to.have.property('length').to.equal(1);
  })

  it('Should ignore file 3 and file 4', () => {
    const filespath = GetFilePaths(CRAWL_PATH, {
      exclude: ['file3.js', 'file4.js']
    });
    expect(filespath).to.have.property('length').to.equal(3);
  })
})