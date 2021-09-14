import ClassicEditorBase from '@ckeditor/ckeditor5-core/src/plugin'; 
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

class InsertImage extends Plugin {
    init() {
        console.log( 'InsertImage was initialized' );
    }
}