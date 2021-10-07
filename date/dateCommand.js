const chrono = require('chrono-node');

const FLAGS = ['-R', '-D', '-T', '-F'];

const processDate = (msg) => {
  const words = msg.content.split(' ');
  if (msg.content.split(' ').length == 1) {
    msg.reply(mls`Usage:
        \`!date (your date/time here)\`
        \`!date (your date/time here) (-R, -D, -T, or -F)\``);
    return;
  }
  let flag = 'F';
  words.map((word) => {
    if (FLAGS.includes(word.toUpperCase())) {
      flag = word.replace('-', '').toUpperCase();
    }
  });
  const filtered = words
      .filter((word) => !FLAGS.includes(word.toUpperCase()))
      .filter((word) => word.toLowerCase() != '!date')
      .join(' ');
  const unix = utcParse(filtered);
  if (unix == -1) {
    msg.reply(
        `That was not a valid time or day, and no, I don't want to date you.`);
    return;
  }
  const out = `<t:${unix}:${flag}>`;
  msg.reply(mls`${out}
                  ||\`${out}\`||`);
};
function utcParse(inputString) {
  const step1 = chrono.parseDate(inputString);
  if (step1 == null) return -1;
  const step2 = Math.floor(step1.getTime() / 1000);
  return step2;
}

// https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
function mls(strings, ...values) {
  // Merge the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];
  // Split on newlines.
  const lines = output.split(/(?:\r\n|\n|\r)/);
  // Rip out the leading whitespace.
  return lines
      .map((line) => {
        return line.replace(/^\s+/gm, '');
      })
      .join('\n')
      .trim(); // join with (" ") to force single line
}

module.exports.processDate = processDate;
