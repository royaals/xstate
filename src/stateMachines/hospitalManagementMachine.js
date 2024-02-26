import { Machine } from "xstate";

const hospitalManagementMachine = Machine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAsD2sAOBLALgQwBsA6DPHLMAOxwElKAzVAJTAGMwsA3SAYgEEAygJoBxAHIB9ACqCA0gG0ADAF1EoDOlxZUlNSAAeiALQBOAMwA2IgEZbJiwA4A7ACYT1ky7MAaEAE9EawAWK0UnaxcXRWdFRRMAVjMnAF9k3zRMXEIifFgAaz5YWCwoSkgpVDEAVwAnWDgeGjEAYSYAUUE2iWaAeQBVMSk2piVVJBANYvIdPUMEI3inIKIzB0UPILD4zydfAIRg0PDI6KdYhKTU9PRsfGJKWvqABTIKambUKuowGrpWGrAeHqEB47WabRoADUuk8+FIaG1BhImgAxHqjPSTLQzcZzIy2RREJwmExBbYOCxxBwuJwOPaBEJEMIRKIxOKJFJpEAZW7ZB51MAsdhcOAvchUWgMVCgtrgqEwuEIwYY8ZY6a6XGIMxmeJEBxBWwWEnUkwOU27fwMo4s07nDlXbk3LL3R6CtgcbiwMVvSUACVQBAgWEoUD4ALwPCkTFEImG0jkKvUmnVs0QDmsZhW1niGZ1Zhc2YS9IOjOZJzZF0510ydyI-PqUiBeVgKNQNW9EqkNRKMABIPaAEU+m0BFIJAI+k8nj0mFJExNk9oNaA5hFVjZ4g4t+mMy54mFixmTEQLPELG5FF5wq4HA6ec6667G-kW22O9Quz2frwUU0aAJfXjAQFBUTFFxxFdAi8BwN23Hd833C19g8GDgk3JZFDMIIzgcMw7ydWt6zAZ88lbdtXglFFgywWBkF4ABZHpoWkHoJB6J5hkVHoxHnNUl1TA5ryIeJtnMfdrDNexD1NGwyWcTYsJwvCHUoVAIDgPR7zuMCpn4zV5lsJxMwpMkllJMxsyCYt4hcFZtTMewLCCExXE3IJ8JrbJSHFag6EYIUPUgHTsWXAxjFsPc9ScxZnKCCz4isy0SysLwXAsYkPHMOSPN5YhcgKIoSjKCAKmqAV4FVcDQrxWlCT3PdPGzOJ0viQ9GVS9L3BJLCYpyh8iPfHAPi+HAfj+cNgWClN9KMSxjxzRRNkvBzSSMnwksOIgOoy7rTPcrktL5V0ApFL0KN8qUpr0yCDlsYT7CSTdEkwnMkKtLb806zKeqWPrCOO91TsGuh-UDYNQ3DK6ILChBXq2ykgiCGlLx3RLkPaz6dqyzc-qOgUSNfcifJwT8oF7ILKt06G5hcqxEfWHUUPWOI2pSzGuux28DoIvH6hYABHKo4BwWA2gAWx+GBKFYPwBCqDANBqHAoeqhksKJLCDWsdZN2iw8HL1awnCWBwzyc1LlOrXLH3xpsyMGqjKBouiIBVgS0MJHUL2iI3wgS6SYLMMJtS8CwHPQlxceIVAMB+V4dCYVBUDFt39I8HUT0URw12wrxFFajaZKDtbQ-D5xI9SZIgA */
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
