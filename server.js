// server.js
import http from "http";
import siwe from "siwe";

let domain = process.env.REACT_APP_DOMAIN || "localhost";
let origin = process.env.REACT_APP_ORIGIN
  ? `${process.env.REACT_APP_ORIGIN}/login`
  : "https://localhost/login";

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});
server.listen(port, domain, () => {
  console.log(`Server running at http://${domain}:${port}/`);
});

const createSiweMessage = (address, statement) => {
  const siweMessage = new siwe.SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
  });
  return siweMessage.prepareMessage();
};

console.log(
  createSiweMessage(
    "0x6Ee9894c677EFa1c56392e5E7533DE76004C8D94",
    "This is a test statement."
  )
);
