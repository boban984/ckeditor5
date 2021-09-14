// import CrmUploadAdapter from './crmUploadAdapter.js';

// function CRM_UploadAdapterPlugin(editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//     // return new CRM_UploadAdapter(loader, 'http://dev.reaktiv.com.mk:8080/api/cms/files/uploadcke');
//     return new CRM_UploadAdapter(loader, 'http://localhost/api/cms/files/uploadcke');
//   };
// }

//    extraPlugins: [CRM_UploadAdapterPlugin],

ClassicEditor
  .create(document.querySelector('#editor'), {
    uploadSettings: { 
      uploadEndpoint: 'xxxxxxxxxx',
      headers: {
        'X-CSRF-TOKEN': 'CSFR-Token',
        Authorization: 'Bearer <JSON Web Token>'
      }
    }
  })
  .catch(error => {
    console.error('There was a problem initializing the editor.', error);
  });

