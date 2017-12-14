import React, { Component } from 'react';


export class StatsCard extends Component {
    render() {
        return (
            <div className="card card-stats">
                <div className="content">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="icon-big text-center icon-warning">
                                {this.props.bigIcon}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="numbers">
                                <p style={{ fontWeight: "bold", fontSize: "20px" }}>{this.props.statsText}</p>
                                <p style={{ fontSize: "60px" }}>{this.props.statsValue}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="footer">
                    <hr />
                    <div className="stats">
                        {this.props.statsIcon}{" "}{this.props.statsIconText}
                    </div>
                </div>
            </div>
        );
    }
}

export default StatsCard;
