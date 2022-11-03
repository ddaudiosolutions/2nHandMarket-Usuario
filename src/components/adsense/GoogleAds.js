import React from 'react';
import {Adsense} from '@ctrl/react-adsense';



const GoogleAds = () => {
    return (

        <Adsense
        client="ca-pub-3091612383015909"
        slot="4520842780"
        style={{ display: 'block' }}
        layout="in-article"
        format="fluid"
        />

    )
}
// responsive and native ads
export default GoogleAds