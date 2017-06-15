import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils
} from 'admin-on-rest';

export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        // console.log("convertRESTRequestToHTTP params: ", params);
        // console.log("convertRESTRequestToHTTP type: ", type);
        switch (type) {
            case GET_LIST: {
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                let sort = field;
                if (field === 'id') {
                    sort = "_id";
                }

                if (order === 'DESC') {
                    sort = "-" + sort;
                }
                const query = {
                    ...params.filter,
                    sort: sort,
                    page: page,
                    limit: perPage
                };
                url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
                break;

            }
            case GET_ONE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            }
            //
            // case GET_REPORT: {
            //     url = `${apiUrl}/${resource}`;
            //     break;
            // }
            //
            case GET_MANY_REFERENCE: {
                const {page, perPage} = params.pagination;
                const {field, order} = params.sort;
                let sort = field;
                if (order === 'DESC') {
                    sort = "-" + field;
                }
                const query = {
                    ...params.filter,
                    [params.target]: params.id,
                    sort: sort,
                    page: page,
                    limit: perPage
                };
                url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
                break;

            }
            // case GET_MANY: {
            //   const query = {'ids': params.ids};
            //   url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
            //   break;
            // }
            case UPDATE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;

            }
            case CREATE: {
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;

            }
            case DELETE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            }
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        // console.log("convertRESTRequestToHTTP url: ", url);
        return {url, options};
    };

    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const {headers, json} = response;
        // console.log("convertHTTPResponseToREST JSON: ", json);
        // console.log("convertHTTPResponseToREST TYPE: ", type);
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                return {
                    data: json.data.map(x => ({...x, id: x._id})),
                    total: parseInt(json.total, 10)
                };
            case CREATE:
            case GET_ONE:
            case UPDATE:
                return {data: {...json.data, id: json.data._id}};
            case DELETE:
                return {data: {...params.data}};
            // case GET_MANY:
            //     return {
            //         data : json.data.map(x => ({...x, id: x._id}))
            //     };
            default:
                return {data: {...json.data, id: json.data._id}};
        }
    };

    return (type, resource, params) => {
        // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
        if (type === GET_MANY) {
            return Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`)))
                .then(responses => ({data: responses.map(r => ({...r.json.data, id: r.json.data._id}))}));
        }
        const {url, options} = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => {
                return convertHTTPResponseToREST(response, type, resource, params)
            });
    }
}
