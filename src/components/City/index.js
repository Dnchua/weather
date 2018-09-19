import React, { Component } from 'react';
import { Icon,Row,Col } from 'antd';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

class City extends Component {

    constructor(props){
        super(props);

        this.state = {
            city:''
        }
    }

    componentDidMount(){
        this.setState({
            city:this.props.city
        });
    }

    render(){
        return(
            <Row>
                <Col className="ant-dropdown-link city" xs={24} sm={24} md={24} lg={24} xl={24} >
                {this.props.city} <Icon type="cloud" style={{fontSize:20}} />
                </Col>
            </Row>
        )
    }
}
export default City;