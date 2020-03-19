<template>
  <div class="goods-list-setting">
    <el-divider>选择商品</el-divider>
    <el-radio-group v-model="setting.chooseMode" @change="chooseModeChange">
      <el-radio-button label="auto">自动选择</el-radio-button>
      <el-radio-button label="hand">手动选择</el-radio-button>
    </el-radio-group>
    <template v-if="setting.chooseMode == 'auto'">
      <el-divider>商品分组</el-divider>
      <el-select v-model="setting.group" multiple placeholder="请选择分组" @change="groupChange">
        <el-option
          v-for="item in goodsGroupList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-divider>商品排序</el-divider>
      <el-select v-model="setting.sort" placeholder="请选择">
        <el-option label="按上架时间" value="createTime"></el-option>
        <el-option label="按价格降序" value="priceDescending"></el-option>
        <el-option label="按价格升序" value="priceAscending"></el-option>
      </el-select>
      <el-divider>商品数量</el-divider>
      <el-radio-group v-model="setting.numberType" @change="numberTypeChange">
        <el-radio label="all">全部</el-radio>
        <el-radio label="custom">自定义</el-radio>
      </el-radio-group>
      <template v-if="setting.numberType == 'custom'">
        <div style="margin: 10px 0;">
          <el-input-number
            v-model="setting.number"
            @change="numberChange"
            :min="1"
            :max="100"
            label="商品数量"
          ></el-input-number>
        </div>
      </template>
    </template>
    <template v-else>
      <div style="margin: 10px 0;">
        <el-button type="primary" plain @click="selectorGoodsHandle">选择商品</el-button>
      </div>
      <span>
        已选择：{{setting.handList | handListLengthFilter}}个商品
      </span>
    </template>
    <GoodsSelector
      v-if="showGoodsSelector"
      :goods="currentGoods"
      @submitGoods="submitGoodsHandle"
    ></GoodsSelector>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";
import { mapState, mapMutations } from "vuex";

import GoodsSelector from "../../common/goods_selector";

export default {
  name: "goodsListSetting",
  data() {
    return {
      showGoodsSelector: false, // 是否显示图片选择器
      currentGoods: "",
      goodsGroupList: [],
      goodsList: {}
    };
  },
  components: {
    GoodsSelector
  },
  props: {
    setting: {
      type: Object,
      default() {
        return {
          style: "default", // 样式
          chooseMode: "auto", // 选择方式 hand / auto
          group: [], // 分组
          sort: "createTime", // 排序 createTime - 按上架时间排序；  priceDescending - 按价格降序； priceAscending - 按价格升序
          numberType: "all", // 数量类型 all- 全部； custom - 自定义
          number: 1,
          autoList: [
            {
              id: 'default-'+uuidV4(),
              picture: "https://qxtodo.com/editor/animation_wallpaper.jpg",
              name: "商品名称",
              price: 8.88,
              type: "商品类型"
            }
          ],
          handList: [
            {
              id: 'default-'+uuidV4(),
              picture: "https://qxtodo.com/editor/animation_wallpaper.jpg",
              name: "商品名称",
              price: 8.88,
              type: "商品类型"
            }
          ]
        };
      }
    }
  },
  computed: {
    ...mapState(["editorList", "editorIndex"])
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    ...mapMutations(["CHANGE_EDITOR_LIST"]),
    getGoodsList() {
      this.$api.editor.getGoodsList().then(res => {
        if (res.data.code === 0) {
          let goodsList = res.data.data.goodsList;
          this.goodsList = goodsList;
          let goodsGroupList = [];
          for (let item in goodsList) {
            let obj = {
              label: item,
              value: item
            };
            goodsGroupList.push(obj);
          }
          this.goodsGroupList = goodsGroupList;
        } else {
          this.$message.warning("商品列表获取失败！");
        }
      });
    },
    chooseModeChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      editorList[editorIndex].setting.chooseMode = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    groupChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      // let list = editorList[editorIndex].setting.list;
      let newList = [];
      for (let item of val) {
        newList = newList.concat(this.goodsList[item]);
      }
      editorList[editorIndex].setting.autoList = newList;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    numberTypeChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      editorList[editorIndex].setting.numberType = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    numberChange(val) {
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      editorList[editorIndex].setting.number = val;
      this.CHANGE_EDITOR_LIST(editorList);
      this.tellParent();
    },
    selectorGoodsHandle(id) {
      console.log(id);
      let editorList = this.editorList;
      let editorIndex = this.editorIndex;
      this.currentGoods = editorList[editorIndex].setting.handList;
      this.showGoodsSelector = true;
    },
    submitGoodsHandle(val) {
      if (val.length > 0) {
        let editorList = this.editorList;
        let editorIndex = this.editorIndex;

        let handList = editorList[editorIndex].setting.handList;

        editorList[editorIndex].setting.handList = val;
        this.CHANGE_EDITOR_LIST(editorList);
        this.tellParent();
      };
      this.showGoodsSelector = false; // 显示图片选择器
    },
    tellParent() {
      this.$emit("refreshState", "");
    }
  },
  filters: {
    handListLengthFilter(val) {
      console.log('handListLengthFilter')
      let num = 0;
      if (val.length == 1 && val[0].id.indexOf("default") != "-1") {
        num = 0;
      } else {
        num = val.length;
      };
      return num
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>