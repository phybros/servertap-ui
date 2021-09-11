<template>
  <div>
    <v-card class="ma-3">
      <v-card-title>
        <v-icon class="mr-1">mdi-list-status</v-icon>
        Status
      </v-card-title>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Name</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{ server.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>MOTD</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{ server.motd }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Version</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{ server.version }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card class="ma-3">
      <v-card-title>
        <v-icon class="mr-1">mdi-heart</v-icon>
        Health
      </v-card-title>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Ticks Per Second (TPS)</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{ server.tps }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Memory</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{
              bytesToHuman(server.health.maxMemory - server.health.freeMemory)
            }}
            /
            {{ bytesToHuman(server.health.maxMemory) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Uptime</v-list-item-title>
          <v-list-item-subtitle>
            <v-skeleton-loader
              v-if="this.$store.state.appLoading"
              type="text"
              width="200"
            ></v-skeleton-loader>
            {{ convertTime(server.health.uptime) }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    server: {},
  }),

  mounted() {
    this.getServerInfo();
  },

  methods: {
    getServerInfo() {
      axios
        .get(`${process.env.VUE_APP_SERVERTAP_URL}/server`)
        .then((response) => (this.server = response.data))
        .catch((error) => console.log(error));
    },

    bytesToHuman(numBytes) {
      let units = ["B", "KB", "MB", "GB", "TB", "PB"];

      let i = 0;

      for (i; numBytes > 1024; i++) {
        numBytes /= 1024;
      }

      return numBytes.toFixed(1) + " " + units[i];
    },

    convertTime(seconds) {
      seconds = parseInt(seconds, 10);
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds - hours * 3600) / 60);
      seconds = seconds - hours * 3600 - minutes * 60;
      if (hours > 0) {
        if (minutes > 0) {
          return `${hours}h ${minutes}m ${seconds}s`;
        } else {
          return `${hours}h ${seconds}s`;
        }
      }
      if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
      }
      return `${seconds}s`;
    },
  },
};
</script>

<style>
</style>
