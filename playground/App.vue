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
      function ({ data }) {
        console.log("子项目====", data);

        if (data.type == "sendXml") {
          getModeler() && getModeler().importXML(data.xmlString);
        }
      },
      false
    );

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
