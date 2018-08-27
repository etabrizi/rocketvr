import React from 'react';
import { View, Text } from 'react-360';

const ScoreBoard = (props) =>

    <View>
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
                opacity: 0.7,
                borderRadius: 0.1,
                transform: [{ translate: [0, 0, -10] }],
            }}>
            Rockets caught: {props.counter}
        </Text>

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
            {props.theTimer}
        </Text>
    </View>;


export default ScoreBoard;