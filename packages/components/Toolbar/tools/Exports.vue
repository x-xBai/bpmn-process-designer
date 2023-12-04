<template>
  <el-button v-popover:popover type="primary">
    导出文件
    <el-popover ref="popover" placement="bottom" popper-class="button-popover" trigger="hover">
      <div class="button-list_column">
        <!-- <el-button type="primary" @click="downloadProcessAsBpmn">导出为 Bpmn</el-button> -->
        <el-button type="primary" @click="downloadProcessAsXml">导出为 XML</el-button>
        <el-button type="primary" @click="downloadProcessAsSvg">导出为 PNG</el-button>
      </div>
    </el-popover>
  </el-button>
</template>

<script>
import { downloadFile, setEncoded } from "@utils/files";
import { mapGetters } from "vuex";

export default {
  name: "BpmnExports",
  computed: {
    ...mapGetters(["getModeler"])
  },
  methods: {
    async downloadProcess(type, name = "diagram") {
      try {
        if (!this.getModeler) return this.$message.error("流程图引擎初始化失败");
        const modeler = this.getModeler;
        // 按需要类型创建文件并下载
        if (type === "xml" || type === "bpmn") {
          const { err, xml } = await modeler.saveXML();
          // 读取异常时抛出异常
          if (err) {
            console.error(`[Process Designer Warn ]: ${err.message || err}`);
          }
          const { href, filename } = setEncoded(type.toUpperCase(), name, xml);
          downloadFile(href, filename);
        } else {
          const { err, svg } = await modeler.saveSVG();
          // const { err, svg } = await modeler.savePNG();
          // 读取异常时抛出异常
          if (err) {
            return console.error(err);
          }

          var img = document.createElement("img");

          img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)));

          var canvas = document.createElement("canvas");

          var ctx = canvas.getContext("2d");

          img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // console.log(canvas.toDataURL('image/jpeg'));//得到jpg格式的base64串
            console.log(canvas.toDataURL("image/png")); //得到png格式的base64串
          };
          // const { href, filename } = setEncoded("SVG", name, svg);
          // downloadFile(href, filename);
        }
      } catch (e) {
        console.error(`[Process Designer Warn ]: ${e.message || e}`);
      }
    },
    loadSvg() {
      //先将svg上的跨域图片转成base64显示，去除跨域问题
      var img0 = document.createElement("img");
      img0.crossOrigin = "anonymous";
      img0.src = "https://profile.csdnimg.cn/E/6/D/3_web_xiaolei";
      var canvas0 = document.createElement("canvas");
      var ctx0 = canvas0.getContext("2d");
      img0.onload = function () {
        canvas0.width = 32 * 3;
        canvas0.height = 32 * 3;
        ctx0.drawImage(img0, 0, 0, 32 * 3, 32 * 3);
        //将跨域图片的base64赋值给svg对应图片
        document.getElementById("svg-img").setAttribute("xlink:href", canvas0.toDataURL());

        //重新绘制svg对应的canvas
        var svg = document.getElementById("svg").outerHTML;
        console.log(svg);
        var img = document.createElement("img");
        img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)));
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // console.log(canvas.toDataURL('image/jpeg'));//得到jpg格式的base64串
          console.log(canvas.toDataURL("image/png")); //得到png格式的base64串
        };
      };
    },

    downloadProcessAsBpmn() {
      this.downloadProcess("bpmn");
    },
    downloadProcessAsXml() {
      this.downloadProcess("xml");
    },
    downloadProcessAsSvg() {
      this.downloadProcess("svg");
    }
  }
};
</script>
