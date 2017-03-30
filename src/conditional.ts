import Vue, { ComponentOptions } from 'vue';
import _ from 'lodash';

// =============================================================================
// v-if
// https://vuejs.org/v2/guide/conditional.html#v-if
// =============================================================================

new Vue({
    el: '#if-binding',
    data: {
        ok: true
    }
});

new Vue({
    el: '#if-else-binding',
    data: {
        ok: false
    }
});

new Vue({
    el: '#template',
    data: {
        ok: false
    }
});

new Vue({
    el: '#else-binding'
});

new Vue({
    el: '#elseif-binding',
    data: {
        type: ['A', 'B', 'C', 'D'][_.random(0, 3)]
    }
});

// =============================================================================
// Controlling Reusable Elements with Key
// https://vuejs.org/v2/guide/conditional.html#Controlling-Reusable-Elements-with-key
// =============================================================================

interface ReusableVM extends Vue {
    loginType: string;
}

new Vue({
    el: '#reusable-elements',
    data: {
        loginType: 'username'
    },
    methods: {
        toggleLoginType() {
            this.loginType = this.loginType === 'username' ? 'email' : 'username';
        }
    }
} as ComponentOptions<ReusableVM>);

new Vue({
    el: '#reusable-elements-key',
    data: {
        loginType: 'username'
    },
    methods: {
        toggleLoginType() {
            this.loginType = this.loginType === 'username' ? 'email' : 'username';
        }
    }
} as ComponentOptions<ReusableVM>);

// =============================================================================
// v-show
// https://vuejs.org/v2/guide/conditional.html#v-show
// =============================================================================

new Vue({
    el: '#show',
    data: {
        ok: true
    }
});