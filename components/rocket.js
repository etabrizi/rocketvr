import React from 'react';
import { View, asset, VrButton, Animated, NativeModules } from 'react-360';
import Entity from 'Entity';

const { AudioModule } = NativeModules;
const AnimatedModel = Animated.createAnimatedComponent(Entity);


class Rocket extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        let animations = this.props.animations;

        this.props.rockets.map((item, i) => {
            currentAnimation = Object.assign(animations, {
                [`anim${item.key}`]: new Animated.Value(0),
                [`fadeOut${item.key}`]: new Animated.Value(0)
            });
            currentAnimation[`anim${item.key}`].setValue(-700)
            Animated.timing(currentAnimation[`anim${item.key}`], {
                toValue: 1500,
                duration: item.duration,
                delay: item.delay

            }).start();
        });
    }


    turnOff = (i, item) => {

        stoppedValue = (val) => {
            setTimeout(() => {
                this.props.animations[`anim${item.key}`].setValue(val)
                Animated.timing(this.props.animations[`anim${item.key}`], {
                    toValue: -700,
                    duration: 500,
                    delay: 0
                }).start();
            }, 100);
        };

        if (item.active) {

            this.props.animations[`fadeOut${item.key}`].setValue(1)
            Animated.timing(this.props.animations[`fadeOut${item.key}`], {
                toValue: 0,
                duration: 500,
                delay: 500
            }).start();

            AudioModule.playOneShot({
                source: asset('plop.wav'),
            });
        }
        this.props.turnLightOff(i);

        this.props.animations[`anim${item.key}`].stopAnimation(stoppedValue(this.props.animations[`anim${item.key}`]._value));

    }


    render() {

        let rocket = this.props.rockets.map((item, i) => {

            return (
                <VrButton onEnter={() => {
                    this.turnOff(i, item)
                }}>
                    <AnimatedModel
                        source={{
                            obj: asset(item.active ? this.props.activeLight : this.props.nonActiveLight)
                        }}
                        lit={true}
                        style={{
                            transform: [
                                { translateX: item.position[0] },
                                { translateY: this.props.animations[`anim${item.key}`] },
                                { translateZ: item.position[2] },
                            ],
                            opacity: item.active ? 1 : this.props.animations[`fadeOut${item.key}`]
                        }}
                    />
                </VrButton>
            )
        });


        return (
            <View>
                {rocket}
            </View>
        );
    }
};

export default Rocket;