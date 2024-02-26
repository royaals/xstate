import React, { useState, useEffect } from "react";
import { createMachine } from "xstate";

const hospitalManagementMachine = createMachine({
  id: "hospital",
  initial: "patientInfoReceived",
  states: {
    patientInfoReceived: {
      on: {
        ASSIGN_TASK: "taskAssignedToNurses",
      },
    },
    taskAssignedToNurses: {
      on: {
        INCREASE_COUNTER: "nursePatientCounterIncreased",
      },
    },
    nursePatientCounterIncreased: {
      on: {
        RECEIVE_PATIENT_INFO: "nurseReceivesPatientInfo",
      },
    },
    nurseReceivesPatientInfo: {
      on: {
        RECEIVE_PATIENT: "nurseReceivesPatientInHoldingArea",
      },
    },
    nurseReceivesPatientInHoldingArea: {
      on: {
        TRIGGER_TASK: "nurseTasksForPatientTriggered",
      },
    },
    nurseTasksForPatientTriggered: {
      on: {
        REQUEST_SUPPORT: "nurseRequestsEmergencySupport",
        FINISH_TASK: "nurseTaskForPatientFinished",
      },
    },
    nurseRequestsEmergencySupport: {
      // Define actions or transitions here
    },
    nurseTaskForPatientFinished: {
      on: {
        MOVE_TO_OPERATION: "operationRoom",
      },
    },
    operationRoom: {
      // Define actions or transitions here
    },
  },
});


function App() {
  const [state, setState] = useState(hospitalManagementMachine.state);
  const [patient, setPatient] = useState({ id: "1", name: "John Doe" });
  const [nurse, setNurse] = useState({ id: "1", name: "Jane Doe" });

  useEffect(() => {
    hospitalManagementMachine.onTransition((nextState) => {
      setState(nextState);
    });
  }, []);

  const assignTask = () => {
    hospitalManagementMachine.send("ASSIGN_TASK", { nurse });
  };

  const finishTask = () => {
    hospitalManagementMachine.send("FINISH_TASK", { nurse });
  };

  return (
    <div>
      <h2>Patient Info</h2>
      <p>ID: {patient.id}</p>
      <p>Name: {patient.name}</p>

      <h2>Nurse Info</h2>
      <p>ID: {nurse.id}</p>
      <p>Name: {nurse.name}</p>

      <h2>Current State: {state ? state.value : 'Loading...'}</h2>

      <button onClick={assignTask}>Assign Task</button>
      <button onClick={finishTask}>Finish Task</button>
    </div>
  );
}

export default App;
