import React, {useState}from 'react';
import { Text, View, Button} from 'react-native';

const GroupChat = ({navigation}) => {

    React.useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <View>
                    <Button title = "info" onPress = {()=>{navigation.navigate("About")}} color="#000000">
                    
                    </Button>
                </View>
            )
        })
    }, [navigation])


    return(
        <View style={{backgroundColor: '#000000', flex:1}}>
            <Text>
                Home Screen

            </Text>
        </View>
    )

}
export default GroupChat;