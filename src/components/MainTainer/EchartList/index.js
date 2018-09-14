import React, { Component } from 'react';
import { Radio } from 'antd';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/chart/line';
import './style.css';


export default class EchartList extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.temMaxList !== this.props.temMaxList) {
            this.init();
        }
    }
    componentDidMount() {
        this.init();
    }

    init() {
        const { temMaxList, temMinList } = this.props;
        let myChart = echarts.init(document.getElementById('main'));
        let option = {
            title: {
                text: '未来一周气温变化',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['最高气温', '最低气温']
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [
                {
                    name: '最高气温',
                    type: 'line',
                    data: [...temMaxList],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: '最低气温',
                    type: 'line',
                    data: [...temMinList],
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        };
        myChart.clear();
        myChart.setOption(option);
    }
    setChart(type) {
        const { temMaxList, temMinList, humList } = this.props;
        let myChart = echarts.init(document.getElementById('main'));
        let option;
        if (type === 'a') {
            option = {
                title: {
                    text: '未来一周气温变化',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['最高气温', '最低气温']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    }
                ],
                series: [
                    {
                        name: '最高气温',
                        type: 'line',
                        data: [...temMaxList],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    },
                    {
                        name: '最低气温',
                        type: 'line',
                        data: [...temMinList],
                        markPoint: {
                            data: [
                                { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                ]
            };
        } else {
            option = {
                title: {
                    text: '未来一周湿度变化',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['湿度']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
                ],
                series: [
                    {
                        name: '湿度',
                        type: 'line',
                        data: [...humList],
                        markPoint: {
                            data: [
                                { type: 'max', name: '相对湿度' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                ]
            };
        }
        myChart.clear();
        myChart.setOption(option);
    }

    onChange = (e) => {
        this.setChart(e.target.value);
    }

    render() {
        return (
            <div>
                <Radio.Group buttonStyle="solid" defaultValue="a" onChange={this.onChange}>
                    <Radio.Button value='a'>温度</Radio.Button>
                    <Radio.Button value='b'>湿度</Radio.Button>
                </Radio.Group>
                <div id='main' style={{ height: 500 }}></div>
            </div>
        )
    }
}