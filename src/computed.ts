import Vue, { ComponentOptions } from 'vue';
import axios from 'axios';
import _ from 'lodash';
// =============================================================================
// Basic Example
// https://vuejs.org/v2/guide/computed.html#Basic-Example
// =============================================================================

var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
        reversedMessage() {
            return this.message.split('').reverse().join('');
        }
    }
} as ComponentOptions<Vue & { message: string, reversedMessage: string }>) as Vue & { message: string, reversedMessage: string };

console.log(vm.reversedMessage);
vm.message = 'Goodbye';
console.log(vm.reversedMessage);

// =============================================================================
// Computed Caching vs Methods
// https://vuejs.org/v2/guide/computed.html#Computed-Caching-vs-Methods
// =============================================================================

var vm2 = new Vue({
    el: '#computed-vs-methods',
    data: {
        message: 'Hello'
    },
    methods: {
        reversedMessageMethod() {
            return `${this.message.split('').reverse().join('')} ${Math.random()}`;
        }
    },
    computed: {
        reversedMessage() {
            return `${this.message.split('').reverse().join('')} ${Math.random()}`;
        }
    }
} as ComponentOptions<Vue & { message: string, reversedMessage: string }>) as Vue & { message: string, reversedMessage: string };

console.log(vm2.reversedMessage);
vm2.message = 'Goodbye';
console.log(vm2.reversedMessage);

// =============================================================================
// Computed vs Watched Property
// https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property
// =============================================================================

interface WatchedVM extends Vue {
    firstName: string;
    lastName: string;
    fullName: string;
}

var vm3 = new Vue({
    el: '#demo',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName(val) {
            this.fullName = `${val} ${this.lastName}`;
        },
        lastName(val) {
            this.fullName = `${this.lastName} ${val}`;
        }
    }
} as ComponentOptions<WatchedVM>);

var vm4 = new Vue({
    el: '#demo2',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
} as ComponentOptions<WatchedVM>);

// =============================================================================
// Computed Setter
// https://vuejs.org/v2/guide/computed.html#Computed-Setter
// =============================================================================

var vm5 = new Vue({
    el: '#computed-setter',
    data: {
        firstName: 'Foo',
        lastName: 'Bar'
    },
    computed: {
        fullName: {
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(newValue:string) {
                var names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
} as ComponentOptions<Vue & WatchedVM>);

interface WatchExampleVM extends Vue {
    question: string;
    answer: string;
    getAnswer(): void;
}

var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        question(newQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },
    methods: {
        getAnswer: _.debounce(function(this: WatchExampleVM) {
            if (this.question.indexOf('?') === -1) {
                this.answer = 'Questions usually contain a question mark. ;-)';
                return;
            }
            this.answer = 'Thinking...';
            axios.get('https://yesno.wtf/api')
                .then(response => {
                    this.answer = _.capitalize(response.data.answer);
                })
                .catch(error => {
                    this.answer = 'Error! Could not rearch the API.' + error
                });
        }, 500)
    }
} as ComponentOptions<WatchExampleVM>) as WatchExampleVM;