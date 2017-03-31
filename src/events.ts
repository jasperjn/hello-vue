import Vue, { ComponentOptions } from 'vue';

// =============================================================================
// Listening to Events
// https://vuejs.org/v2/guide/events.html#Listening-to-Events
// =============================================================================

var example1 = new Vue({
    el: '#example-1',
    data: {
        counter: 0
    }
});

interface Example2 extends Vue{
    name: string;
    greet(event?: Event): void;
}

var example2 = new Vue({
    el: '#example-2',
    data: {
        name: 'Vue.js'
    },
    methods: {
        greet(event: Event) {
            alert(`Hello ${this.name}`);
            if (event) {
                let target = event.target as HTMLButtonElement;
                alert(target.tagName);
            }
        }
    }
} as ComponentOptions<Example2>) as Example2;

// example2.greet();

// =============================================================================
// Methods in Inline Handlers
// https://vuejs.org/v2/guide/events.html#Methods-in-Inline-Handlers
// =============================================================================

new Vue({
    el: '#example-3',
    methods: {
        say(message: string) {
            alert(message);
        }
    }
});

new Vue({
    el: '#form1',
    methods: {
        warn(message: string, event: Event) {
            if (event) {
                event.preventDefault();
            }
            alert(message);
        }
    }
});

// =============================================================================
// Event Modifiers
// https://vuejs.org/v2/guide/events.html#Event-Modifiers
// =============================================================================

new Vue({
    el: '#modifiers',
    methods: {
        doThis() {
            alert('doThis');
        },
        doThat() {
            alert('doThat');
        },
        onSubmit() {
            alert('onSubmit');
        }
    }
});

// =============================================================================
// Key Modifiers
// https://vuejs.org/v2/guide/events.html#Key-Modifiers
// =============================================================================

Vue.config.keyCodes.f1 = 112;

new Vue({
    el: '#key-modifiers',
    methods: {
        submit() {
            (this.$el as HTMLFormElement).submit();
        }
    }
});