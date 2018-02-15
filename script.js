const transactions = [
  "213bd56f96a4757db0799814dc65d7e3c55e1ce662bd9f8bb5d3ee7dd6ca9117",
  "06884a52ef7dbf9f4a468c216c034f22e3085200a1738ca6024958cc435d8b8f",
];

const log = (message) => {
  const element = document.createElement("p");
  element.textContent = message;
  document.body.appendChild(element);
};

const fetchNext = (message) => {
  if (transactions.length) {
    fetchTransaction(transactions.shift());
  }
};

const decodeHex = (hex) => {
  let decoded = "";

  for (let i = 0; i < hex.length; i += 2) {
    decoded += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }

  return decoded;
};

const fetchTransaction = (txid) => {
  log(`Fetching transaction ${txid}`);

  const url = `https://blockchain.info/rawtx/${txid}?cors=true`
  log(`GET ${url}`);

  fetch(url).then((response) => {
    response.json().then((transaction) => {
      const hex = transaction.out[0].script;
      const data = decodeHex(hex).substr(2);

      log(`OP_RETURN "${data}"`);
      fetchNext();
    });
  });
};

fetchNext();
