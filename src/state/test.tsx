import React from 'react';

// Типизация классовых компонент
type ownPropsType = {
    title: string
}

type stateType = {
    error: boolean,
    title: string
}

class Test extends React.Component<ownPropsType, stateType>  {
    state:stateType = {
        error: false,
        title: ''
    }
}

export default Test;