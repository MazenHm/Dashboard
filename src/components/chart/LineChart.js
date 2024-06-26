/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAmountByMonths } from "../../services/StatisticService";

const lineChart = {
  options: {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

function LineChart() {
  const [series, setSeries] = useState([
    {
      name: "unpaid",
      data: [],
      offsetY: 0,
    },
    {
      name: "paid",
      data: [],
      offsetY: 0,
    },
  ]);

  const { Title, Paragraph } = Typography;

  async function getBalance() {
    let res = await getAmountByMonths();
    if (res) {
      let paidList = [];
      let unpaidList = [];
      if (res.data && res.data.data) {
        const { data } = res.data;

        data.map((order) => {
          paidList.push(order.paid);

          unpaidList.push(order.unpaid);
        });
        console.log(paidList, unpaidList);
      }
      setSeries([
        {
          name: "unpaid",
          data: unpaidList,
          offsetY: 0,
        },
        {
          name: "paid",
          data: paidList,
          offsetY: 0,
        },
      ]);
    }
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Balance by month</Title>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
