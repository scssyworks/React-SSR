import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { fetchHackerNewsFeed, fetchUpvotes, fetchHiddenFeeds } from '../../actions';
import './index.scss';
import Button from '../../atoms/Button';
import Feed from '../../components/Feed';

class HomePage extends Component {
    static propTypes = {
        upvotes: PropTypes.object.isRequired,
        feed: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired,
        hidden: PropTypes.object.isRequired,
        fetchHackerNewsFeed: PropTypes.func.isRequired,
        fetchUpvotes: PropTypes.func.isRequired,
        fetchHiddenFeeds: PropTypes.func.isRequired
    };

    page = 1;

    loadMoreResults = () => {
        this.page += 1;
        this.props.fetchHackerNewsFeed(this.page);
    }

    getChartData() {
        const { feed, upvotes, hidden } = this.props;
        return feed
            .filter(feedItem => !hidden[feedItem.authorId])
            .map(feedItem => ({
                id: feedItem.author,
                votes: (upvotes[feedItem.authorId] || 0)
            }));
    }

    render() {
        const { feed, upvotes, hidden } = this.props;
        if (!(feed && upvotes && hidden)) {
            return <div className="loader">Loading...</div>;
        }
        return (
            <React.Fragment>
                <Feed />
                <Button onClick={this.loadMoreResults} className="load-more-btn mt-4 mb-4">Load More</Button>
                <ResponsiveContainer height={300} width="100%">
                    <LineChart data={this.getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="votes" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.props.fetchHackerNewsFeed();
        this.props.fetchUpvotes();
        this.props.fetchHiddenFeeds();
    }
}

function mapStateToProps({ feed, upvotes, hidden }) {
    return { feed, upvotes, hidden };
}

function loadData(store) {
    return Promise.all([
        store.dispatch(fetchHackerNewsFeed()),
        store.dispatch(fetchUpvotes()),
        store.dispatch(fetchHiddenFeeds())
    ]);
}



export default {
    component: connect(mapStateToProps, {
        fetchHackerNewsFeed,
        fetchUpvotes,
        fetchHiddenFeeds
    })(HomePage),
    loadData
};