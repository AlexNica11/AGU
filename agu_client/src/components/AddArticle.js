import React, {Component} from 'react';

export default class AddArticle extends Component {
    submitArticle(event){
        event.preventDefault();

        let article = {
            author: this.refs.author.value,
            title: this.refs.title.value,
            content: this.refs.content.value,
        }

        fetch("http://localhost:8080/api/articles", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(article), // transforms the object contact to JSON
        })
            .then(response => response.json());

        window.location.reload();
    }

    render() {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.submitArticle.bind(this)}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input ref="author" type="text" className="validate" />
                            <label htmlFor="author">Author</label>
                        </div>
                        <div className="input-field col s6">
                            <input ref="title" type="text" className="validate" />
                            <label htmlFor="title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea ref="content" id="content" className="materialize-textarea"></textarea>
                            <label htmlFor="content">Content</label>
                        </div>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn" type="submit" name="action">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}