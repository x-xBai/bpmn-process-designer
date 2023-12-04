export const defaultSettings = {
  processId: `Process_${new Date().getTime()}`,
  processName: `业务流程`,
  processEngine: "activiti", // 流程引擎
  // processEngine: "camunda",
  paletteMode: "enhancement",
  penalMode: "custom",
  contextPadMode: "enhancement",
  rendererMode: "rewrite",
  bg: "grid-image",
  toolbar: true,
  useMinimap: true,
  useLint: false, // 流程校验
  useMock: true,
  contextmenu: true,
  customContextmenu: true,
  otherModule: true,
  templateChooser: true,
  customTheme: {}
};
