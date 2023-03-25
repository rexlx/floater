<template>
    <div class="login">
        <div class="tabs is-centered">
            <ul>
                <li :class="{ 'is-active' : !register }" @click.prevent="register = false"><a>login</a></li>
                <li :class="{ 'is-active' : register }" @click.prevent="register = true"><a>new user</a></li>
            </ul>
        </div>
        <div class="card auth has-background-link-light">
        <div class="card-content">
            <div class="title has-text-centered">
                {{ title }}
            </div>
            <form @submit.prevent="onSubmit">
                <div class="field">
                    <label class="label">email</label>
                    <div class="control">
                        <input class="input" type="email" v-model="creds.email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="creds.password">
                    </div>
                </div>
                <div class="field is-grouped is-grouped-right">
                    <p class="control">
                        <button class="button is-primary">
                        enter
                        </button>
                    </p>
                </div>
            </form>
        </div>
</div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useFirestore } from "@/stores/authStore.js";
import { useRouter } from 'vue-router';

const router = useRouter()

const authStore = useFirestore()

const register = ref(false)
const title = computed(() => {
    return register.value ? 'new user' : 'login'
})

const creds = reactive({
    email: '',
    password: ''
})

const onSubmit = () => {
    if (!creds.email || !creds.password) {
        alert('anonymous access is forbidden')
    }
    else {
        if (register.value) {
            authStore.register(creds)
        }
        else {
            // console.log(creds)
            authStore.login(creds)
        }
        router.push("/")
    }
    
}
</script>

<style>
.auth {
    max-width: 400px;
    margin: 0 auto;

}
</style>