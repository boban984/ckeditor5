export default class BifidexUploadAdapter {
    constructor(loader, uploadSettings) {
        // The file loader instance to use during the upload.
        this.loader = loader;

        this.uploadSettings = uploadSettings;
    }

    // Starts the upload process.
    upload() {
        // Return a promise that will be resolved when the file is uploaded.
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
        }));
    }

    // Aborts the upload process.
    abort() {
        // Reject the promise returned from the upload() method.
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        let headers = this.uploadSettings.headers;

        xhr.withCredentials = true;
        xhr.open('POST', this.uploadSettings.uploadEndpoint, true);
        if (headers !== null) {
            for (let key in headers) {
                if (typeof (headers[key]) === 'function') {
                    xhr.setRequestHeader(key, headers[key]());
                } else {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }

        xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
 
            if (!response || response.error || response.exceptionMessage) {
                if(response.exceptionMessage) {
                    return reject(response.message);
                }
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // response.urls = {
            // 	default: 'http://example.com/images/image–default-size.png',
            // 	'160': '...',
            // 	'500': '...',
            // 	// ...
            // 	'1052': 'http://example.com/images/image–default-size.png'
            // }
            resolve({ default: response.url });
        });

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used to display the upload progress bar in the editor user interface.
        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    // Prepares the data and sends the request.
    _sendRequest(file) {
        // Prepare the form data.
        const data = new FormData();

        data.append('upload', file);

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send(data);
    }
}
