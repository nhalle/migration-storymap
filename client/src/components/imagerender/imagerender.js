import React, { useState } from 'react';
import Img from 'react-image';

const ImageRender = (props) => {
    console.log(props.url);
    if (props.url !== undefined && props.url !== '') {
        return(
            <Img
            src ={props.url} 
            />
        );
    }
    else {
        return null;
    }
   
};

export default ImageRender;