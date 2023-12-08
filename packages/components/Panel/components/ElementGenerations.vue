<template>
  <el-collapse-item name="base-info">
    <template #title>
      <collapse-title title="常规信息">
        <lucide-icon name="Info" />
      </collapse-title>
    </template>

    <edit-item label="ID">
      <el-input disabled v-model="elementId" maxlength="32" @change="updateElementId" />
    </edit-item>

    <edit-item label="Name">
      <el-input v-model="elementName" maxlength="20" @change="updateElementName" />
    </edit-item>

    <template v-if="isUserTask">
      <edit-item label="assignee">
        <el-input v-model="elementAssignee" maxlength="20" @change="updateElementAssignee" />
      </edit-item>

      <!-- <edit-item label="说明">
        <el-input v-model="elementDoc" type="textarea" @change="updateElementDoc" />
      </edit-item> -->
    </template>

    <template v-if="isProcess">
      <!-- <edit-item key="version" label="Version">
        <el-input v-model="elementVersion" maxlength="20" @change="updateElementVersion" />
      </edit-item> -->

      <!-- <edit-item key="executable" label="Executable">
        <el-switch v-model="elementExecutable" @change="updateElementExecutable" />
      </edit-item> -->
    </template>
  </el-collapse-item>
</template>

<script>
import { catchError } from "@utils/printCatch";
import { getNameValue, setNameValue, getAssigneeValue, setAssigneeValue } from "@packages/bo-utils/nameUtil";
import {
  getProcessExecutable,
  getProcessVersionTag,
  setProcessExecutable,
  setProcessVersionTag
} from "@packages/bo-utils/processUtil";
import { setIdValue } from "@packages/bo-utils/idUtil";
import EventEmitter from "@utils/EventEmitter";
import { getActive } from "@packages/bpmn-utils/BpmnDesignerUtils";

import { getDocumentValue, setDocumentValue } from "@packages/bo-utils/documentationUtil";

export default {
  name: "ElementGenerations",
  data() {
    return {
      elementId: "",
      elementName: "",
      elementVersion: "",
      elementExecutable: true,
      isProcess: false,
      isUserTask: false,
      elementAssignee: "",
      elementDoc: ""
    };
  },

  mounted() {
    this.reloadGenerationData();
    EventEmitter.on("element-update", this.reloadGenerationData);
  },
  methods: {
    reloadGenerationData() {
      this.isProcess = !!getActive() && getActive().type === "bpmn:Process";
      // 判断是否是 用户任务
      this.isUserTask = !!getActive() && getActive().type === "bpmn:UserTask";
      // 获取 assignee
      this.elementAssignee = getAssigneeValue(getActive()) || "";

      // 说明
      this.elementDoc = getDocumentValue(getActive()) || "";

      console.log("getActive()===", getActive());
      this.elementId = getActive().id;
      this.elementName = getNameValue(getActive()) || "";
      if (this.isProcess) {
        this.elementExecutable = getProcessExecutable(getActive());
        this.elementVersion = getProcessVersionTag(getActive()) || "";
      }
    },
    updateElementName(value) {
      setNameValue(getActive(), value);
    },
    // 更新 assignee
    updateElementAssignee(value) {
      setAssigneeValue(getActive(), value);
    },
    updateElementId(value) {
      setIdValue(getActive(), value);
    },
    updateElementVersion(value) {
      const reg = /((\d|([1-9](\d*))).){2}(\d|([1-9](\d*)))/;
      if (reg.test(value)) {
        setProcessVersionTag(getActive(), value);
      } else {
        catchError("版本号必须符合语义化版本2.0.0 要点");
      }
    },
    updateElementExecutable(value) {
      setProcessExecutable(getActive(), value);
    },
    updateElementDoc(value) {
      setDocumentValue(getActive(), value);
    }
  }
};
</script>
