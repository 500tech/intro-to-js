// Log the reminder of the division 534234 by 71
console.log(534234 % 71);
// Construct the email of this user and log it:
const username = 'FooBar';
const emailProvider = 'gmail';
const dnsSuffix = 'com';
const email = `${username}@${emailProvider}.${dnsSuffix}`;
console.log(email);

// Log a lower case version of the email:
console.log(email.toLowerCase());

// Log the different lines of this text (excluding the empty ones)
const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aliquam maximus ultrices dignissim. Morbi at tincidunt mi.
Class aptent taciti sociosqu ad litora torquent per conubia nostra,
per inceptos himenaeos. Nulla nec volutpat sapien.
Proin aliquam vulputate elit, eu scelerisque risus pharetra et.
Mauris aliquet, felis in vulputate interdum, metus tellus posuere erat,
at laoreet metus risus sed leo. Integer tempor ex purus.
Sed in tincidunt urna. Morbi id mattis tortor.
`;
console.log(lorem.trim().split('\n'));
