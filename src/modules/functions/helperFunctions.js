const capitaliseWords = (string) => {
  const newString = [];
  const splitString = string.toLowerCase().split(' ');

  splitString.forEach(word => {
    newString.push(word.charAt(0).toUpperCase() + word.substring(1));
  });

  return newString.join(' ');
}

export default {
  capitaliseWords
}