import Vue, {ComponentOptions} from 'vue';

// =============================================================================
// Object Syntax
// https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax
// =============================================================================

new Vue({
    el: '#classes',
    data: {
       isActive: true
   }
});

new Vue({
    el: '#classes-2',
    data: {
       isActive: true
   }
});

new Vue({
    el: '#class-object',
    data: {
        classObject: {
            isActive: true
        }
    }
});

interface ClassComputedVM extends Vue{
    isActive: boolean;
    error?: {
        type: string;
    };
}

new Vue({
    el: '#class-computed',
    data: {
        isActive: true,
        error: null
    },
    computed: {
        classObject() {
            return {
                active: this.isActive && !this.error,
                'text-danger': this.error && this.error.type === 'fatal'
            };
        }
    }
} as ComponentOptions<ClassComputedVM>);

// =============================================================================
// Array Syntax
// https://vuejs.org/v2/guide/class-and-style.html#Array-Syntax
// =============================================================================

new Vue({
    el: '#array-syntax',
    data: {
        activeClass: 'active',
        errorClass: 'text-danger'
    }
});

new Vue({
    el: '#array-syntax-toggle',
    data: {
        isActive: false,
        activeClass: 'active',
        errorClass: 'text-danger'
    }
});

new Vue({
    el: '#array-syntax-toggle2',
    data: {
        isActive: true,
        activeClass: 'active',
        errorClass: 'text-danger'
    }
});

// =============================================================================
// With Component
// https://vuejs.org/v2/guide/class-and-style.html#With-Components
// =============================================================================

Vue.component('my-component', {
    template: `<p class="foo bar">Hi</p>`
});

new Vue({
    el: '#with-components',
    data: {
        isActive: true,
        activeClass: 'active',
        errorClass: 'text-danger'
    }
});

// =============================================================================
// Binding Inline Styles
// https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles
// =============================================================================

new Vue({
    el: '#inline-styles',
    data: {
        activeColor: 'red',
        fontSize: 30
    }
});

new Vue({
    el: '#inline-styles-object',
    data: {
        styleObject: {
            color: 'red',
            fontSize: '30px'
        }
    }
});

// =============================================================================
// Auto-prefixing
// https://vuejs.org/v2/guide/class-and-style.html#Auto-prefixing
// =============================================================================

new Vue({
    el: '#inline-styles-array-syntax',
    data: {
        baseStyles: {
            color: 'red',
            fontSize: '30px'
        },
        overridingStyles: {
            color: 'green',
            appearance: 'none' // rendered -webkit-appearance
        }
    }
});
