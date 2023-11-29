import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from "react-native-web";

const DATA = [
    {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];

function ArticlesScreen ({ navigation }) {
    return (
        <View>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </TouchableOpacity>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});

export default ArticlesScreen;