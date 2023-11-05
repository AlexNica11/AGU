import React, { Component } from 'react';
import Article from './Article';
import AddArticle from './AddArticle';

export default class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/articles')
            .then(response => response.json())
            .then(data => this.setState({articles: data}))
    }

    render() {
        return (
            <div>
                <div className="row">
                    <AddArticle />
                </div>
                <div className="row">
                    { this.state.articles.map((item) => (
                        <Article key={item.id} item={item} />
                    ))}
                </div>
            </div>
        )
    }
}
