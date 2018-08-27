import React from 'react';
import { View, Text, VrButton } from 'react-360';


const EndButton = (props) => {

    return (
        <View>
            <VrButton onEnter={props.resetGame}>
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
                    Play again?
                </Text>
            </VrButton>
        </View>


    );
};

export default EndButton;