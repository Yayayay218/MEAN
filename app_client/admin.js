import React from 'react';
import {render} from 'react-dom';
import {
    Admin, Resource, fetchUtils, Delete
} from 'admin-on-rest';

import {CategoryList, CategoryCreate, CategoryEdit} from './categories/index';

//  Import REST APIs
import customRestClient from './rest/restClient';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'})
    }
    return fetchUtils.fetchJson(url, options);
};

const apiUrl = '/api';
const restClient = customRestClient(apiUrl, httpClient);

render(
    <Admin restClient={restClient} title="My Dashboard">
        <Resource name="category" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} remove={Delete}/>
    </Admin>,
    document.getElementById('root')
);
