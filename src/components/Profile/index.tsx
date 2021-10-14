import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../Avatar';

import { styles } from './styles';

type Props = {

}

export function Profile({ }: Props) {
    return (
        <View style={styles.container}>

            <Avatar urlImage="https://github.com/janio02011998.png" />
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá,
                    </Text>
                    <Text style={styles.username}>
                        Jânio,
                    </Text>
                </View>
                <Text style={styles.message}>Hoje é dia de vitória</Text>
            </View>
        </View>
    )
}