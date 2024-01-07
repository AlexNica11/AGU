import React, {useEffect, useState, Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    StatusBar,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {serverIp} from "../env/Variables";
import * as SecureStore from "expo-secure-store";

// const DATA = [
//     {
//         title: 'Main dishes',
//         data: ['Pizza', 'Burger', 'Risotto'],
//     },
//     {
//         title: 'Sides',
//         data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
//     },
//     {
//         title: 'Drinks',
//         data: ['Water', 'Coke', 'Beer'],
//     },
//     {
//         title: 'Desserts',
//         data: ['Cheese Cake', 'Ice Cream'],
//     },
// ];

export default class ArticlesScreen  extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
        isLoading: true
    }

    // const [isLoading, setLoading] = useState(true);
    // const [data, setData] = useState([]);

    //https://localhost:1234
    //https://jsonplaceholder.typicode.com/posts/1

    getArticles = async () => {
        try {
            const response = await fetch(serverIp + '/articles', {
                method : 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : ('Bearer ' + (await SecureStore.getItemAsync("jwt" ))),
                }
            });
            const json = await response.json();
            this.setState({data: json});
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false);
            this.setState({isLoading: false});
        }
    };

    componentDidMount = () => {
        this.getArticles();
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.props.navigation.navigate("AddArticle")}>
                    <Text style={styles.submitButtonText}> Add Article </Text>
                </TouchableOpacity>
                {
                    this.state.isLoading ? (
                            <ActivityIndicator/>
                        ) :
                        (
                            // <SectionList
                            //     sections={DATA}
                            //     keyExtractor={(item, index) => item + index}
                            //     renderItem={({item}) => (
                            //         <TouchableOpacity style={styles.item} onPress = {
                            //             () => navigation.navigate("ArticleScreen")
                            //         }>
                            //             <Text style={styles.title}>{item}</Text>
                            //             <Text>Hint for text</Text>
                            //         </TouchableOpacity>
                            //     )}
                            //     renderSectionHeader={({section: {title}}) => (
                            //         <Text style={styles.header}>{title}</Text>
                            //     )}
                            // />
                            <View>
                                <FlatList
                                    data={this.state.data}
                                    keyExtractor={({id}) => id}
                                    onRefresh={() => this.getArticles()}
                                    refreshing={this.state.isLoading}
                                    renderItem={({item}) => (
                                        <TouchableOpacity style={styles.item} onPress={
                                            () => this.props.navigation.navigate("ArticleScreen", {
                                                articleId: item.id
                                            })
                                        }>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text>{item.content}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
            </View>
        );
    }
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
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    },
});