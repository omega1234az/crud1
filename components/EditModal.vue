<template>
  <div v-if="user" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-md p-8 w-96">
      <h2 class="text-xl font-bold mb-4">Edit User</h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label for="name" class="block font-medium">Name:</label>
          <input type="text" v-model="editedUser.user_Name" id="name"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="lastname" class="block font-medium">Last Name:</label>
          <input type="text" v-model="editedUser.user_Lastname" id="lastname"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="status" class="block font-medium">Status:</label>
          <select v-model="editedUser.user_Status" id="status"
            class="w-full mt-1 p-2 border border-gray-300 rounded-md">
            <option value="N">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          <button @click="cancelEdit" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    showModal: Boolean,
  },
  data() {
    return {
      editedUser: { ...this.user },
    };
  },
  methods: {
    async saveUser() {
      try {
        const response = await fetch(`https://odd-gold-chipmunk-tutu.cyclic.app/user/${this.editedUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedUser),
        });

        if (!response.ok) {
          throw new Error('Failed to edit user');
        }

        Swal.fire({
            title: 'แจ้งเตือน!',
            text: 'แก้ไขข้อมูลสำเร็จ',
            icon: 'success',
            timer: 3000
          });
        this.$emit('close');
      } catch (error) {
        console.error(error);
      }
    },
    cancelEdit() {
      // Close the modal without saving changes
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
/* Add any custom styling for the modal */
</style>
