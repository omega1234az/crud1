<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center justify-center px-6 py-8  md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            เข้าสู่ระบบ
          </h1>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" name="username" id="username" v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="">
            </div>
            <div class="flex items-center justify-between">


              <p href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                มึงลืมรหัสหรอ ?</p>
            </div>
            <button type="submit"
              class="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
              in</button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              มี Account ป่าวไอ้น้อง?
              <NuxtLink class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/register">
                สมัครดิไอ้โง่</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }

        const responseData = await response.json();

        if (!responseData.success) {
          throw new Error(responseData.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        } else {
          const token = responseData.token;
          localStorage.setItem('jwt', token);
          await Swal.fire({
            title: 'แจ้งเตือน!',
            text: 'เข้าสู่ระบบสำเร็จ',
            icon: 'success',
            timer: 3000
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'แจ้งเตือน!',
          text: 'ใส่รหัสให้ถูกดิไอ้สัส',
          icon: 'error',
          timer: 3000
        });
      }
    }
  }
};

</script>

