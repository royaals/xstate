import { useMachine } from "@xstate/react";
import { patientFlow } from "./patientFlow";

function App() {
  const [state, send] = useMachine(patientFlow);

  // render UI based on state
  return (
    <div>
      {state.matches("patientInfoReceived") && (
        <button
          onClick={() =>
            send(
              { type: "ASSIGN_TASKS" },
              {
                nurseId: 1,
                tasks: ["Draw blood", "Take vitals"],
              }
            )
          }
        >
          Assign Tasks
        </button>
      )}

      {state.matches("tasksTriggered") && (
        <button
          onClick={() =>
            send(
              { type: "FINISH_TASK" },
              {
                nurseId: 1,
                description: "Drew blood",
              }
            )
          }
        >
          Mark Task Complete
        </button>
      )}
      {state.matches("tasksFinished") && <p>All tasks complete!</p>}
    </div>
  );
}

export default App;
