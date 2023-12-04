<template>
  <div>
    <el-button @click="handleSave(1)" type="primary"> 保存文件 </el-button>
    <el-button @click="handleSave(2)" type="primary"> 部署文件 </el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { downloadFile, setEncoded } from "@utils/files";
import { getActive } from "@packages/bpmn-utils/BpmnDesignerUtils";

export default {
  name: "BpmnSave",
  computed: {
    ...mapGetters(["getModeler"])
  },
  data() {
    return {};
  },
  methods: {
    async downloadProcess(type, name = "diagram") {
      try {
        if (!this.getModeler) return this.$message.error("流程图引擎初始化失败");
        const modeler = this.getModeler;

        const [xmlData, svgData] = await Promise.all([modeler.saveXML(), modeler.saveSVG()]);

        const err = xmlData.err || svgData.err;
        // 读取异常时抛出异常
        if (err) {
          console.error(`[Process Designer Warn ]: ${err.message || err}`);
        }

        const element = !!getActive() && getActive();

        const bpmnname = element?.businessObject?.name;

        var img = document.createElement("img");

        img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData.svg)));

        var canvas = document.createElement("canvas");

        var ctx = canvas.getContext("2d");

        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // console.log(canvas.toDataURL('image/jpeg'));//得到jpg格式的base64串
          const pngdata = canvas.toDataURL("image/png");

          const postMessageData = {
            xml: xmlData.xml,
            png: pngdata,
            bpmnname: bpmnname,
            type
          };
          console.table([postMessageData]);

          window.parent.postMessage(postMessageData, "*");
        };
      } catch (e) {
        console.error(`[Process Designer Warn ]: ${e.message || e}`);
      }
    },
    handleSave(type) {
      this.downloadProcess(type);
    }
  }
};
</script>
