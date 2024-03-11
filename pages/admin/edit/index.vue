<template>
  <div>
    <div class="container w-[1000px] mx-auto mt-5 bg-slate-400">
      <h1 class="text-center text-2xl font-bold mb-5">CRUD Ex1</h1>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-solid bg-white table-auto">
        <thead class="text-xl text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-5">ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody class="text-lg text-center">
          <tr v-for="user in users" :key="user.user_id">
            <td>{{ user._id }}</td>
            <td>{{ user.user_Name }}</td>
            <td>{{ user.user_Lastname }}</td>
            <td>{{ user.user_Username }}</td>
            <td>
              <span v-if="user.user_Status === 'N'">Active</span>
              <span v-else>Inactive</span>
            </td>
            <td>
              <button @click="editUser(user)" class="bg-orange-300 p-2 mr-2 rounded-md">Edit</button>
              <button @click="deleteUser(user._id)" class="bg-red-300 p-2 rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <EditModal v-if="showEditModal" @close="showEditModal = false; fetchUsers()" :user="editedUser" />
      <button @click="showRegisterModal = true" class="p-4 bg-green-300 text-center w-full mx-auto">Add User</button>
      <RegisterModal :showModal.sync="showRegisterModal" @close="showRegisterModal = false; fetchUsers()" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      showEditModal: false,
      showRegisterModal: false,
      editedUser: null,
    };
  },
  methods: {
  async deleteUser(id) {
    const result = await Swal.fire({
      title: 'ยืนยันการลบผู้ใช้?',
      text: "คุณต้องการลบผู้ใช้นี้หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.value) {
      try {
        const response = await fetch(`https://odd-gold-chipmunk-tutu.cyclic.app/user/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('เกิดข้อผิดพลาดในการลบผู้ใช้');
        }

        this.fetchUsers();
        Swal.fire({
          title: 'ลบผู้ใช้สำเร็จ',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: error.message,
          icon: 'error',
        });
      }
    }
  },

  async editUser(user) {
    this.editedUser = { ...user };
    this.showEditModal = true;
  },


  async fetchUsers() {
    try {
      const response = await fetch('https://odd-gold-chipmunk-tutu.cyclic.app/user/data');
      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการเรียกข้อมูล');
      }
      const data = await response.json();
      this.users = data;
    } catch (error) {
      console.error(error);
    }
  },
},
created() {
  this.fetchUsers();
},

};
</script>

<style scoped>
/* Add any custom styling */
</style>
