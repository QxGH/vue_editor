<template>
  <div class="page-manage-move">
    <el-dialog title="Move" :visible.sync="dialogVisible" width="500px">
      <div class="dialog-body">
        <el-select v-model="moveID" placeholder="请选择">
          <el-option
            v-for="item in editorPageData"
            :key="item.id"
            :label="item.setting.name"
            :value="item.id"
            :disabled="item.id == moveParams.parentID"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "pageManageMove",
  data() {
    return {
      dialogVisible: true,
      moveID: ''
    };
  },
  props: ['moveParams'],
  computed: {
    ...mapState(['editorPageData'])
  },
  created(){
    console.log(this.moveParams)
    console.log(this.editorPageData)
    this.moveID = this.moveParams.parentID;
  },
  methods: {
    close() {
      let obj = {
        oldParams: this.moveParams,
        newID: this.moveID
      }
      this.$emit('moveClose', obj)
    }
  }
};
</script>

<style>
@import url("../style/index.min.css");
</style>