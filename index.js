import React from 'react';
import {
  AppRegistry,
  View,
  PointLight,
  asset,
  Environment,
  NativeModules
} from 'react-360';


import StartScreen from './components/startscreen'
import Rocket from './components/rocket'
import ScoreBoard from './components/scoreboard'
import Floor from './components/floor'
import EndButton from './components/end_button';


const { AudioModule } = NativeModules;

export default class React3DView extends React.Component {

  state = {
    activeLight: 'pyramid.obj',
    nonActiveLight: 'pyramid.obj',
    rockets: [],
    counter: 0,
    animations: {},
    theTimer: 59,
    level: 'start',
    achivement: 0,
    highScore: null
  }

  startGame = () => {
    this.setState((prevState, props) => {
      return { level: 1 }
    })
    this.launchLevel();
  }

  resetGame = () => {
    this.setState((prevState, props) => {
      return {
        level: 'start',
        counter: 0,
        theTimer: 59
      }
    })
    Environment.setBackgroundImage(
      asset(`360_world.png`),
      { format: '2D' }
    );
  }


  launchLevel = () => {

    this.countdown = setInterval(this.levelTimer, 500);

    switch (this.state.level) {
      case 1:
        leveldata = "level1";
        break;
      case 2:
        leveldata = "level2";
        break;
      case 3:
        leveldata = "level3";
        break;
      case 4:
        leveldata = "level4";
        break;
      case 5:
        leveldata = "level5";
        break;
      case 6:
        leveldata = "level6";
        break;
      case 7:
        leveldata = "level7";
        break;
      case 8:
        leveldata = "level8";
        break;
      default:
        leveldata = "level1";
    }
    fetch(`./static_assets/${leveldata}.json`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState((prevState, props) => {
          return {
            rockets: data.rockets,
            achivement: data.achivement,
            theTimer: data.timer
          }
        })
        AudioModule.playEnvironmental({
          source: asset(`song${this.state.level}.wav`)
        });
        Environment.setBackgroundImage(
          asset(`360_world${this.state.level}.jpg`),
          { format: '2D' }
        );
      })
      .catch((data) => {
        console.log(`failed to get ${data}`)
      })
  }

  turnLightOff = (i) => {

    let currentRockets = [...this.state.rockets]
    if (currentRockets[i].active) {
      currentRockets[i].active = false
      this.setState((prevState, props) => {
        return { counter: prevState.counter + 1 }
      })
    } else {
      return
    }
  }


  levelTimer = () => {
    if (this.state.theTimer !== 0) {
      this.setState((prevState, props) => {
        return { theTimer: prevState.theTimer - 1 }
      })
    } else {
      this.setState((prevState, props) => {
        return {
          rockets: [],
          animations: {}
        }
      })
      clearInterval(this.countdown);
      this.checkScores();
    }
  }

  checkScores = () => {

    AudioModule.stopEnvironmental()

    if (this.state.counter > this.state.achivement) {
      this.setState((prevState, props) => {
        return {
          level: prevState.level + 1
        }
      })
      this.launchLevel()

    } else {

      if ((this.state.counter > this.state.highScore) || (this.state.highscore === null)) {
        this.setState((prevState, props) => {
          return {
            highScore: this.state.counter
          }
        })
      }

      this.setState((prevState, props) => {
        return {
          theTimer: 'Game over',
          rockets: [],
          animations: {},
          level: 'end'
        }
      })
    }

  }

  render() {



    return (
      <View>
        {this.state.level === 'start' && <StartScreen highScore={this.state.highScore} startGame={this.startGame} />}

        {((this.state.level >= 1) || (this.state.level === 'end')) && <ScoreBoard counter={this.state.counter} theTimer={this.state.theTimer} />}

        {this.state.rockets.length > 0 && (this.state.level >= 1) &&

          <Rocket updateStateAnimations={this.updateStateAnimations}
            animations={this.state.animations}
            rockets={this.state.rockets}
            nonActiveLight={this.state.nonActiveLight}
            activeLight={this.state.activeLight}
            turnLightOff={this.turnLightOff} />
        }

        {(this.state.level >= 1) &&
          <Floor passedMethod={this.passedMethod} />
        }

        {(this.state.level === 1) &&
          //Yellow
          <PointLight style={{ color: '#fdd104', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 2) &&
          //Red
          <PointLight style={{ color: '#fd0404', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 3) &&
          //Blue
          <PointLight style={{ color: '#0345de', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 4) &&
          //Green
          <PointLight style={{ color: '#02e66c', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 5) &&
          //Purple
          <PointLight style={{ color: '#dc03ef', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 6) &&
          //White
          <PointLight style={{ color: '#fff', transform: [{ translate: [0, -100, 0] }] }} />
        }
        {(this.state.level === 7) &&
          //Orange
          <PointLight style={{ color: '#fa9a02', transform: [{ translate: [0, -100, 0] }] }} />
        }

        {this.state.level === 'end' && <EndButton resetGame={this.resetGame} />}


      </View >
    );
  }
};


AppRegistry.registerComponent('React3DView', () => React3DView);
