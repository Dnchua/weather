import React, { Component } from 'react';
import {Card,Row,Col} from 'antd';
import EchartList from './EchartList';


class MainTainer extends Component {

    renderContent(){
        const { weatherData, hazeData,forecastData } = this.props;
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
          };
        let temMaxList=[];
        let temMinList=[];
        let humList=[];
        if(forecastData.forecast){
            let len = forecastData.forecast.length;
            for(let i=0;i<len;i++){
                temMaxList.push(forecastData.forecast[i].tmp.max);
                temMinList.push(forecastData.forecast[i].tmp.min);
                humList.push(forecastData.forecast[i].hum);
            }
        }
        return (
            <div>
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card title='今日速览'>
                        <Card.Grid style={gridStyle}>温度:{weatherData.temperature}</Card.Grid>
                        <Card.Grid style={gridStyle}>天气现象:{weatherData.phenomena}</Card.Grid>
                        <Card.Grid style={gridStyle}>相对湿度:{weatherData.humidity}</Card.Grid>
                        <Card.Grid style={gridStyle}> 风力:{weatherData.windpower}</Card.Grid>
                        <Card.Grid style={gridStyle}>空气质量指数:{hazeData.AQI}</Card.Grid>
                        <Card.Grid style={gridStyle}>PM2.5浓度(μg/m3):{hazeData.PM25	}</Card.Grid>
                        <Card.Grid style={gridStyle}>PM10浓度(μg/m3):{hazeData.PM10}</Card.Grid>
                    </Card>
                </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <EchartList 
                            temMaxList = {temMaxList}
                            temMinList = {temMinList}
                            humList = {humList}
                        /> 
                    </Col>
                </Row>
            </div>
            
        )
    }

    render(){
        return(
            <div>
                {this.props.weatherData ? this.renderContent() : '没能获取到当前城市的信息'}
            </div>
        )
    }
}
export default MainTainer;