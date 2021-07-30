import React from 'react';
import { ActivityIndicator,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

export default Loader = (props) => {
    return (
        props.loading
            ?
            <View style={styles.loader}>
                <ActivityIndicator size="large" color='#FFC526' />
            </View>
            :
            null
    )
}

const styles = StyleSheet.create({
    loader: {
        backgroundColor: 'rgba(245,245,245, 0.7)',
        height: Dimensions.get('window').height,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});
