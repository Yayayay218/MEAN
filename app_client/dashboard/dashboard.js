import React, {Component} from 'react';
import withWidth from 'material-ui/utils/withWidth';
import {AppBarMobile, GET_LIST, GET_MANY, fetchUtils} from 'admin-on-rest';
import customRestClient from '../rest/restClient';

import Welcome from './welcome';
import NbCategories from './nbCategories';
import NbPlaylists from './nbPlaylists';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'})
    }

    return fetchUtils.fetchJson(url, options);
};

const apiUrl = '/api';

const restClient = customRestClient(apiUrl, httpClient);

const styles = {
    welcome: {marginBottom: '2em'},
    flex: {display: 'flex', marginTop: '1em' ,marginLeft:'0.5em'},
    nextFlex: {display: 'flex', marginTop: '2em'},
    leftCol: {flex: 1, marginRight: '1em'},
    rightCol: {flex: 1, marginLeft: '1em'},
    colSub: {flex: 1, marginRight: '0em'},
    singleCol: {marginTop: '2em'},
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        restClient(GET_LIST, 'category', {
            filter: {},
            sort: {field: 'date', order: 'DESC'},
            pagination: {page: 1, perPage: 50},
        })
            .then(data => this.setState({nbCategories: data.total}));
        restClient(GET_LIST, 'playlist', {
            filter: {},
            sort: {field: 'id', order: 'DESC'},
            pagination: {page: 1, perPage: 50},
        })
            .then(data => this.setState({nbPlaylists: data.total}));
    }

    render() {
        const {
            nbCategories,
            nbPlaylists
        } = {
            nbCategories: this.state.nbCategories,
            nbPlaylists: this.state.nbPlaylists
        };
        const {width} = this.props;
        return (
            <div>
                { width === 1 && <AppBarMobile title="Music Administration"/>}
                <Welcome/>
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.flex}>
                            <NbCategories value={nbCategories}/>
                        </div>
                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.flex}>
                            <NbPlaylists value={nbPlaylists}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withWidth()(Dashboard);
