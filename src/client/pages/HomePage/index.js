import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LineChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { fetchHackerNewsFeed, fetchUpvotes, updateUpvotes, fetchHiddenFeeds, hideFeed } from '../../actions';
import './index.scss';
import Table from '../../atoms/Table';
import THeading from '../../molecules/THeading';
import TContent from '../../molecules/TContent';
import Button from '../../atoms/Button';
import TRow from '../../atoms/TRow';
import TCell from '../../atoms/TCell';
import Anchor from '../../atoms/Anchor';

class HomePage extends Component {
    static propTypes = {
        upvotes: PropTypes.object.isRequired,
        feed: PropTypes.array.isRequired,
        hidden: PropTypes.object.isRequired,
        updateUpvotes: PropTypes.func.isRequired,
        fetchHackerNewsFeed: PropTypes.func.isRequired,
        hideFeed: PropTypes.func.isRequired,
        fetchUpvotes: PropTypes.func.isRequired,
        fetchHiddenFeeds: PropTypes.func.isRequired
    };

    heading = [
        'Comments', 'Upvotes', '', 'Title', 'Domain', 'Posted By', 'Posted When?'
    ];

    page = 1;
    getUpvotes(authorId) {
        const { upvotes } = this.props;
        if (upvotes && upvotes[authorId]) {
            return +upvotes[authorId];
        }
        return 0;
    }

    upvote(authorId) {
        this.props.updateUpvotes(authorId);
    }

    loadMoreResults = () => {
        this.page += 1;
        this.props.fetchHackerNewsFeed(this.page);
    }

    hideItem = (authorId) => {
        this.props.hideFeed(authorId);
    }

    renderFeed = () => {
        const { feed, hidden } = this.props;
        return feed
            .filter(feedItem => !hidden[feedItem.authorId])
            .map(feedItem => (
                <TRow key={feedItem.authorId}>
                    <TCell className="comment-count">{feedItem.commentCount}</TCell>
                    <TCell className="upvote-count">{this.getUpvotes(feedItem.authorId)}</TCell>
                    <TCell className="upvote-control">
                        <Button onClick={() => this.upvote(feedItem.authorId)}>
                            <span className="caret up"></span>
                            <span className="sr-only">Upvode</span>
                        </Button>
                    </TCell>
                    <TCell className="title">{feedItem.title}</TCell>
                    <TCell className="url">
                        <Anchor href={feedItem.url}>{feedItem.url}</Anchor>
                    </TCell>
                    <TCell className="author">{feedItem.author}</TCell>
                    <TCell className="time">
                        <span>{feedItem.time}</span>
                        <Button onClick={() => this.hideItem(feedItem.authorId)}>[hide]</Button>
                    </TCell>
                </TRow>
            ));
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
                <div className="hacker-news-feed">
                    <Table>
                        <THeading heading={this.heading}></THeading>
                        <TContent>{this.renderFeed()}</TContent>
                    </Table>
                </div>
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
        updateUpvotes,
        fetchHiddenFeeds,
        hideFeed
    })(HomePage),
    loadData
};