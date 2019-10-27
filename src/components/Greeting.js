import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
    paragraph: {
        padding: 20,
        textAlign: 'center'
    }
});

class Greeting extends React.Component {
    render () {
        return (
            <View>
                <Text style={styles.paragraph}>
                  Hey there. Choose a store and start shopping!
                </Text>
            </View>
        )
    }
}

export default Greeting;
