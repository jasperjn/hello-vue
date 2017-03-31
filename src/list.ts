import Vue, { ComponentOptions } from 'vue';

var example1 = new Vue({
    el: '#example-1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
});

var example2 = new Vue({
    el: '#example-2',
    data: {
        parentMessage: 'Parent',
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
});

var example3 = new Vue({
    el: '#example-3',
    data: {
        parentMessage: 'Parent',
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
});

// =============================================================================
// Template v-for
// https://vuejs.org/v2/guide/list.html#Template-v-for
// =============================================================================

var templateFor = new Vue({
    el: '#template-v-for',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
});

// =============================================================================
// Object v-for
// https://vuejs.org/v2/guide/list.html#Object-v-for
// =============================================================================

new Vue({
    el: '#repeat-object',
    data: {
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    }
});

new Vue({
    el: '#repeat-object-key',
    data: {
        object: {
            firstName: 'John',
            lastName: 'Doe',
            age: 30
        }
    }
});

// =============================================================================
// Range v-for
// https://vuejs.org/v2/guide/list.html#Range-v-for
// =============================================================================

new Vue({
    el: '#range',
    data: {
        max: 15
    }
});

// =============================================================================
// Components and v-for
// https://vuejs.org/v2/guide/list.html#Components-and-v-for
// =============================================================================

Vue.component('todo-item', {
    template: `
    <li>
    {{title}}
    <button @click="$emit('remove')">X</button>
    </li>
    `,
    props: ['title']
});

interface TodoVM extends Vue {
    newTodoText: string;
    todos: { isComplete: boolean, text: string }[];
}

new Vue({
    el: '#todo-list-example',
    data: {
        newTodoText: '',
        todos: [
            { isComplete: false, text: 'Do the dishes' },
            { isComplete: true, text: 'Take out the trash' },
            { isComplete: false, text: 'Now the lawn' }
        ],
        shouldRenderTodos: false
    },
    methods: {
        addNewTodo() {
            this.todos.push({ isComplete: false, text: this.newTodoText });
            this.newTodoText = '';
        }
    }
} as ComponentOptions<TodoVM>);