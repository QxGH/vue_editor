
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
      width: 100,
      height: 40,
      style: 'primary',
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