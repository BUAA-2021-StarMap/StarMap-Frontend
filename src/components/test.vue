mycharts1_s1.setOption({
        title: {
          text: "pull_request",
        },
        tooltip: {
          trigger: "none", // 不显示横坐标值
        },
        xAxis: {
          type: "category",
          data: xdata,
          axisLabel: {
            show: false, //不显示坐标轴上的文字
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: pulldata,
            type: "line",
          },
        ],
      });
      mycharts1_s2.setOption({
        title: {
          text: "commits",
        },
        tooltip: {
          trigger: "none", // 不显示横坐标值
        },
        xAxis: {
          type: "category",
          data: xdata,
          axisLabel: {
            show: false, //不显示坐标轴上的文字
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: comdata,
            type: "line",
          },
        ],
      });
      mycharts1_s3.setOption({
        title: {
          text: "issues",
        },
        tooltip: {
          trigger: "none", // 不显示横坐标值
        },
        xAxis: {
          type: "category",
          data: xdata,
          axisLabel: {
            show: false, //不显示坐标轴上的文字
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: issdata,
            type: "line",
          },
        ],
      });