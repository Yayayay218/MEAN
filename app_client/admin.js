import React from 'react';
import {render} from 'react-dom';
import {
    Admin, Resource, fetchUtils, Delete
} from 'admin-on-rest';

import {CategoryList, CategoryCreate, CategoryEdit} from './categories/index';
import {PlaylistList, PlaylistCreate, PlaylistEdit} from './playlists/index';
import {KeywordCreate, KeywordEdit, KeywordList} from './keywords/index';
import {NotificationsList, NotificationsEdit, NotificationsCreate} from './notifications/index';

import {Dashboard} from './dashboard';

//  Import REST APIs
import customRestClient from './rest/restClient';
import addUploadFeature from './rest/addUploadFeature';


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'})
    }
    return fetchUtils.fetchJson(url, options);
};

const apiUrl = '/api';
const restClient = customRestClient(apiUrl, httpClient);
const uploadCapableClient = addUploadFeature(restClient);

render(
    <Admin dashboard={Dashboard} restClient={uploadCapableClient} title="My Dashboard">
        <Resource name="category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete}/>
        <Resource name="playlist" list={PlaylistList} edit={PlaylistEdit} create={PlaylistCreate} remove={Delete}/>
        <Resource name="keyword" list={KeywordList} edit={KeywordEdit} create={KeywordCreate} remove={Delete}/>
        <Resource name="notifications" list={NotificationsList} edit={NotificationsEdit} create={NotificationsCreate} remove={Delete} />
    </Admin>,
    document.getElementById('root')
);
