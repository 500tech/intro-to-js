const { encode } = require('base-64');

const result = [
  [534234 % 71],
  ['FooBar@gmail.com'],
  ['foobar@gmail.com'],
  [
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aliquam maximus ultrices dignissim. Morbi at tincidunt mi.',
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra,',
      'per inceptos himenaeos. Nulla nec volutpat sapien.',
      'Proin aliquam vulputate elit, eu scelerisque risus pharetra et.',
      'Mauris aliquet, felis in vulputate interdum, metus tellus posuere erat,',
      'at laoreet metus risus sed leo. Integer tempor ex purus.',
      'Sed in tincidunt urna. Morbi id mattis tortor.',
    ],
  ],
];

console.log(encode(JSON.stringify(result)));
