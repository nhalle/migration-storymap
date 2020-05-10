import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

/**
 * General audio player component supports mp3 and ogg files.
 * see https://github.com/justinmc/react-audio-player for customization
 */

const Player = (props) => {

    if (props.url !== undefined && props.url !== "") {
        return (
            <ReactAudioPlayer
                src={props.url}
                controls
            />
        );
    }
    else {
        return null;
    }

};

export default Player;