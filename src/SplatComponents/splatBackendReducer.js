import {
  startProcess,
  getCorrelationId,
  updateProcess,
  executeAction,
} from "../lib/splatComms";

export const logger = (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  return result;
};

// note that the component might no longer be mounted when this callback is fired...
// see https://github.com/rauldeheer/use-async-effect
export const updateState = (
  next,
  setLocalState,
  source,
  tewsCallback = () => {}
) => (msg) => {
  console.log(`from ${source} subscription: `, msg);
  if (msg.type === "TypeEventWithState") {
    setLocalState({
      lastKnownEventId: msg.lastKnownEventId,
      instanceUri: msg.event.origin,
    });
    tewsCallback(msg);
    next({ type: "set-process-state", state: msg.state });
  }
};

export const splatBackendReducer = (
  next,
  localState,
  setLocalState,
  setProcessType
) => {
  return (action) => {
    console.log("updateBackend", action, localState);
    switch (action.type) {
      case "start-process":
        const startCorrelationId = getCorrelationId();
        startProcess(action.name, startCorrelationId).subscribe(
          updateState(next, setLocalState, "startProcess", (msg) =>
            setProcessType({ name: action.name, typeData: msg.typeData })
          )
        );
        return;
      case "invoke-action":
        const actionCorrelationId = getCorrelationId();
        executeAction(
          localState.instanceUri,
          action.name,
          actionCorrelationId
        ).subscribe(updateState(next, setLocalState, "executeAction"));
        break;
      case "update":
        const correlationId = getCorrelationId();
        updateProcess(
          localState.instanceUri,
          action.path,
          action.value,
          localState.lastKnownEventId,
          correlationId
        ).subscribe(updateState(next, setLocalState, "updateProcess"));
        break;
      default:
        break;
    }
    // optimistically update local process state,
    // in the hope that the server will later agree
    // (and if not, it will overwrite with the correct state)
    return next(action);
  };
};
