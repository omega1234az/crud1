<template>
    <div class="w-full h-[10vh] grid grid-cols-2 bg-blue-400 items-center">
        <div class="flex items-center gap-5">
            <img src="https://1417094351.rsc.cdn77.org/articles/2585/2584018/thumbnail/large.gif?3" alt="" class="w-[50px] ml-5 rounded-full">
            <div class="text-white text-xl">CRUD Test</div>
        </div>
        
            <ul class="text-xl flex gap-[30px] col-1 justify-end mr-10"> <!-- เพิ่ม justify-end -->
                <li class="text-white"><NuxtLink to="/admin/edit">หน้าจัดการสมาชิก</NuxtLink></li>
                <li class="text-white"><NuxtLink to="/register">สมัครสมาชิก</NuxtLink></li>
                <li class="text-white"><NuxtLink to="/login">เข้าสู่ระบบ</NuxtLink></li>
            </ul>
        
    </div>
</template>
