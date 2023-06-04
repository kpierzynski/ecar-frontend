function generateStringFromTemplate(template, ...args) {
  return template.replace(/\{(\d+)(\*)?\}/g, (match, index, isList) => {
    const arg = args[index];
    if (Array.isArray(arg) && isList === '*') {
      return arg.map((item) => `<li><b>- ${item}</b></li>`).join('\n');
    } else {
      return arg;
    }
  });
}

export default generateStringFromTemplate;
