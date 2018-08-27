import React from 'react';
import { View, asset } from 'react-360';
import Entity from 'Entity';

const Floor = (props) => {

    return (
        <View>
            <Entity
                source={{
                    obj: asset('Bevel_Floor_u.obj')
                }}
                style={{
                    transform: [
                        { translateX: 0 },
                        { translateY: -7 },
                        { translateZ: 0 },
                    ]
                }}
            />
        </View>

    );
};

export default Floor;