import React from 'react';

const Article = ({item}) => (
    <div className="row">
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{item.title} {item.author}</span>
                </div>
                <div className="card-action">
                    <p>{item.content}</p>
                </div>
            </div>
        </div>
    </div>
);

export default Article;