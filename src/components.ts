import Vue, { ComponentOptions, Component } from 'vue';
import Async from './components-async';
import './tree-folder';

// =============================================================================
// Registration
// https://vuejs.org/v2/guide/components.html#Registration
// =============================================================================

Vue.component('my-component', {
    template: `<div>A custom component!</div>`
})

new Vue({
    el: '#example'
})

// =============================================================================
// Local Registraction
// https://vuejs.org/v2/guide/components.html#Local-Registration
// =============================================================================

var Child = {
    template: `<div>A custom component!</div>`
}

new Vue({
    el: '#local-registraction',
    components: {
        'my-component': Child
    }
})


// =============================================================================
// DOM Template Parsing Caveats
// https://vuejs.org/v2/guide/components.html#DOM-Template-Parsing-Caveats
// =============================================================================

new Vue({
    el: '#parsing-caveats',
    components: {
        'my-row': {
            template: `<tr><td>This is my row</td></tr>`
        }
    }
})

// =============================================================================
// data Must Be a Function
// https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function
// =============================================================================

// Vue.component('my-component-2', {
//     template: `<span>{{message}}</span>`,
//     data: {
//         message: 'hello'
//     }
// })

// new Vue({
//     el:'#data-function'
// })

var data = { counter: 0 };

Vue.component('simple-counter', {
    template: `
        <button @click="counter +=1">{{counter}}</button>
    `,
    data() {
        return data;
    }
})

Vue.component('simple-counter-2', {
    template: `
        <button @click="counter +=1">{{counter}}</button>
    `,
    data() {
        return { counter: 0 };
    }
})

new Vue({
    el: '#example-2'
})

// =============================================================================
// Composing Components
// https://vuejs.org/v2/guide/components.html#Composing-Components
// =============================================================================

Vue.component('child', {
    props: ['message'],
    template: '<span>{{message}}</span>'
})

new Vue({
    el: '#data-props'
})

new Vue({
    el: '#props-cases',
    components: {
        'child': {
            props: ['myMessage'],
            template: '<span>{{myMessage}}</span>'
        }
    }
})

new Vue({
    el: '#literal-vs-dynamic',
    components: {
        child: {
            props: ['myMessage'],
            template: '<span>{{myMessage === 1}}</span>'
        }
    }
})

// =============================================================================
// One Way Data Flow
// https://vuejs.org/v2/guide/components.html#One-Way-Data-Flow
// =============================================================================


var counterChild = {
    props: ['initialCounter', 'size'],
    template: '<span>{{counter}} {{normalizeSize}}</span>',
    data() {
        return {
            counter: this.initialCounter,
            normalizeSize: this.size.trim().toLowerCase()
        };
    }
};


new Vue({
    el: '#one-way-data-flow',
    components: {
        child: counterChild
    }
})

// =============================================================================
// Prop Validation
// https://vuejs.org/v2/guide/components.html#Prop-Validation
// =============================================================================

class CustomInst {
    message = 'hello Vue.js';
}

Vue.component('example', {
    props: {
        propA: Number,
        propB: [String, Number],
        propC: {
            type: String,
            required: true
        },
        propD: {
            type: Number,
            default: 100
        },
        propE: {
            type: Object,
            default() {
                return { message: 'hello' };
            }
        },
        propF: {
            validator(value: number) {
                return value > 10;
            }
        },
        propG: {
            type: CustomInst
        }
    },
    template: `
    <div>
        {{propA}}
        {{propB}}
        {{propC}}
        {{propD}}
        {{propE.message}}
        {{propF}}
        {{propG && propG.message}}
    </div>`
});

new Vue({
    el: '#prop-validation',
    data: {
        customInst: new CustomInst()
    }
})

// =============================================================================
// Using v-on with Custom Events
// https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events
// =============================================================================

interface ButtonCounter extends Vue {
    counter: number;
}

Vue.component('button-counter', {
    template: `<button @click="increment">{{counter}}</button>`,
    data() {
        return { counter: 0 };
    },
    methods: {
        increment() {
            this.counter += 1;
            this.$emit('increment');
        }
    }
} as ComponentOptions<ButtonCounter>)

interface CounterEventExample extends Vue{
    total: number;
}

new Vue({
    el: '#counter-event-example',
    data: {
        total: 0
    },
    methods: {
        incrementTotal() {
            this.total += 1;
        },
        doTheThing() {
            alert('you click me');
        }
    }
} as ComponentOptions<CounterEventExample>);

// =============================================================================
// Form Input Components using Custom Events
// https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
// =============================================================================

interface CurrencyInputSimple extends Vue{
    value: string;
    $refs: {
        input: HTMLInputElement
    }
}

Vue.component('currency-input-simple', {
    template: `
        <span>
            $
            <input
                ref="input"
                :value="value"
                @input="updateValue($event.target.value)" />
        </span>
    `,
    props: ['value'],
    methods: {
        updateValue(value: string) {
            var formattedValue = value.trim().slice(0, value.indexOf('.') + 3);

            if (formattedValue !== value) {
                this.$refs.input.value = formattedValue;
            }

            this.$emit('input', Number(formattedValue));
        }
    }
} as ComponentOptions<CurrencyInputSimple>);

new Vue({
    el: '#currency-input',
    data: {
        price: 0
    }
})

interface CurrencyInput extends Vue {
    value: number;
    $refs: {
        input: HTMLInputElement
    }
}

interface CurrencyValidator {
    format(value: number): string;
    parse(newString: string, oldNumber: number): {
        warning?: string;
        value: string;
        attempt?: string;
    };
}

declare var currencyValidator: CurrencyValidator;


Vue.component('currency-input', {
    template: `
        <div>
            <label v-if="label">{{label}}</label>
            $
            <input ref="input"
                :value="value"
                @input="updateValue($event.target.value)"
                @focus="selectAll"
                @blur="formatValue" />
        </div>
    `,
    props: {
        value: {
            type: Number,
            default: 0
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(value: string) {
            var result = currencyValidator.parse(value, this.value);
            if (result.warning) {
                this.$refs.input.value = result.value;
            }
            this.$emit('input', result.value);
        },
        formatValue() {
            this.$refs.input.value = currencyValidator.format(this.value);
        },
        selectAll(event:Event) {
            setTimeout(function () {
                (event.target as HTMLInputElement).select();
            });
        }
    }
} as ComponentOptions<CurrencyInput>);

interface CurrencyApp extends Vue {
    price: number;
    shipping: number;
    handling: number;
    discount: number;
}

new Vue({
    el: '#app',
    data: {
        price: 0,
        shipping: 0,
        handling: 0,
        discount: 0
    },
    computed: {
        total() {
            return (
                (this.price * 100 +
                    this.shipping * 100 +
                    this.handling * 100 +
                    this.discount * 100
                ) / 100).toFixed(2);
        }
    }
} as ComponentOptions<CurrencyApp>)

// =============================================================================
// Customizing Component v-modal
// https://vuejs.org/v2/guide/components.html#Customizing-Component-v-model
// =============================================================================

Vue.component('my-checkbox', {
    template: `
        <div>
            <input type="checkbox" :checked="checked" />
            {{value}}
        </div>
    `,
    props: {
        checked: Boolean,
        value: String
    },
    model: {
        prop: 'checked',
        event: 'change'
    }
} as ComponentOptions<Vue>);

new Vue({
    el: '#customizing-v-model',
    data: {
        foo: true
    }
})

// =============================================================================
// Non Parent-Child Communication
// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
// =============================================================================

var bus = new Vue();

new Vue({
    el: '#component-a',
    methods: {
        tellB() {
            bus.$emit('a.click');
        }
    }
})

interface B extends Vue{
    counter: number;
}

new Vue({
    el: '#component-b',
    data: {
        counter: 0
    },
    created() {
        bus.$on('a.click', () => {
            this.counter += 1;
        });
    }
} as ComponentOptions<B>);

// =============================================================================
// Content Distribution with Slots
// https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots
// =============================================================================

new Vue({
    el: '#single-slot',
    components: {
        'my-component': {
            template: `<div>
    <h2>I'm the child title</h2>
    <slot>This will only be displated if there is no content to be distributed.</slot>
</div>`
        }
    }
})

new Vue({
    el: '#named-slots',
    components: {
        'app-layout': {
            template: `<div class="container">
            <header>
                <slot name="header">

                </slot>
            </header>
            <main>
                <slot></slot>
            </main>
            <footer>
                <slot name="footer">

                </slot>
            </footer>
        </div>`
        }
    }
})

// =============================================================================
// Scoped Slots
// https://vuejs.org/v2/guide/components.html#Scoped-Slots
// =============================================================================

new Vue({
    el: '#scoped-slots',
    components: {
        child: {
            template: `<div class="child">
    <slot text="hello from child"></slot>
</div>`
        }
    }
})

new Vue({
    el: '#scoped-slots-2',
    components: {
        'my-awesome-list': {
            template: `<ul>
    <slot name="item" v-for="item in items" :text="item.text">
    </slot>
</ul>`,
            props: ['items']
        }
    },
    data: {
        items: [
            {text: 'Foo'},
            {text: 'Bar'}
        ]
    }
})

// =============================================================================
// Dynamic Components
// https://vuejs.org/v2/guide/components.html#Dynamic-Components
// =============================================================================

new Vue({
    el: '#dynamic-components',
    components: {
        home: {
            template: `<div>It's home</div>`,
            data(){
                return {checked: false}
            }
        },
        posts: {
            template: `<div>It's posts</div>`,
            data(){
                return {checked: false}
            }
        },
        archive: {
            template: `<div>It's archive</div>`,
            data(){
                return {checked: false}
            }
        },
        'dynamic-component': {
            template: ``
        }
    },
    data: {
        currentView: 'posts'
    }
})

new Vue({
    el: '#dynamic-components-2',
    data: {
        currentView: {
            template: `<div>
    <p>Welcome home!</p>
</div>`
        }
    }
})

new Vue({
    el: '#dynamic-components-3',
    components: {
        home: {
            template: `<div>It's home<input type="radio" v-model="checked" /></div>`,
            data(){
                return { checked: false };
            }
        },
        posts: {
            template: `<div>It's posts<input type="radio" v-model="checked" /></div>`,
            data(){
                return { checked: false };
            }
        },
        archive: {
            template: `<div>It's archive<input type="radio" v-model="checked" /></div>`,
            data(){
                return { checked: false };
            }
        },
        'dynamic-component': {
            template: ``
        }
    },
    data: {
        currentView: 'posts'
    }
})

// =============================================================================
// Misc
// https://vuejs.org/v2/guide/components.html#Misc
// =============================================================================

interface RefComponent extends Vue {
    $refs: {
        profile: RefChildComponent
    }
}

interface RefChildComponent extends Vue {
    foo: string;
}

var parent = new Vue({
    el: '#misc',
    components: {
        'user-profile': {
            template: `<div>user profiles here.</div>`,
            data() {
                return {
                    foo: 'bar'
                };
            }
        },
    }
} as ComponentOptions<RefComponent>) as RefComponent;

var child = parent.$refs.profile;
console.log(child.foo);

interface RefForComponent extends Vue {
    $refs: {
        profile: RefChildComponent[]
    }
}

var miscForParent = new Vue({
    el: '#misc-for',
    components: {
        'user-profile': {
            template: `<div>user profiles here.</div>`,
            data() {
                return {
                    foo: 'bar'
                };
            }
        },
    }
} as ComponentOptions<RefForComponent>) as RefForComponent;

var miscForChild = miscForParent.$refs.profile;
console.log(miscForChild[0].foo);

// =============================================================================
// Async Components
// https://vuejs.org/v2/guide/components.html#Async-Components
// =============================================================================

Vue.component('async-example', (resolve, reject) => {
    setTimeout(function() {
        resolve({
            template: `<div>I am async</div>`
        });
    }, 1000);
});

Vue.component('async-import', () => Async);

new Vue({
    el: '#async-timeout',
    components: {
        'async-import-2': () => Async
    }
})

// =============================================================================
// Component Naming Conventions
// https://vuejs.org/v2/guide/components.html#Component-Naming-Conventions
// =============================================================================

new Vue({
    el: '#naming-convention',
    components: {
        'kebab-cased-component': () => Async,
        'camelCasedComponent': () => Async,
        'TitleCasedComponent': () => Async,
        strTemplate: {
            template: '<async-example />'
        }
    }
})

// =============================================================================
// Recursive Components
// https://vuejs.org/v2/guide/components.html#Recursive-Components
// =============================================================================

// Vue.component('unique-name-of-my-component', {
//     template: '<div><unique-name-of-my-component />test</div>'
// });

// new Vue({
//     el: '#recursive-components',
// })

// =============================================================================
// Circular References Between Components
// https://vuejs.org/v2/guide/components.html#Circular-References-Between-Components
// =============================================================================

// Vue.component('tree-folder', {
//     template: `<p>
//     <span>{{folder.name}}</span>
//     <tree-folder-contents :children="folder.children"></tree-folder-contents>
// </p>`,
//     props: ['folder']
// });

// Vue.component('tree-folder-contents', {
//     template: `<ul>
//     <li v-for="child in children">
//         <tree-folder v-if="child.children" :folder="child"></tree-folder>
//         <span v-else="">{{child.name}}</span>
//     </li>
// </ul>`,
//     props: ['children']
// });

new Vue({
    el: '#circular-references',
    data: {
        folder: {
            name: 'test',
            children: [{
                name: 'test-1',
                children: [{
                    name: 'test-1-1',
                    children: [{
                        name: 'test-1-1-1'
                    }, {
                        name: 'test-1-1-2'
                    }]
                }]
            }, {
                name: 'test-2'
            }]
        }
    }
})

// =============================================================================
// Inline Templates
// https://vuejs.org/v2/guide/components.html#Inline-Templates
// =============================================================================

new Vue({
    el: '#inline-template',
    components: {
        'inline-template-conponent': {
            template: '<div>test</div>'
        }
    }
})

// =============================================================================
// X-Templates
// https://vuejs.org/v2/guide/components.html#X-Templates
// =============================================================================

new Vue({
    el: '#x-template',
    components: {
        helloWorld: {
            template: '#hello-world-template'
        }
    }
})

// =============================================================================
// Cheap Static Component with v-once
// https://vuejs.org/v2/guide/components.html#Cheap-Static-Components-with-v-once
// =============================================================================

new Vue({
    el: '#static',
    template: `<div v-once>
    <h1>Terms of Service</h1>
    ...
</div>
    `
})