
import uuidV4 from "uuid/v4";

const list = [
  {
    id: uuidV4(),
    label: 'carousel',
    name: '走马灯',
    icon: 'icon-carousel',
    type: 'normal',
    previewComponent: 'Carousel',
    settingComponent: 'CarouselSetting',
    version: 1,
    setting: {
      height: '200',
      list: [
        {
          imageID: "default",
          imageUrl: 'https://qxtodo.com/editor/animation_wallpaper.jpg'
        }
      ]
    }
  }, {
    id: uuidV4(),
    label: 'divider',
    name: '分割线',
    icon: 'icon-divider',
    type: 'normal',
    previewComponent: 'Divider',
    settingComponent: 'DividerSetting',
    version: 1,
    setting: {
      color: '#333',
      size: '1'
    }
  }, {
    id: uuidV4(),
    label: 'graphicNav',
    name: '图文导航',
    icon: 'icon-graphicNav',
    type: 'normal',
    previewComponent: 'GraphicNav',
    settingComponent: 'GraphicNavSetting',
    version: 1,
    setting: {
      list: [
        {
          id: uuidV4(),
          imageID: "default",
          imageUrl: 'https://cdn.qinxus.com/animation_gril_banner_2.jpg',
          title: '标题',
          link: {
            id: uuidV4(),
            type: '',
            label: '',
            url: ''
          }
        }
      ]
    }
  }, {
    id: uuidV4(),
    label: 'goodsList',
    name: '商品列表',
    icon: 'icon-goods',
    type: 'normal',
    previewComponent: 'GoodsList',
    settingComponent: 'GoodsListSetting',
    version: 1,
    setting: {
      style: 'default', // 样式
      chooseMode: 'auto', // 选择方式 hand / auto
      group: [],  // 分组
      sort: 'createTime', // 排序 createTime - 按上架时间排序；  priceDescending - 按价格降序； priceAscending - 按价格升序
      numberType: 'all',  // 数量类型 all- 全部； custom - 自定义
      number: 1,
      autoList: [
        {
          id: 'default-'+uuidV4(),
          picture: 'https://qxtodo.com/editor/animation_wallpaper.jpg',
          name: '商品名称',
          price: 8.88,
          type: '商品类型'
        }
      ],
      handList: [
        {
          id: 'default-'+uuidV4(),
          picture: 'https://qxtodo.com/editor/animation_wallpaper.jpg',
          name: '商品名称',
          price: 8.88,
          type: '商品类型'
        }
      ]
    }
  }, {
    id: uuidV4(),
    label: 'freeContainer',
    name: '自由容器',
    type: 'freeContainer',
    icon: 'icon-container',
    previewComponent: 'FreeContainer',
    settingComponent: '',
    version: 1,
    setting: {
      height: '300',
      children: []
    }
  }, {
    id: uuidV4(),
    label: 'freeImage',
    name: '图片',
    type: 'free',
    icon: 'icon-image',
    previewComponent: 'FreeImage',
    settingComponent: 'FreeImageSetting',
    version: 1,
    setting: {
      imageID: 'default',
      imageUrl: 'https://qxtodo.com/editor/animation_wallpaper.jpg',
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      z: 1
    }
  }, {
    id: uuidV4(),
    label: 'freeText',
    name: '文本',
    type: 'free',
    icon: 'icon-text',
    previewComponent: 'FreeText',
    settingComponent: 'FreeTextSetting',
    version: 1,
    setting: {
      text: '文本内容',
      color: '#333333',
      size: '14',
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      z: 1
    }
  }, {
    id: uuidV4(),
    label: 'freeBtn',
    name: '按钮',
    type: 'free',
    icon: 'icon-button-handle',
    previewComponent: 'FreeBtn',
    settingComponent: 'FreeBtnSetting',
    version: 1,
    setting: {
      text: '按钮',
      color: '#ffffff',
      bg: '#409eff',
      size: '14',
      style: 'primary',
      link: {
        id: uuidV4(),
        type: '',
        label: '',
        url: ''
      },
      width: 100,
      height: 40,
      x: 0,
      y: 0,
      z: 1
    }
  }, {
    id: uuidV4(),
    label: 'freeOmnipotent',
    name: '万能热区',
    type: 'free',
    icon: 'icon-omnipotent',
    previewComponent: 'FreeOmnipotent',
    settingComponent: 'FreeOmnipotentSetting',
    version: 1,
    setting: {
      link: {
        id: uuidV4(),
        type: '',
        label: '',
        url: ''
      },
      width: 100,
      height: 40,
      x: 0,
      y: 0,
      z: 1
    }
  }, {
    id: uuidV4(),
    label: 'navbar',
    name: '底部导航',
    type: 'navbar',
    icon: 'icon-navbar',
    previewComponent: 'Navbar',
    settingComponent: 'NavbarSetting',
    version: 1,
    setting: {
      list: [
        {
          id: '1',
          icon: 'icon-home',
          text: 'home'
        }
      ]
    }
  }
];

export default list;