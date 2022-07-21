
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }


const requestOptionDel = (itemid) => {
  return {
  method : 'DELETE', 
  headers: {
    Accept: '*/*', 
    'Content-Type': 'application/json'
  }, 
  body: JSON.stringify({
    UniqueId: itemid
  })}
};



  module.exports = {
    formatDate,
    padTo2Digits,
    requestOptionDel
  }