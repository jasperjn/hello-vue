import Vue, { ComponentOptions } from 'vue';

var MyComponent = Vue.extend({
});

var myComponentInstance = new MyComponent({
    el: `#pre-defined-component`,
    data: {
        message: `test`
    }
});

var data = {
    a: 1
};

var vm = new Vue({
    el: `#instance-properties-methods`,
    data
}) as Vue & typeof data;

console.log(vm.a === data.a);

vm.a = 2;
console.log(data.a);

data.a = 3;
console.log(vm.a);

console.log(vm.$data === data);
console.log(vm.$el === document.getElementById('instance-properties-methods'));

vm.$watch('a', function (newVal, oldVal) {
    console.log(`a changes from ${oldVal} to ${newVal}`);
});

data.a = 4;

// =============================================================================
// Instance Lifecycle Hooks
// https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
// =============================================================================

var vm2 = new Vue({
    el: '#instance-lifecycle-hooks',
    data: {
        a: 1
    },
    beforeCreate() {
        console.log(`beforeCreated`);
    },
    created() {
        console.log(`created`);
        console.log(`a is: ${this.a}`);
    },
    beforeMount() {
        console.log(`beforeMount`);
    },
    mounted() {
        console.log(`mounted`);
    },
    beforeUpdate() {
        console.log(`beforeUpdate`);
    },
    updated() {
        console.log(`a is: ${this.a}`);
        console.log(`updated`);
    },
    beforeDestroy() {
        console.log(`beforeDestroy`);
    },
    destroyed() {
        console.log(`destroyed`);
    }
} as ComponentOptions<Vue & typeof data>) as Vue & typeof data;

vm2.a = 2;
vm2.$destroy();