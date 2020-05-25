import bent from "bent";
import { v4 as uuid } from "uuid";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

const clientId = uuid();
const tenantId = "eda0ea26-6167-4cdb-9db4-1394d7fa2dbd";
const subsystem = "contract";
const frontendSubsystem = "portal";
const host = "http://localhost:8000";
const correlationBase = clientId.substring(0, 8);

const correlationFactory = () => {
  var messageId = 1;
  return () => correlationBase + ":" + messageId++;
};
export const getCorrelationId = correlationFactory();

export const startProcess = (processName, correlationId) => {
  const startProcess = {
    type: `spl://${subsystem}/${tenantId}/${processName}`,
  };
  return sendCommand(subsystem, "start-process", startProcess, correlationId);
};

export const sendCommand = (subsystem, commandName, payload, correlationId) => {
  console.log(commandName);

  const request = bent(
    "POST",
    `${host}/${subsystem}/${tenantId}/command/${commandName}`,
    "string",
    202
  );

  request(
    `?clientId=${clientId}&correlationId=${correlationId}`,
    payload
  );
  return messageSubject.pipe(
    filter((message) => message.event.initiator.correlationId === correlationId)
  );
};

const messageSubject = new Subject();

export async function getMessages(last, publish) {
  console.log("last: " + last);
  const request = bent(
    "GET",
    `${host}/${frontendSubsystem}/${tenantId}/messages`,
    "json",
    200
  );
  var lastReceived = await request(`?clientId=${clientId}&last=${last}`).then(
    (response) => {
      response.messages.forEach(message => {
        messageSubject.next(message);
      });
      return response.lastSequenceNumber;
    },
    (err) => {
      if (err.statusCode !== 503) {
        console.info(JSON.stringify(err));
      }
      return last;
    }
  );
  setTimeout(getMessages, 10, lastReceived, publish);
}

export const initSplatComms = () => {
  getMessages(0, (m) => console.log(m));
  sendCommand(frontendSubsystem, "hello-server", {}, getCorrelationId());
};

export default {
  initSplatComms,
  startProcess,
  getMessages,
  getCorrelationId,
};
