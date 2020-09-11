<template>
  <v-app>
    <v-navigation-drawer app dark color="red darken-2">
      <v-list nav>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ appName }}</v-list-item-title>
            <v-list-item-subtitle>Admin page</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-spacer></v-spacer>

        <v-list-item-group :model="model" active-class="selected">
          <v-list-item v-for="route in routes" :key="route.title" link :to="route.link">
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ route.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-footer id="nav-footer" fixed>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-text>{{ year }} - Maxence Vérité</v-card-text>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12">
                  <v-btn icon color="indigo" :href="social.linkedin">
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn>
                  <v-btn icon color="grey" :href="social.github">
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                  <v-btn icon color="orange" :href="social.gitlab">
                    <v-icon>mdi-gitlab</v-icon>
                  </v-btn>
                  <v-tooltip v-model="show" top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon color="red" v-on="on">
                        <v-icon>mdi-gmail</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ social.gmail }}</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-footer>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  computed: {
    year: () => {
      return new Date().getFullYear();
    }
  },

  data() {
    return {
      appName: "Facts API Access",
      routes: [
        { title: "Facts", icon: "fa-scroll", link: "/admin/facts" },
        { title: "Tags", icon: "fa-tags", link: "/admin/tags" }
      ],
      model: "1",
      social: {
        linkedin: "https://www.linkedin.com/in/maxence-verite/",
        github: "https://github.com/MaxenceVerite/",
        gitlab: "https://gitlab.com/verite.maxence",
        gmail: "p.verite.maxence@gmail.com"
      },
      show: false
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212121;
}
.selected {
  background-color: #212121 !important;
  transform: scaleX(1.05);
}
#nav-footer {
  border-top: white 1px solid;
}
</style>
