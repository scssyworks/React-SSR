import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Table from '../../atoms/Table';
import THeading from '../../molecules/THeading';
import TContent from '../../molecules/TContent';
import TRow from '../../atoms/TRow';
import TCell from '../../atoms/TCell';
import Button from '../../atoms/Button';
import Anchor from '../../atoms/Anchor';
import { connect } from 'react-redux';
import { updateUpvotes, hideFeed } from '../../actions';

class Feed extends PureComponent {
    static propTypes = {
        feed: PropTypes.arrayOf(
            PropTypes.object
        ).isRequired,
        hidden: PropTypes.object.isRequired,
        upvotes: PropTypes.object.isRequired,
        updateUpvotes: PropTypes.func.isRequired,
        hideFeed: PropTypes.func.isRequired
    };

    heading = [
        'Comments', 'Upvotes', '', 'Title', 'Domain', 'Posted By', 'Posted When?'
    ];

    hideItem(authorId) {
        this.props.hideFeed(authorId);
    }

    upvote(authorId) {
        this.props.updateUpvotes(authorId);
    }

    getUpvotes(authorId) {
        const { upvotes } = this.props;
        if (upvotes && upvotes[authorId]) {
            return +upvotes[authorId];
        }
        return 0;
    }

    renderFeed() {
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

    render() {
        return (
            <div className="hacker-news-feed">
                <Table>
                    <THeading heading={this.heading}></THeading>
                    <TContent>{this.renderFeed()}</TContent>
                </Table>
            </div>
        );
    }
}

function mapStateToProps({ feed, hidden, upvotes }) {
    return { feed, hidden, upvotes };
}

export default connect(mapStateToProps, { updateUpvotes, hideFeed })(Feed);