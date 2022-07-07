export default {
  components: {
    dataVisualizer: {
      tooltips: {
        autoScroll: "Scroll table automatically",
        collapsed: "Expand/Collapse area",
        clearData: "Clear all history"
      }
    },
    languagesMenu: {
      labels: {}
    },
    settingsMenu: {
      labels: {
        darkMode: "Dark mode"
      }
    }
  },
  layouts: {
    headers: {
      main: {
        labels: {
          title: "HDU Comm2022 ShortTerm2"
        }
      }
    },
    footers: {
      main: {
        labels: {
          title: "HDU Comm2022 ShortTerm2"
        }
      }
    },
    main: {}
  },
  pages: {
    dashboard: {
      labels: {
        title: "HDU Comm2022 ShortTerm2",
        intro: "A Quasar-framework-based environment monitoring system",
        team: "Team C10",
        temperature: "Temperature",
        humidity: "Humidity",
        startTime: "Start Time",
        endTime: "End Time",
        getHistory: "Get history",
        getRealtimeData: "Get realtime data",
        clearData: "Clear all history",
        temperatureThreshold: "Temperature threshold",
        temperatureAlert: "Temperature alert",
        humidityThreshold: "Humidity threshold",
        humidityAlert: "Humidity alert",
        emailInterval: "Email interval",
        emailNotify: "Email notify",
        wechatInterval: "Wechat interval",
        wechatNotify: "Wechat notify",
        minutes: "minutes",
        setSettings: "Set settings",
        testEmail: "Test email",
        testWechat: "Test wechat"
      },
      notifications: {
        retrievingHistory: "Retrieving history...",
        retrieveHistorySuccess: "History retrieved successfully",
        retrieveHistoryError: "History retrieval failed",
        updatingSettings: "Updating settings...",
        updateSettingsSuccess: "Settings updated successfully",
        updateSettingsError: "Settings update failed",
        testingEmail: "Testing email...",
        testingEmailSuccess: "Email tested successfully",
        testingEmailError: "Email testing failed",
        testingWechat: "Testing wechat...",
        testingWechatSuccess: "Wechat tested successfully",
        testingWechatError: "Wechat testing failed"
      }
    }
  },
  app: {
    notifications: {
      retrievingSettings: "Retrieving settings...",
      retrieveSettingsSuccess: "Settings retrieved successfully",
      retrieveSettingsError: "Error retrieving settings"
    }
  }
};
