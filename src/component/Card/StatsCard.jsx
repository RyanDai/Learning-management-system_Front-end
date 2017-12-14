import React, { Component } from 'react';


export class StatsCard extends Component {
    render() {
        return (
            <div className="card card-stats" style={{margin:"0px", padding:"20px 5px"}}>
                <div className="content">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="icon-big text-center icon-warning">
                                {this.props.bigIcon}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="numbers">
                                <p className={"text-center"} style={{ fontWeight: "bold", fontSize: "20px" }}>{this.props.statsText}</p>
                                <p className={"text-center"} style={{ fontSize: "60px", margin:"0 auto" }}>{this.props.statsValue}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="footer">
                    <hr />
                    <div className="stats text-center">
                        {this.props.statsIcon}{" "}{this.props.statsIconText}
                    </div>
                </div>
            </div>
        );
    }
}

export default StatsCard;
