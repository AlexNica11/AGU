import React, {useEffect, useState, Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from 'react-native';
import {serverIp} from "../env/Variables";
import * as SecureStore from "expo-secure-store";
import {Block, Button, Card} from "galio-framework";

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

    renderItem = ({item}) => (
        <TouchableOpacity
            style={styles.item}
            onPress={
            () => this.props.navigation.navigate("ArticleScreen", {
                articleId: item.id
            })
        }>
            <Card
                flex
                borderless
                style={{fontSize: 40}}
                title={item.title}
                caption={item.content}
                // location="Los Angeles, CA"
                avatar="http://i.pravatar.cc/100?id=skater"
                // imageStyle={styles.cardImageRadius}
                // imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
                image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
            />
            {/*<Text style={styles.title}>{item.title}</Text>*/}
            {/*<Text>{item.content}</Text>*/}
        </TouchableOpacity>
    )

    render() {
        return (
            <Block style={{flex:1}}>
                <Block center>
                    <Button
                        round
                        size="large"
                        color="#7a42f4"
                        onPress={() => this.props.navigation.navigate("AddArticle")}>
                        <Text style={styles.submitButtonText}> Add Article </Text>
                    </Button>
                </Block>
                <Block
                    style = {styles.container}
                    >

                    {
                        this.state.isLoading ? (
                                <ActivityIndicator/>
                            ) :
                            (
                                <Block>
                                    <FlatList
                                        data={this.state.data}
                                        keyExtractor={({id}) => id}
                                        onRefresh={() => this.getArticles()}
                                        refreshing={this.state.isLoading}
                                        renderItem={this.renderItem}
                                        extraData={this.state.data}
                                        // style={styles.container}
                                    />
                                </Block>
                            )}
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        // flex: 1,
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
