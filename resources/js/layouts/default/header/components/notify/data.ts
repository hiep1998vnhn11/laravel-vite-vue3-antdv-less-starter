export interface ListItem {
  id: string
  avatar: string
  title: string
  datetime: string
  type: string
  read?: boolean
  description: string
  clickClose?: boolean
  extra?: string
  color?: string
}

export interface TabItem {
  key: string
  name: string
  list: ListItem[]
  unreadlist?: ListItem[]
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: 'Thông báo',
    list: [
      {
        id: '000000001',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'Tét',
        description: '',
        datetime: '2017-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Test',
        description: '',
        datetime: '2017-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'Test',
        description: '',
        datetime: '2017-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'Test',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: 'Tin tức',
    list: [
      {
        id: '000000006',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Test',
        description: 'Tét',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Test',
        description: 'tét',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'tét',
        description: 'tét',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
    ],
  },
  {
    key: '3',
    name: 'Tin nhắn',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: 'ád',
        description: '123',
        datetime: '',
        extra: 'sưd',
        color: '',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: 'ád',
        description: 'ád',
        datetime: '',
        extra: 'ád',
        color: 'red',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: 'ád',
        description: 'ád',
        datetime: '',
        extra: 'ád',
        color: 'gold',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'ABCD ád',
        description: 'ád',
        datetime: '',
        extra: 'ád',
        color: 'blue',
        type: '3',
      },
    ],
  },
]
