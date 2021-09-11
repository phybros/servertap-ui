<template>
  <div>
    <v-card class="ma-2">
      <v-card-title>
        Players
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :search="search"
        :items="players"
        :items-per-page="10"
        :loading="this.$store.state.appLoading"
        loading-text="Loading players..."
        sort-by="displayName"
        show-select
        item-key="uuid"
      >
        <template v-slot:item.displayName="{ item }">
          <router-link
            class="text-decoration-none"
            :to="{ name: 'Player', params: { uuid: item.uuid } }"
            >{{ item.displayName }}</router-link
          >
          <v-tooltip v-if="item.op" top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" color="yellow">mdi-crown</v-icon>
            </template>
            <span>{{ item.displayName }} has operator privileges</span>
          </v-tooltip>
        </template>

        <template v-slot:item.whitelisted="{ item }">
          <v-icon v-if="item.whitelisted" color="green"
            >mdi-check-circle</v-icon
          >
          <v-icon v-if="!item.whitelisted" color="red">mdi-close-circle</v-icon>
        </template>

        <template v-slot:item.banned="{ item }">
          <v-icon v-if="item.banned" color="green">mdi-check-circle</v-icon>
          <v-icon v-if="!item.banned" color="red">mdi-close-circle</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Players",
  components: {},
  props: ["players"],
  data: () => ({
    search: "",
    selected: [],
    headers: [
      { text: "Name", value: "displayName" },
      { text: "Whitelisted", value: "whitelisted", align: "center" },
      { text: "Banned", value: "banned", align: "center" },
      { text: "UUID", value: "uuid" },
    ],
  }),
  mounted() {
    this.getPlayers();
  },
  methods: {
    getColor(state) {
      if (state == "running") return "green";
      else if (state == "exited") return "red";
      else return "grey";
    },

    getPlayers() {
      axios
        .get(`${process.env.VUE_APP_SERVERTAP_URL}/players/all`)
        .then((response) => (this.players = response.data))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
</style>
