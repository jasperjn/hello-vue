import Vue from 'vue';

let treeFolder = Vue.component('tree-folder', {
    template: `<p>
    <span>{{folder.name}}</span>
    <tree-folder-contents :children="folder.children"></tree-folder-contents>
</p>`,
    props: ['folder'],
    beforeCreate() {
        this.$options.components.treeFolderContent = require('./tree-folder-contents');
    }
});;

export default treeFolder;