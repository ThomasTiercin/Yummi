import React from 'react';

import { userService } from '../_services';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        userService.logout();
    }    
}

export { Logout }; 