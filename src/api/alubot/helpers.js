/**
 * Format the phone number to the venom-bot pattern "5511999999999@c.us"
 * @param {Number} number number that comes in request query
 * @returns {String} formatted venom-bot pattern
 */
const formatNumber = (number, res) => {
  const numberInString = String(number);

  //if starts with 55
  if (numberInString[0] === '5' && numberInString[1] === '5') {
    return res.status(400).json({
      message: 'The number must not have "55" on start.',
    })
  } 
  //if dont start with 11
  else if (numberInString[0] !== '1' && numberInString[1] !== '1') {
    return res.status(400).json({
      message: 'The number must start with "11".',
    })
  }

  const formattedNumber = `55${number}@c.us`
  return formattedNumber;
}

module.exports = {
  formatNumber,
}
