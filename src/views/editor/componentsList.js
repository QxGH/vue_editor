const list = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
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
    id: '6',
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