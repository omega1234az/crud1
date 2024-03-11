<template>
  <div class="container mx-auto">
    <section class="login">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[90vh] lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              สมัครสมาชิก
            </h1>
            <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="register">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อ</label>
                <input required type="text" name="name" id="name" v-model="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ชื่อ" required>
              </div>
              <div>
                <label for="lastname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุล</label>
                <input required type="text" name="lastname" id="lastname" v-model="lastname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ชื่อ" required>
              </div>
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input required type="text" name="username" id="username" v-model="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username" required>
              </div>
              <div>
                <label for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input required type="password" name="password" id="password" v-model="password" placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required>
              </div>
              <button type="submit class="py-2 w-full bg-blue-500 rounded-md text-white">สมัครดิไอ้โง่</button>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      username: '',
      password: '',
      name:'',
      lastname:''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('https://odd-gold-chipmunk-tutu.cyclic.app/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            name: this.name,
            lastname: this.lastname,
          }),
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }

        const responseData = await response.json();
        
        if (!responseData.success) {
          throw new Error(responseData.error || 'เกิดข้อผิดพลาดในสมัครสมาชิก');
        } else {
          const token = responseData.token;
          localStorage.setItem('jwt', token);
          await Swal.fire({
            title: 'แจ้งเตือน!',
            text: 'สมัครสมาชิกสำเร็จ',
            icon: 'success',
            timer: 3000
          });
          this.$router.push('/login');
        }
      } catch (error) {
        Swal.fire({
          title: 'แจ้งเตือน!',
          text: 'เกิดข้อผิดพลาด',
          icon: 'error',
          timer: 3000
        });
      }
    }
  }
};
</script>

