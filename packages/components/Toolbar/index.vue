<template>
  <div class="bpmn-toolbar">
    <div class="bpmn-toolbar-left">
      <el-button-group>
        <bpmn-import />
        <bpmn-exports />
        <bpmn-previews />
      </el-button-group>
      <!-- <bpmn-aligns /> -->
      <bpmn-scales />
      <bpmn-commands />
      <bpmn-externals />
    </div>

    <div class="bpmn-toolbar-right">
      <bpmn-save />
      <bpmn-arrange />
    </div>
  </div>
</template>

<script>
import BpmnImport from "./tools/Import";
import BpmnExports from "./tools/Exports";
import BpmnPreviews from "./tools/Previews";
// import BpmnAligns from "./tools/Aligns";
import BpmnScales from "./tools/Scales";
import BpmnCommands from "./tools/Commands";
import BpmnExternals from "./tools/Externals";
import BpmnSave from "./tools/Save.vue";
import BpmnArrange from "./tools/Arrange";
export default {
  name: "BpmnToolbar",
  // BpmnAligns,
  components: { BpmnExternals, BpmnCommands, BpmnScales, BpmnPreviews, BpmnExports, BpmnImport, BpmnSave, BpmnArrange }
};
</script>

<style lang="scss" scoped>
.bpmn-toolbar {
  padding-right: 480px;
  display: flex;
  justify-content: space-between;

  .bpmn-toolbar-left {
    > div[class^="el-button-group"] + div[class^="el-button-group"] {
      margin-left: 16px;
    }
  }
}
</style>
