'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
// import {a} from './tree-shaking'
import './index/index.less'

class Search extends React.Component {

    render () {
        return <div className="search-text">
            Search Text1122ooooooo
        </div>;
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)