import React, { Component, Fragment } from 'react';

class Canvas extends Component {
  state = {
    points: []
  };

  componentDidMount() {
    this.canvas.width = this.props.size;
    this.canvas.height = this.props.size;
    this.ctx = this.canvas.getContext("2d");

    this.drawCartesian();
    this.drawFigure();
  }

  drawLine(fromX, fromY, toX, toY) {
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
    this.ctx.stroke();
  }

  drawMark(strokeStyle, number, isX) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#000000";

    const from = isX ? [3, this.props.gridSize*number+0.5] : [this.props.gridSize*number+0.5, -3];
    const to = isX ? [-3, this.props.gridSize*number+0.5] : [this.props.gridSize*number+0.5, 3];

    this.drawLine(...from, ...to);

    this.ctx.font = this.props.font;
    this.ctx.textAlign = 'start';
    this.ctx.fillText(number.toString(), to[0]+(isX*10), to[1]+((!isX)*10));
  }

  drawCartesian() {
    // no of vertical, horizontal grid lines
    let numLines = Math.floor(this.props.size/this.props.gridSize);

    for (let i = 0; i <= numLines; i++) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;

      // If line represents X-axis draw in different color
      this.ctx.strokeStyle = i === this.props.scale ? "#000000" : "#e9e9e9";

      if (i === numLines) {
        this.drawLine(0, this.props.gridSize*i, this.canvas.width, this.props.gridSize*i);
        this.drawLine(this.props.gridSize*i, 0, this.props.gridSize*i, this.canvas.height);
      } else {
        this.drawLine(0, this.props.gridSize*i+0.5, this.canvas.width, this.props.gridSize*i+0.5);
        this.drawLine(this.props.gridSize*i+0.5, 0, this.props.gridSize*i+0.5, this.canvas.height);
      }
    }

    this.ctx.translate(this.props.scale * this.props.gridSize, this.props.scale * this.props.gridSize);

    // Ticks marks along the axises
    for(let i = 1; i < this.props.scale; i++) {
      this.drawMark("#000000", i, true);
      this.drawMark("#000000", -i, false);
      this.drawMark("#000000", -i, true);
      this.drawMark("#000000", i, false);
    }
  }

  drawFigure() {
    console.log(this.state);
    if (this.state.points.length > 1) {
      this.state.reduce((point1, point2) => this.drawLine(...point1, ...point2), this.state.points[0]);
    }
  }

  render() {
    return (
      <Fragment>
        <canvas
          onClick={this.clickHandle}
          ref={canvas => this.canvas = canvas}
        />
        <input
          type={"checkbox"}
          ref={input => this.setFig = input}
        />
        Задать фигуру
      </Fragment>
    );
  }

  clickHandle = (e) => {
    if (this.setFig.checked) {
      const points = this.state.points;
      points.push([e.clientX, e.clientX]);
      this.setState({points: points});
    }
  };
}

export default Canvas;
