<template>
    <nav class="bg-blue-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <img src="https://1417094351.rsc.cdn77.org/articles/2585/2584018/thumbnail/large.gif?3" alt="" class="w-10 h-10 rounded-full">
            <div class="text-white text-lg font-semibold ml-2">CRUD Test</div>
          </div>
          <div class="block md:hidden">
            <button @click="toggleMenu" class="text-white hover:text-gray-100 focus:outline-none focus:text-gray-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="hidden md:block">
            <ul class="flex space-x-4 text-white">
              <li><NuxtLink to="/admin/edit">หน้าจัดการสมาชิก</NuxtLink></li>
              <li><NuxtLink to="/register">สมัครสมาชิก</NuxtLink></li>
              <li><NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
  
      <div :class="menuClasses" class="md:hidden mx-4">
        <ul class="flex flex-col space-y-3 p-2">
          <li><NuxtLink to="/admin/edit" class="text-white">หน้าจัดการสมาชิก</NuxtLink></li>
          <li><NuxtLink to="/register" class="text-white">สมัครสมาชิก</NuxtLink></li>
          <li><NuxtLink to="/login" class="text-white">เข้าสู่ระบบ</NuxtLink></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    computed: {
      menuClasses() {
        return {
          'block': this.isMenuOpen,
          'hidden': !this.isMenuOpen,
        };
      },
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    },
  };
  </script>
  