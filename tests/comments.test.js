const path = require('path');
const { expect } = require('chai');
const { GetFilePaths } = require('../libs/crawl');
const GetComments = require('../libs/comments');
const CRAWL_PATH = path.resolve(__dirname, 'crawl_test');

describe('Get comments', () => {
  it('Should get file comments', () => {
    let filespath = GetFilePaths(CRAWL_PATH);
    let comments = GetComments(filespath[0]);
    expect(comments).to.have.property('length').greaterThan(0);
  })
})