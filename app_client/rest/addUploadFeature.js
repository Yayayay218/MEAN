const uploadFile= (params) => {
    console.log("Promise uploadFile: ", params);
    return new Promise((resolve, reject) => {
        if (params.data.file && params.data.file[0] instanceof File) {
            const formData = new FormData();
            formData.append('file', params.data.file[0]);
            fetch('/api/file', {
                method: 'post',
                body: formData,
            })
                .then(response => response.json())
                .then(file => {
                    const tmp = {
                        ...params,
                        data: {
                            ...params.data,
                            coverPhoto: file
                        }
                    };
                    resolve(tmp)
                });
        } else {
            resolve(params);
        }
    });
};

const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if ((type === 'UPDATE' || type === "CREATE") &&
        (resource === 'playlist')) {
        console.log("addUploadCapabilities: ", params.data);
        if (Object.prototype.toString.call(params.data.file) === '[object Array]') {
            console.log("addUploadCapabilities length: ", params.data.file.length);
        } else {
            console.log("addUploadCapabilities length: 0");
        }

        return uploadFile(params)
            .then(params => requestHandler(type, resource, params))
            .catch(error => console.log(error.message));
    } else {
        return requestHandler(type, resource, params);
    }
};

export default addUploadCapabilities;