import Vue from 'vue';

let treeFolderContents = Vue.component('tree-folder-contents', {
    template: `<ul>
    <li v-for="child in children">
        <tree-folder v-if="child.children" :folder="child"></tree-folder>
        <span v-else="">{{child.name}}</span>
    </li>
</ul>`,
    props: ['children']
});

export default treeFolderContents;