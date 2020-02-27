const list = [
  {
    id: '1',
    label: 'carousel',
    name: '走马灯',
    icon: 'icon-carousel',
    type: 'normal',
    previewComponent: 'Carousel',
    settingComponent: 'CarouselSetting',
    setting: {
      height: '200',
      list: [
        {
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
    settingComponent: '',
    setting: {
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
    setting: {
      list: [
        {
          icon: '',
          text: ''
        }
      ]
    }
  }
];

export default list;