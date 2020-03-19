<template>
  <div class="goods-selector">
    <el-dialog title="商品选择器" :visible.sync="dialogVisible" width="800px">
      <div class="link-selector-body">
        <el-table
          ref="goodsTable"
          :data="goodsList"
          tooltip-effect="dark"
          style="width: 100%; margin-bottom: 15px;"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="picture" width="120">
            <template slot-scope="scope">
              <el-image style="width: 80px; height: 60px" :src="scope.row.picture" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="name"></el-table-column>
          <el-table-column prop="type" label="type"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";

export default {
  name: "linkSelector",
  props: ["goods"],
  data() {
    return {
      goodsList: [],
      currentGoods: [],
      currentGoodsRes: [],
      dialogVisible: true
    };
  },
  created() {
    this.getGoodsList();
    this.currentGoods = this.goods;
  },
  mounted() {},
  methods: {
    fillTable() {
      let rows = this.currentGoods;
      if (rows.length > 0) {
        if (rows.length == 1 && rows[0].id.indexOf("default") != "-1") {
          this.$refs.goodsTable.clearSelection();
        } else {
          rows.forEach(row => {
            this.$refs.goodsTable.toggleRowSelection(row);
          });
        }
      } else {
        this.$refs.goodsTable.clearSelection();
      }
    },
    getGoodsList() {
      this.$api.editor.getAllGoodsList().then(res => {
        if (res.data.code === 0) {
          this.goodsList = res.data.data.goodsList;
          this.$nextTick(() => {
            this.fillTable();
          });
        } else {
          this.$message.warning("商品列表获取失败！");
        }
      });
    },
    selectionChange(val) {
      console.log(val);
      this.currentGoodsRes = val;
    },
    close() {
      this.$emit("submitGoods", this.currentGoodsRes);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>