
import fs from 'fs';
import expect from 'expect';
import opensslWrapper from './../src';

describe('openssl-wrapper', () => {
  it('should throw if no action is passed', () => {
    expect(() => opensslWrapper()).toThrow();
  });
  it('should support genrsa action', (done) => {
    const pass = 'foobar';
    opensslWrapper('genrsa', {des3: true, passout: `pass:${pass}`, 1024: false}, (err, obj) => {
      expect(err).toBe(null);
      expect(obj).toBeA(Buffer);
      done();
    });
  });
  it('should support cms.verify action', (done) => {
    const buffer = fs.readFileSync(`${__dirname}/fixtures/signed.mobileprovision`);
    opensslWrapper('cms.verify', buffer, {inform: 'DER', noverify: true}, (err, obj) => {
      expect(err).toBe(null);
      expect(obj).toBeA(Buffer);
      done();
    });
  });
});
