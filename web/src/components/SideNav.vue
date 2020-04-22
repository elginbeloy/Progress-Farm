<template>
  <div class="side-nav">
    <div class="side-nav__logo">
      <span class="icon-layers" />
    </div>
    <router-link to="/">
      <div class="side-nav__link">
        <span class="icon-list" />
      </div>
    </router-link>
    <router-link to="/land">
      <div class="side-nav__link">
        <span class="icon-map" />
      </div>
    </router-link>
    <router-link to="/achievements">
      <div class="side-nav__link">
        <span class="icon-award" />
      </div>
    </router-link>
    <router-link to="/archive">
      <div class="side-nav__link">
        <span class="icon-archive" />
      </div>
    </router-link>
    <router-link to="/awards">
      <div class="side-nav__link">
        <span class="icon-gift" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideNav extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  z-index: 10;
  padding: 40px 20px;

  background-color: #ffffff;
  box-shadow: 0 0 4px 2px #00000010;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: cetner;
}

.side-nav__logo {
  position: relative;
  width: 60px;
  height: 60px;
  margin-bottom: 40px;

  font-size: 32px;
  color: #1a45ff;

  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  width: auto;
  height: auto;
  display: block;
  margin-bottom: 40px;
}

.router-link-exact-active .side-nav__link {
  background-color: #1a45ff20;
  color: #1a45ff;
}

.side-nav__link {
  position: relative;
  width: 60px;
  height: 60px;

  border-radius: 8px;
  color: #000000;
  font-size: 22px;
  transition: 0.1s linear all;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #1a45ff;
  }
}
</style>
