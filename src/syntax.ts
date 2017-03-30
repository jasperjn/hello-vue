import Vue, {ComponentOptions} from 'vue';

// =============================================================================
// Text
// https://vuejs.org/v2/guide/syntax.html#Text
// =============================================================================

var textVm = new Vue({
    el: '#text',
    data: {
        msg: `Some text`
    }
} as ComponentOptions<Vue & { msg: string }>) as Vue & { msg: string };

textVm.msg = `Text changed`;

var text2Vm = new Vue({
    el: '#text-2',
    data: {
        msg: `Some text (v-once)`
    }
} as ComponentOptions<Vue & { msg: string }>) as Vue & { msg: string };

text2Vm.msg = `Will not change`;

var rawVm = new Vue({
    el: '#rawHtml',
    data: {
        rawHtml: `<h1>Raw Html</h1><p>Hello Vue</p>`
    }
});

// =============================================================================
// Attributes
// https://vuejs.org/v2/guide/syntax.html#Attributes
// =============================================================================

var attrVm = new Vue({
    el: '#attr',
    data: {
        dynamicId: 'attr-child-1'
    }
} as ComponentOptions<Vue & { dynamicId: string }>) as Vue & { dynamicId: string };

attrVm.dynamicId = 'attr-chd-1';

new Vue({
    el: '#attr-2',
    data: {
        someDynamicCondition: true
    }
} as ComponentOptions<Vue & { someDynamicCondition: boolean }>) as Vue & { someDynamicCondition: boolean };

// =============================================================================
// Using Javascript Expressions
// https://vuejs.org/v2/guide/syntax.html#Using-JavaScript-Expressions
// =============================================================================
new Vue({
    el: '#expressions',
    data: {
        number: 1,
        ok: false,
        message: `Some messages`,
        id: 'chd-1'
    }
});

// =============================================================================
// Directives
// https://vuejs.org/v2/guide/syntax.html#Directives
// =============================================================================

new Vue({
    el: '#directives',
    data: {
        seen: true
    },
    methods: {
        seenToggle() {
            this.seen = !this.seen;
        }
    }
} as ComponentOptions<Vue & { seen: boolean }>);

// =============================================================================
// Arguments
// https://vuejs.org/v2/guide/syntax.html#Arguments
// =============================================================================

new Vue({
    el: '#arguments',
    data: {
        url: 'https://vuejs.org'
    },
    methods: {
        doSomething() {
            alert('you click me');
        },
        onSubmit() {
            setTimeout(function() {
                alert('prevented');
            }, 1000);
        }
    }
});

// =============================================================================
// Filters
// https://vuejs.org/v2/guide/syntax.html#Filters
// =============================================================================

new Vue({
    el: '#filters',
    data: {
        message: 'some messages',
        rawId: 'filter-chld-2'
    },
    filters: {
        capitalize(value: string) {
            if (!value) {
                return '';
            };
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        formatId(value: string) {
            if (!value) {
                return '';
            };
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        reverse(value:string) {
            return value.split('').reverse().join('');
        },
        slice(value: string, startPos: number) {
            return value.slice(startPos);
        }
    }
});

// =============================================================================
// Shorthands
// https://vuejs.org/v2/guide/syntax.html#Filters
// =============================================================================
new Vue({
    el: '#shorthands',
    data: {
        url: 'https://vuejs.org'
    },
    methods: {
        doSomething() {
            alert('you click me');
        }
    }
});