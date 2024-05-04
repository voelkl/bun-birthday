<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      // Make a call to the backend for login
      fetch('http://server:4000/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      })
    }
  }
}
</script>
