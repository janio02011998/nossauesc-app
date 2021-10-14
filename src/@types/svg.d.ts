declare module "*.svg" {
    import React from 'react';
    import {Rect, SvgProps} from 'react-native-svg';
    const content: Rect.FC<SvgProps>
    export default content;
} 