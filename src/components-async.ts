export default new Promise(resolve => {
    setTimeout(function() {
        resolve({
            template: `<div>I am async too.</div>`
        });
    }, 2000);
});