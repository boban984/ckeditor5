import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import BifidexUploadAdapter from './bifidex-upload-adapter';

export default class BifidexUploadPlugin extends Plugin {

  static get requires() {
    return [FileRepository];
  }

  static get pluginName() {
    return 'BifidexUploadPlugin';
  }

  init() {
    const url = this.editor.config.get('uploadSettings.uploadEndpoint');

    if (!url) {
      console.warn('uploadSettings.uploadEndpoint is not configured')
      return;
    }

    this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new BifidexUploadAdapter(loader, this.editor.config.get('uploadSettings'), this.editor.t);
    };
  }
}