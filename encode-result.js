const { Transform, pipeline } = require('stream');
const { encode } = require('base-64');

class BufferedTransformStream extends Transform {
  constructor(options) {
    super(options);
    this._buffer = '';
  }

  __finalize(_buffer) {
    throw new Error('Unimplemented');
  }

  _transform(chunk, _enc, cb) {
    this._buffer += chunk;
    cb();
  }

  _flush(cb) {
    this.push(this.__finalize(this._buffer));
    cb();
  }
}

function transformBy(mapper, options) {
  const transformer = class extends BufferedTransformStream {
    __finalize(buff) {
      return mapper(buff);
    }
  };
  return new transformer(options);
}

pipeline([
  process.stdin,
  transformBy(str => JSON.stringify(eval(str))),
  transformBy(str => encode(str) + '\n'),
  process.stdout,
]);
