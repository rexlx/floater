<template>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
        <div class="container is-max-desktop px-2">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4">floater</div>
                    <a
                    role="button"
                    @click.prevent="showMobileNav = !showMobileNav"
                    class="navbar-burger"
                    :class="{'is-active' : showMobileNav}"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
            <div id="navbarBasicExample" class="navbar-menu" :class="{'is-active' : showMobileNav}">
                <div class="navbar-start">
                    <button class="button is-small is-info mt-3 ml-3" @click="authStore.logout">logout</button>
                </div>
            <div class="navbar-end">
                <RouterLink class="navbar-item" to="/" active-class="is-active">
                notes
                </RouterLink>
                <RouterLink class="navbar-item" to="/stats" active-class="is-active">
                errata
                </RouterLink>
            </div>
        </div>
  </div>
</nav>
</template>

<script setup>
    import { ref } from "vue";
    import { useFirestore } from "@/stores/authStore.js";

    const authStore = useFirestore()
    const showMobileNav = ref(false)
</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>