import { createMachine, assign } from 'xstate';

export const patientFlow = createMachine({
  id: 'patientFlow',
  initial: 'patientInfoReceived',
  context: {
    patients: [{id: 1, name: 'John Doe'}], 
    nurses: [{id: 1, name: 'Nurse Alex'}],
    assignedNurseId: null,
    assignedTasks: [],
    completedTasks: []
  },
  states: {
    patientInfoReceived: {
      on: {
        ASSIGN_TASKS: {
          target: 'tasksAssigned',
          actions: assign({
            assignedNurseId: (_, event) => event.nurseId,
            assignedTasks: (_, event) => event.tasks  
          })
        }
      }
    },
    tasksAssigned: {
      on: {
        RECEIVE_PATIENT_INFO: 'patientInfoReceivedByNurse',
        RECEIVE_IN_HOLDING_AREA: 'patientInHoldingArea'
      }
    },
    patientInfoReceivedByNurse: {
      on: {
        TRIGGER_TASKS: 'tasksTriggered' 
      }
    },
    patientInHoldingArea: {
      on: {
        TRIGGER_TASKS: 'tasksTriggered'
      }
    },
    tasksTriggered: {
      on: {
        REQUEST_EMERGENCY: 'emergencySupportRequested',
        FINISH_TASK: {
          target: 'tasksFinished',
          actions: assign({
            completedTasks: (context, event) => [
              ...context.completedTasks,
              {
                nurseId: event.nurseId,
                description: event.description
              }
            ]  
          })
        }
      }
    },
    emergencySupportRequested: {
      // handle emergency
    },
    tasksFinished: {
        type: 'final' // tasksFinished is now a final state
      },
  }
});