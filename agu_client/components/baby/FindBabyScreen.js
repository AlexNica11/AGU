import {View, Image} from "react-native";
import {Text} from "galio-framework";


export default function FindBabyScreen() {
    // Image.getSize()
    return(
        <View>
            <Text>
                idk
            </Text>
            <Image
                style={{
                    width:100,
                    height:100,
                }}
                source={{
                    uri:'https://www.wikihow.com/images/thumb/b/bf/Handle-a-Newborn-Baby-Step-1-Version-2.jpg/aid1203442-v4-728px-Handle-a-Newborn-Baby-Step-1-Version-2.jpg.webp',
                    // uri:'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
        </View>
    )
}
