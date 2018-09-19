import React, { Component } from 'react';
import {Row,Col,Progress } from 'antd';
import EchartList from './EchartList';
import './index.css';


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
            <div className='maintain'>
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24 }>
                    <div className='wrap'>
                        <div className='temper'>{weatherData.temperature} °C</div>
                    </div>
                    <div className='wrap'>
                        <div className='tianqixianxiang'>{weatherData.phenomena}</div>
                    </div>
                    <div className='wrap-zhiliang'>
                        <h3>空气质量</h3>
                        <Progress type="dashboard" 
                            format = {percent =>`${hazeData.AQI}`}
                            percent={Math.floor(hazeData.AQI*100/500)} 
                        />
                        <div className='leftContent'>
                            <div >PM2.5 : {hazeData.PM25}</div>
                            <div >PM10 : {hazeData.PM10}</div>
                            <div>NO2 : {hazeData.NO2}</div>
                            <div>SO2 : {hazeData.SO2}</div>
                            <div>O3 : {hazeData.o3}</div>
                            <div>CO : {hazeData.CO}</div>
                        </div>
                        
                    </div>
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