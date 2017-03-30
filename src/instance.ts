import Vue from 'vue';

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