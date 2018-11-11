import React, { Component } from 'react'

class Time extends Component {
  timeInterval = null

  state = {
    time: new Date(),
  }

  componentWillMount() {
    this.timeInterval = setInterval(this.updateTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
    this.timeInterval = null
  }

  updateTime = () => {
    this.setState({
      time: new Date(),
    })
  }

  addLeadingZero(n) {
    return `0${n}`.slice(-2)
  }

  render() {
    const { time } = this.state
    return (
      <div className="Time">
        {
          this.addLeadingZero(time.getHours())
        }{
          this.addLeadingZero(time.getMinutes())
        }
      </div>
    )
  }
}

export default Time
