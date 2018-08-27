import React from 'react';
import { View, asset, Text } from 'react-360';
import Entity from 'Entity';

const StartScreen = (props) => {

    return (
        <View onEnter={props.startGame}>
            <Entity
                source={{
                    obj: asset('rocket_text.obj')
                }}
                style={{
                    transform: [{ translate: [0, 0, 20] }]
                }}

            />
            {props.highScore &&
                <Text
                    style={{
                        backgroundColor: '#777879',
                        fontSize: 0.8,
                        fontWeight: '400',
                        layoutOrigin: [0.5, 0.5],
                        paddingLeft: 0.2,
                        paddingRight: 0.2,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        borderRadius: 0.1,
                        opacity: 0.3,
                        transform: [{ translate: [0, 5, -10] }],
                    }}>
                    High score: {props.highScore}
                </Text>
            }
        </View>

    );
};

export default StartScreen;