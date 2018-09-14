import React, { Component } from 'react';
import BMap  from 'BMap';
import './App.css';
import City from './components/City';
import MainTainer from './components/MainTainer';
import content from './content.js';
import 'whatwg-fetch';

class App extends Component {

    state = {
      city:'',
      weatherData:[],
      hazeData:[],
      forecastData:[]
    }

    componentDidMount () {
      let myCity = new BMap.LocalCity();
      myCity.get((res) =>{
        this.setState({
          city:res.name
        },() =>{
          this.getMyCity();
        })
      });
    }
    
    getMyCity(){
      let { city } = this.state;
      city = city.split('市')[0];
      let cityNum = content.cityCode.find((v,k) => {
          if(v.indexOf(city) !== -1){
            return v[0];
          }
      });
      const asskey = 'ZGNOMTEWMTUZNJY3MJYZODUXMG==';
      const host = 'http://service.envicloud.cn:8082';
      const pathCityAirlive = '/v2/cityairlive/';
      const pathWeatherlive = '/v2/weatherlive/';
      const pathWeatherforecast = '/v2/weatherforecast/';
      //'/v2/cityairlive/{accesskey}/{citycode}/{type}' 空气质量
      ///v2/weatherlive/{accesskey}/{citycode} 温度实况
      ///v2/weatherforecast/{accesskey}/{citycode}   未来七天天气预报
      ///v2/weatherhistory/{accesskey}/{citycode}   过去24小时天气预报，用于折线图
      fetch(host + pathWeatherforecast + asskey +'/' + cityNum[0])
      .then( res => res.json())
      .then( data =>{
        if(data.status){
          alert('不存在该城市的信息1');
          return;
        }
        this.setState({
          forecastData:data,
        });
      });
      fetch(host + pathCityAirlive + asskey +'/' + cityNum[0])
      .then( res => res.json())
      .then( data =>{
        if(data.status){
          alert('不存在该城市的信息1');
          return;
        }
        this.setState({
          hazeData:data,
        });
      });
      fetch(host + pathWeatherlive + asskey +'/' + cityNum[0])
      .then( res => res.json())
      .then( data =>{
        if(data.rcode !== 200){
          alert('不存在该城市的信息2');
          return;
        }
        this.setState({
          weatherData:data,
        });
      });
    }

    render() {
      return (
        <div>
          <City city = {this.state.city}/>
          <MainTainer 
              hazeData = {this.state.hazeData}
              weatherData = {this.state.weatherData}
              forecastData = {this.state.forecastData}
          />
        </div>
      );
    }
}

export default App; 