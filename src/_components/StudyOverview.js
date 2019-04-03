import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import {dataSet} from '../_data/Dataset.js';
import RangeDatePicker from "../_util/RangeDatePicker";
import Chart from "../_util/chart";

class StudyOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "left"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 3 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };

    const DataStudyOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.props.chartData,
      options: chartOptions,
      plugins:[{
    }]
    });

    // They can still be triggered on hover.
    const buoMeta = DataStudyOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    DataStudyOverview.render();
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>

            </Col>
          </Row>
          <canvas
            height="220"
            ref={this.canvasRef}
            style={{ minWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

StudyOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

StudyOverview.defaultProps = {
  title: "Data Overview",
  chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: dataSet
  }
};

export default StudyOverview;
