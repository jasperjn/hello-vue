import Vue, { ComponentOptions } from 'vue';

var app = new Vue({
    el: `#app`,
    data: {
        message: `Hello Vue.js!`
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: `You loaded this page on ${new Date()}`
    }
});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

interface App4Component extends Vue {
    todos: { text: string }[];
}

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            {text: 'Learn Javascript'},
            {text: 'Learn Vue'},
            {text: 'Build something awesome'}
        ]
    }
} as ComponentOptions<App4Component>);


(app4 as any).todos.push({ text: 'New Item' });

interface App5Component extends Vue {
    message: string;
    reverseMessage(): void;
}

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: `Hello Vue.js`
    },
    methods: {
        reverseMessage() {
            this.message = this.message.split('').reverse().join('');
        }
    }
} as ComponentOptions<App5Component>);

var app6 = new Vue({
    el: `#app-6`,
    data: {
        message: `Hello Vue!`
    }
});

Vue.component('todo-item-simple', {
    template: `<li>This is a todo </li>`
});

var app7 = new Vue({
    el: `#app-7`
});

Vue.component('todo-item', {
    template: `<li>{{todo.text}}</li>`,
    props: ['todo']
});

var app8 = new Vue({
    el: `#app-8`,
    data: {
        groceryList: [
            {text: `Vegetables`},
            {text: `Cheese`},
            {text: `Whatever else humans are supposed to eat`}
        ]
    }
});