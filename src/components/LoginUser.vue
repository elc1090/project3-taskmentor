<template>
  <div class="container">
    <div class="layout-right">
      <div class="login">
        <div class="logo">
          <img :src="logo" style="width: 150px; height: auto" />
        </div>
        <div class="form">
          <n-config-provider :theme-overrides="themeOverrides">
            <n-form>
              <n-form-item path="user.email" label="Email">
                <n-input placeholder="Informe seu email" v-model:value="user.email">
                  <template #suffix>
                    <n-icon size="15"> <mail-outline/> </n-icon>
                  </template>
                </n-input>
              </n-form-item>
              <n-form-item path="user.password" label="Senha">
                <n-input 
                  type="password"
                  placeholder="Informe sua senha" 
                  show-password-on="click"
                  v-model:value="user.password">
                </n-input>
              </n-form-item>
              <div class="btn">
                <n-button color="#232343" class="btn-login" @click="handleSubmitForm">Acessar uma conta</n-button>
              </div>
              <div class="links">
                <div class="link-container">
                  <router-link class="router-login" :to="{ name: 'home'}">Nova conta</router-link>
                </div>
              </div>
              <!-- <div>
                <router-link class="router-user" :to="{ name: 'home'}">Nova conta</router-link>
              </div> -->
            </n-form>
          </n-config-provider>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { NConfigProvider, NIcon } from 'naive-ui';
import { MailOutline } from '@vicons/ionicons5';
import logo from '../assets/logo.png';

export default {
    components: {
      MailOutline,
      NIcon,
      NConfigProvider,
    },
    data() {
        const user = {
          email: '',
          password: ''
        };

        const themeOverrides = {
            common: {
              primaryColor: '#232343',
              primaryColorPressed: '#232343',
              primaryColorHover: '#232343',
            },
        }

        return {
          themeOverrides,
          user,
          logo
        };
    },
    methods: {
        async handleSubmitForm() {
          let apiURL = 'https://project3-taskmentor-api.vercel.app/api/login';
          
          const { data } = await axios.post(apiURL, this.user);
          if(data){
            const { _id } = data;
            this.$router.push({ path: `${_id}/task` }) 
          }

        }
    }
};
</script>

<style>
.container {
  display: flex;
  height: 100vh;
}

.router-user {
  text-decoration: none;
  color: black;
  display: flex;
}

.router-user:hover{
  color: #232343;
}

.btn-login {
  border-radius: 50px;
  width: 50vh;
  margin-top: 10px;
}

.account {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}

.layout-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}


.layout-right {
  background-color:rgba(234, 234, 234, 1);
  flex-direction: column;
}

.logo {
  margin-bottom: 10px;
  display: flex; 
  justify-content: center;
}

.form {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
}

.login {
  background-color: rgba(255, 255, 255, 0.4);
  padding: 30px;
  align-items: center;
}

.ref-label{
  color: #717984;
  text-decoration: none;
}

.ref-label:hover{
  color: #232343;
  text-decoration: none;
}
</style>