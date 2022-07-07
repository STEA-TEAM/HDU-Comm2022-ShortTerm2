export default {
  components: {
    dataVisualizer: {
      tooltips: {
        autoScroll: "自动滚动到表格底部",
        collapsed: "展开/收起区域",
        clearData: "清空历史数据"
      }
    },
    languagesMenu: {
      labels: {}
    },
    settingsMenu: {
      labels: {
        darkMode: "暗色模式"
      }
    }
  },
  layouts: {
    headers: {
      main: {
        labels: {
          title: "杭电 通信2022 短学期二"
        }
      }
    },
    footers: {
      main: {
        labels: {
          title: "杭电 通信2022 短学期二"
        }
      }
    },
    main: {}
  },
  pages: {
    dashboard: {
      labels: {
        title: "杭电 通信2022 短学期二",
        intro: "一个基于Quasar框架的环境监测系统",
        team: "C10小组",
        temperature: "温度",
        humidity: "湿度",
        startTime: "开始时间",
        endTime: "结束时间",
        getHistory: "获取历史数据",
        getRealtimeData: "获取实时数据",
        clearData: "清空历史数据",
        temperatureThreshold: "温度阈值",
        temperatureAlert: "温度报警",
        humidityThreshold: "湿度阈值",
        humidityAlert: "湿度报警",
        emailInterval: "邮件间隔",
        emailNotify: "邮件通知",
        wechatInterval: "微信间隔",
        wechatNotify: "微信通知",
        minutes: "分钟",
        setSettings: "设置配置",
        testEmail: "测试邮件",
        testWechat: "测试微信"
      },
      notifications: {
        retrievingHistory: "正在获取历史数据...",
        retrieveHistorySuccess: "获取历史数据成功",
        retrieveHistoryError: "获取历史数据失败",
        updatingSettings: "正在更新配置...",
        updateSettingsSuccess: "配置更新成功",
        updateSettingsError: "配置更新失败",
        testingEmail: "正在测试邮件...",
        testingEmailSuccess: "测试邮件成功",
        testingEmailError: "测试邮件失败",
        testingWechat: "正在测试微信...",
        testingWechatSuccess: "测试微信成功",
        testingWechatError: "测试微信失败"
      }
    }
  },
  app: {
    notifications: {
      retrievingSettings: "正在获取设置...",
      retrieveSettingsSuccess: "设置获取成功",
      retrieveSettingsError: "获取设置失败"
    }
  }
};
