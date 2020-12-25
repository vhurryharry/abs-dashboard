import React, { useEffect } from "react";
import Chart from "chart.js";
import moment from "moment";

const CardLineChart = ({ data }) => {
  useEffect(() => {
    if (data) {
      var config = {
        type: "line",
        data: {
          labels: Array.from(Array(7)).map((val, index) => {
            return moment()
              .subtract(6 - index, "d")
              .format("YYYY-MM-DD");
          }),
          datasets: [
            {
              label: "USD",
              fill: false,
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: data.usd.prices.map((price) => price[1]),
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Price History",
            fontColor: "rgba(0,0,0,.4)",
          },
          legend: {
            labels: {
              fontColor: "rgba(0,0,0,.4)",
            },
            align: "end",
            position: "bottom",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(0,0,0,.6)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  fontColor: "rgba(0,0,0,.4)",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "red",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(0,0,0,.6)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  fontColor: "rgba(0,0,0,.4)",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(0,0,0,.4)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };

      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
  }, [data]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-500 mb-1 text-xs font-semibold">
                Price
              </h6>
              <h2 className="text-gray-800 text-xl font-semibold">
                Last 7 days
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardLineChart;
