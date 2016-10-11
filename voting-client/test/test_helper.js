import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

export default function testSetup() {

  const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
  const win = doc.defaultView;

  global.document = doc;
  global.window = win;

  //add all global window methods to Node global object
  Object.keys(window).forEach(key => {
    if(!(key in global)) {
      global[key] = window[key];
    }
  });

  chai.use(chaiImmutable);
}