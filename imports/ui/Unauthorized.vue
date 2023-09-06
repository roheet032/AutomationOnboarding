<template>
  <div class="unauthorized">
    <div class="content">
      <div class="icon">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <h1>404!!! PAGE NOT FOUND</h1>
      <p>
        Oops!! The page you are searching is not found.
        </p>
      <router-link to="/" class="btn btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
.unauthorized {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4; 
}

.content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(29, 10, 10, 0.1);
  text-align: center;
}

.icon {
  color: #d9534f;
  font-size: 64px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: red;
  margin-bottom: 10px;
}

p {
  font-size: 20px;
  color: #777;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.4s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.fa-exclamation-circle {
  font-size: 100px;
}
</style>
