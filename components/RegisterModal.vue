<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-md p-8 w-96">
      <h2 class="text-xl font-bold mb-4">Register User</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-4">
          <label for="username" class="block font-medium">Username:</label>
          <input type="text" v-model="username" id="username"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block font-medium">Password:</label>
          <input type="password" v-model="password" id="password"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="name" class="block font-medium">Name:</label>
          <input type="text" v-model="name" id="name"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="lastname" class="block font-medium">Last Name:</label>
          <input type="text" v-model="lastname" id="lastname"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
          <button @click="cancelRegister" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      username: '',
      password: '',
      name: '',
      lastname: '',
    };
  },
  watch: {
    showModal(newVal) {
      if (!newVal) {
        // Reset values when modal is closed
        this.username = '';
        this.password = '';
        this.name = '';
        this.lastname = '';
      }
    },
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch(`http://localhost:5000/user/register`, {
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
          throw new Error('Failed to register user');
        }
        Swal.fire({
            title: 'แจ้งเตือน!',
            text: 'สมัครสำเร็จ',
            icon: 'success',
            timer: 3000
          });
        this.$emit('close'); // Emitting 'close' event to parent
      } catch (error) {
        console.error(error);
      }
    },
    cancelRegister() {
      this.$emit('close'); // Emitting 'close' event to parent
    },
  },
};
</script>

<style scoped>
/* Add any custom styling for the modal */
</style>
