import Redux from 'react-redux'

const store = Redux.createProvider(() => {
    console.log('test');
});

store.dispatch();

