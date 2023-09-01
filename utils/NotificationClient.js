const Client = require("node-rest-client").Client;

const client = new Client();

exports.client = client;
const sendMail = (ticketId, subject, content, emailIds, requester) => {
  var reqBody = {
    subject: subject,
    content: content,
    receipientEmails: emailIds,
    requester: requester,
    ticketId: ticketId,
  };

  var args = {
    data: reqBody,
    headers: {
      "Content-Type": "application/json",
    },
  };

  client.post(
    "http://localhost:7777/notifiServ/api/v1/notifications",
    args,
    function (data, response) {
      console.log("Request sent");
      console.log(data);
    }
  );
};

module.exports = sendMail;
