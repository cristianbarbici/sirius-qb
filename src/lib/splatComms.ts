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

export const startProcess = (processName: string, correlationId: string) => {
  const startProcess = {
    type: `spl://${subsystem}/${tenantId}/${processName}`,
  };
  return sendCommand(subsystem, "start-process", startProcess, correlationId);
};

export const updateProcess = (
  instanceUri: string,
  propertyPath: string,
  value: obj,
  currentEventId: string,
  correlationId: string
) => {
  const updateProcess = {
    action: "update",
    currentEventId,
    instance: instanceUri,
    property: propertyPath,
    value: value,
  };
  return sendCommand(subsystem, "update-process", updateProcess, correlationId);
};

type obj = {
  [key: string]: any;
  [key: number]: any;
};

type eventMessage = {event: { initiator: {correlationId: string}}}
export const sendCommand = (
  subsystem: string,
  commandName: string,
  payload: obj,
  correlationId: string
) => {
  console.log(commandName);

  const request = bent(
    "POST",
    `${host}/${subsystem}/${tenantId}/command/${commandName}`,
    "string",
    202
  );

  request(`?clientId=${clientId}&correlationId=${correlationId}`, payload);
  return messageSubject.pipe(
    filter(
      (message) =>
        message.event.initiator.correlationId === correlationId
    )
  );
};

const messageSubject = new Subject<eventMessage>();
type messageResponse = {lastSequenceNumber: number, messages: eventMessage[] };

export async function getMessages(last: number) {
  console.log("polling for messages, last seen: " + last);
  const request = bent(
    "GET",
    `${host}/${frontendSubsystem}/${tenantId}/messages`,
    "json",
    200
  );
  var lastError = false;
  var lastReceived = await request(`?clientId=${clientId}&last=${last}`).then(
    (r) => {
      const response = r as messageResponse;
      lastError = false;
      response.messages.forEach((message: eventMessage) => {
        messageSubject.next(message);
      });
      return response.lastSequenceNumber;
    },
    (err) => {
      lastError = true;
      if (err.statusCode !== 503) {
        console.error(JSON.stringify(err));
      } else {
        lastError = false;
      }
      return last;
    }
  );
  setTimeout(getMessages, lastError ? 1000 * 30 : 10, lastReceived);
}

export const initSplatComms = () => {
  getMessages(0);
  sendCommand(frontendSubsystem, "hello-server", {}, getCorrelationId());
};

export default {
  initSplatComms,
  startProcess,
  getMessages,
  getCorrelationId,
};
