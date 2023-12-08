<template>
  <div id="app">
    <bpmn-toolbar v-if="getEditorConfig.toolbar" />
    <div class="main-content">
      <bpmn-designer :xml.sync="xmlString" />
      <bpmn-panel v-if="getEditorConfig.penalMode === 'custom'" />
      <div v-else class="camunda-panel" id="camunda-panel"></div>
    </div>

    <!-- <bpmn-settings /> -->
    <bpmn-context-menu />
  </div>
</template>

<script>
import BpmnDesigner from "../packages/components/Designer";
// import BpmnSettings from "../packages/components/Settings";
import { mapGetters } from "vuex";
import BpmnToolbar from "../packages/components/Toolbar";
import BpmnContextMenu from "@packages/components/ContextMenu/ContextMenu";
import BpmnPanel from "@packages/components/Panel";

import { getModeler } from "@packages/bpmn-utils/BpmnDesignerUtils";

export default {
  name: "App",
  //  BpmnSettings,
  components: { BpmnPanel, BpmnContextMenu, BpmnToolbar, BpmnDesigner },
  data() {
    return {
      xmlString: undefined
    };
  },
  computed: {
    ...mapGetters(["getEditorConfig"])
  },
  mounted() {
    window.addEventListener(
      "message",
      ({ data }) => {
        // console.log("子项目====", data);

        if (data.type == "sendXml") {
          getModeler() && getModeler().importXML(data.xmlString);

          this.$nextTick(() => {
            getModeler().get("canvas").zoom("fit-viewport", "auto");
          });
        }
      },
      false
    );
    // setTimeout(() => {
    //   this.xmlString = '<?xml version="1.0" encoding="UTF-8"?><bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" id="Definitions_0001" targetNamespace="http://bpmn.io/schema/bpmn"><bpmn:process id="Process_1702012509001" name="业务流程_1702012509001" isExecutable="true"><bpmn:startEvent id="Event_0r20vu1" name="开始"><bpmn:outgoing>Flow_0io67kf</bpmn:outgoing></bpmn:startEvent><bpmn:userTask id="Activity_1qacst8" name="节点1" activiti:assignee="${assignee1}"><bpmn:incoming>Flow_0io67kf</bpmn:incoming><bpmn:outgoing>Flow_1mii367</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_0io67kf" sourceRef="Event_0r20vu1" targetRef="Activity_1qacst8" /><bpmn:userTask id="Activity_0rt8kux" name="节点2" activiti:assignee="${assignee2}"><bpmn:incoming>Flow_1mii367</bpmn:incoming><bpmn:outgoing>Flow_1rpgg26</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_1mii367" name="通过" sourceRef="Activity_1qacst8" targetRef="Activity_0rt8kux" /><bpmn:endEvent id="Event_131kt7b" name="结束"><bpmn:incoming>Flow_181ght2</bpmn:incoming></bpmn:endEvent><bpmn:userTask id="Activity_11c7b4a" name="节点3" activiti:assignee="${assignee3}"><bpmn:incoming>Flow_1rpgg26</bpmn:incoming><bpmn:outgoing>Flow_181ght2</bpmn:outgoing></bpmn:userTask><bpmn:sequenceFlow id="Flow_1rpgg26" name="通过" sourceRef="Activity_0rt8kux" targetRef="Activity_11c7b4a" /><bpmn:sequenceFlow id="Flow_181ght2" sourceRef="Activity_11c7b4a" targetRef="Event_131kt7b" /></bpmn:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1702012509001"><bpmndi:BPMNShape id="Event_0r20vu1_di" bpmnElement="Event_0r20vu1"><dc:Bounds x="242" y="212" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="249" y="255" width="23" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_1qacst8_di" bpmnElement="Activity_1qacst8"><dc:Bounds x="378" y="170" width="120" height="120" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_0rt8kux_di" bpmnElement="Activity_0rt8kux"><dc:Bounds x="598" y="170" width="120" height="120" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNShape id="Event_131kt7b_di" bpmnElement="Event_131kt7b"><dc:Bounds x="1182" y="212" width="36" height="36" /><bpmndi:BPMNLabel><dc:Bounds x="1189" y="255" width="23" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNShape><bpmndi:BPMNShape id="Activity_11c7b4a_di" bpmnElement="Activity_11c7b4a"><dc:Bounds x="818" y="170" width="120" height="120" /><bpmndi:BPMNLabel /></bpmndi:BPMNShape><bpmndi:BPMNEdge id="Flow_0io67kf_di" bpmnElement="Flow_0io67kf"><di:waypoint x="278" y="230" /><di:waypoint x="378" y="230" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1mii367_di" bpmnElement="Flow_1mii367"><di:waypoint x="498" y="230" /><di:waypoint x="598" y="230" /><bpmndi:BPMNLabel><dc:Bounds x="537" y="212" width="23" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_1rpgg26_di" bpmnElement="Flow_1rpgg26"><di:waypoint x="718" y="230" /><di:waypoint x="818" y="230" /><bpmndi:BPMNLabel><dc:Bounds x="757" y="212" width="23" height="14" /></bpmndi:BPMNLabel></bpmndi:BPMNEdge><bpmndi:BPMNEdge id="Flow_181ght2_di" bpmnElement="Flow_181ght2"><di:waypoint x="938" y="230" /><di:waypoint x="1182" y="230" /></bpmndi:BPMNEdge></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn:definitions>'

    //   getModeler() && getModeler().importXML(this.xmlString);

    // }, 2000);
    this.init();
    document.body.addEventListener("contextmenu", function (ev) {
      ev.preventDefault();
    });
  },
  methods: {
    init() {}
  }
};
</script>

<style lang="scss">
a.bjs-powered-by {
  // 去logo
  display: none;
}
</style>
