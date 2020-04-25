export const FETCH_HACKER_NEWS_FEED = 'fetch_hacker_news_feed';

export const fetchHackerNewsFeed = (page) => async (...args) => {
    const [dispatch, , api] = args;
    let URL = '/search_by_date?tags=story';
    if (page) {
        URL += `&page=${page}`;
    }
    const res = await api.get(URL);
    dispatch({
        type: FETCH_HACKER_NEWS_FEED,
        payload: res.data
    });
}

// Temporary local storage code below
export const UPVOTES = 'upvotes';
function getUpvotes() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (typeof Storage !== 'undefined') {
                    const ls = localStorage.getItem(UPVOTES) || '{}';
                    resolve(JSON.parse(ls));
                } else {
                    resolve({}); // Server side resolve
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    });
}
function updateUpvotesLS(authorId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (typeof Storage !== 'undefined') {
                    const ls = JSON.parse(localStorage.getItem(UPVOTES) || '{}');
                    const prevCount = ls[authorId] || 0;
                    if (prevCount < 10) {
                        ls[authorId] = prevCount + 1;
                    }
                    localStorage.setItem(UPVOTES, JSON.stringify(ls));
                    resolve({
                        [authorId]: ls[authorId]
                    }); // Assuming API will return new count for given authorId
                } else {
                    resolve({
                        [authorId]: 0
                    });
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    });
}

function getHidden() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (typeof Storage !== 'undefined') {
                    const ls = localStorage.getItem('hidden') || '{}';
                    resolve(JSON.parse(ls));
                } else {
                    resolve({}); // For server side
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    });
}

function hideFeedLS(authorId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                if (typeof Storage !== 'undefined') {
                    const ls = JSON.parse(localStorage.getItem('hidden') || '{}');
                    ls[authorId] = true;
                    resolve({
                        [authorId]: true
                    });
                } else {
                    resolve({
                        [authorId]: false
                    });
                }
            } catch (e) {
                reject(e);
            }
        }, 0);
    });
};
// Temporary local storage code ends

export const FETCH_UPVOTES = 'fetch_upvotes';
export const fetchUpvotes = () => async (...args) => {
    const [dispatch] = args; // We will use api in future to fetch upvotes using a service
    const res = await getUpvotes(); // To be replaced with API call
    dispatch({
        type: FETCH_UPVOTES,
        payload: res
    });
}

export const UPDATE_UPVOTES = 'update_upvotes';
export const updateUpvotes = (authorId) => async (...args) => {
    const [dispatch] = args; // We will use api in future to increase upvotes using a service
    const res = await updateUpvotesLS(authorId);
    dispatch({
        type: UPDATE_UPVOTES,
        payload: res
    });
}

export const HIDDEN_STATUS = 'hidden_status';
export const fetchHiddenFeeds = () => async (...args) => {
    const [dispatch] = args; // We will use api in future to get hidden status via service
    const res = await getHidden();
    dispatch({
        type: HIDDEN_STATUS,
        payload: res
    });
}

export const HIDE_FEED = 'hide_feed';
export const hideFeed = (authorId) => async (...args) => {
    const [dispatch] = args; // We will use api in future to update hidden status via service
    const res = await hideFeedLS(authorId);
    dispatch({
        type: HIDE_FEED,
        payload: res
    });
}