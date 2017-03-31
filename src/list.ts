import Vue, { ComponentOptions } from 'vue';

interface Example1 extends Vue {
    items: { message: string }[];
}

var example1 = new Vue({
    el: '#example-1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
}) as Example1;

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

// =============================================================================
// Array Change Detection
// https://vuejs.org/v2/guide/list.html#Array-Change-Detection
// =============================================================================

// Mutation Methods
// https://vuejs.org/v2/guide/list.html#Mutation-Methods
example1.items.push({ message: 'Baz' });
// items: [{message: 'Foo'}, {message: 'Bar'}, 'Barz']

example1.items.push(...[{ message: 'Barz' }, { message: 'Fooz' }]);
// items: [{message: 'Foo'}, {message: 'Bar'}, {message: 'Baz'}, '{message: Barz'}, {message: 'Fooz'}]

example1.items.pop();
// items: [{message: 'Foo'}, {message: 'Bar'}, {message: 'Baz'}, {message: 'Barz'}]

example1.items.shift();
// items: [{message: 'Bar'}, {message: 'Baz'}, {message: 'Barz'}]

example1.items.unshift({ message: 'Foo' });
// items: [{message: 'Foo'}, {message: 'Bar'}, {message: 'Baz'}, {message: 'Barz'}]

example1.items.splice(0, 1);
// items: [{message: 'Bar'}, {message: 'Baz'}, {message: 'Barz'}]

example1.items.sort((a, b) => {
    if (a.message > b.message) {
        return 1;
    }
    if (a.message < b.message) {
        return -1;
    }
    return 0;
});

example1.items.reverse();

// Replacing An Array
// https://vuejs.org/v2/guide/list.html#Replacing-an-Array
example1.items = example1.items.filter(item => item.message.match(/Bar?z/));

// =============================================================================
// Caveats
// https://vuejs.org/v2/guide/list.html#Caveats
// =============================================================================

// Docs says Vue cannot detect following changes, But it works...
example1.items[2] = { message: 'Should not be worked' };
example1.items[2].message = 'But it works!';

// Recommended
Vue.set(example1.items, 2, { message: 'Works' });
example1.items.splice(2, 1, { message: 'Works also' });

example1.items.splice(2);

// =============================================================================
// Displaying Filtered/Sorted Results
// https://vuejs.org/v2/guide/list.html#Displaying-Filtered-Sorted-Results
// =============================================================================

interface Filtered extends Vue {
    numbers: number[];
}

new Vue({
    el: '#filtered',
    data: { numbers: [1, 2, 3, 4, 5] },
    computed: {
        evenNumbers() {
            return this.numbers.filter(number => number % 2 === 0);
        }
    },
    methods: {
        even(numbers: number[]) {
            return numbers.filter(number => number % 2 === 0);
        }
    }
} as ComponentOptions<Filtered>);