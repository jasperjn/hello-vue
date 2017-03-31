import Vue, { ComponentOptions } from 'vue';

// =============================================================================
// Basic Usage
// https://vuejs.org/v2/guide/forms.html#Basic-Usage
// =============================================================================

new Vue({
    el: '#text',
    data: {
        message: ''
    }
});

new Vue({
    el: '#multiline-text',
    data: {
        message: ''
    }
});

new Vue({
    el: '#checkboxs',
    data: {
        checked: false,
        checkedNames: []
    }
})

new Vue({
    el: '#radio',
    data: {
        picked: null
    }
})

new Vue({
    el: '#select',
    data: {
        selected: '',
        selects: [],
        options: [
            { text: 'One', value: 'A' },
            { text: 'Two', value: 'B' },
            { text: 'Three', value: 'C' }
        ]
    }
})

// =============================================================================
// Value Bindings
// https://vuejs.org/v2/guide/forms.html#Value-Bindings
// =============================================================================

new Vue({
    el: '#value-bindings-1',
    data: {
        picked: '',
        toggle: false,
        selected: ''
    }
});

new Vue({
    el: '#value-bindings-2',
    data: {
        toggle: 'no',
        a: 'yes',
        b: 'no',
        pick: 'no',
        selected: ''
    }
});

// =============================================================================
// Modifier
// https://vuejs.org/v2/guide/forms.html#Modifiers
// =============================================================================

new Vue({
    el: '#modifiers',
    data: {
        msg: '',
        age: 0
    }
})