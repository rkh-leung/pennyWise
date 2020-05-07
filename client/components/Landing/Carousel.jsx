import React, { Component } from 'react'
import './carousel.css'
import { Transition } from 'semantic-ui-react'

const items = [
  'Tools To manage Your Expenses',
  'Tools To manage Your Budget',
  'Tools To manage Your Mom'
]

export default class Carousel extends Component {
  state = {
    currentIndex: 0,
    animation: 'fade',
    duration: 500,
    visible: true,
    rightArrow: true,
    leftArrow: true,
    iconToggle: true
  }

  prev = () => {
    if (this.state.leftArrow === true) {
      if (this.state.currentIndex > 0) {
        this.setState({ currentIndex: this.state.currentIndex - 1 })
      } else if (this.state.leftArrow === true) {
        this.setState({ currentIndex: items.length - 1 })
      }

      this.setState({ visible: false, leftArrow: false }, () => {
        setTimeout(() => {
          this.setState({ visible: true })
        }, 500)
        setTimeout(() => {
          this.setState({ leftArrow: true })
        }, 1000)
      })
    }
  }

  next = () => {
    if (this.state.rightArrow === true) {
      if (this.state.currentIndex < items.length - 1) {
        this.setState({ currentIndex: this.state.currentIndex + 1 })
      } else {
        this.setState({ currentIndex: 0 })
      }
      this.setState({ visible: false, rightArrow: false }, () => {
        setTimeout(() => {
          this.setState({ visible: true })
        }, 500)
        setTimeout(() => {
          this.setState({ rightArrow: true })
        }, 1000)
      })
    }
  }

  setIndex = index => {
    if (this.state.iconToggle === true) {
      this.setState({ currentIndex: index })

      this.setState({ visible: false, iconToggle: false }, () => {
        setTimeout(() => {
          this.setState({ visible: true })
        }, 500)
        setTimeout(() => {
          this.setState({ iconToggle: true })
        }, 1000)
      })
    }
  }

  render () {
    return (
      <div className='landingCarousel'>
        <div className='landingCarouselMain'>
          <div
            onClick={this.prev}
            className={`landingArrows `}>
            <i className="angle left icon"></i>
          </div>
          <Transition.Group animation={this.state.animation} duration={this.state.duration}>
            {this.state.visible && (
              <p>{items[this.state.currentIndex]}</p>
            )}
          </Transition.Group>
          <div
            onClick={this.next}
            className={`landingArrows `}>
            <i className="angle right icon"></i>
          </div>
        </div>
        <div className='landingCarouselIndex'>
          {items.map((item, index) => {
            return (
              <img key ={index}
                onClick={() => this.setIndex(index)}
                className={`landingCarouselIcon ${
                  this.state.currentIndex === index ? `visible` : `hidden`
                }`}src="./images/pennywise_logo.png" alt=""/>

            )
          })}
        </div>
      </div>
    )
  }
}
