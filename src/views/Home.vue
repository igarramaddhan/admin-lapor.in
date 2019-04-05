<template>
  <v-container fill-height>
    <v-layout justify-center align-center v-if="laporan == null">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </v-layout>
    <v-layout justify-center align-center v-else-if="laporan.length == 0">
      <p>Masih belum ada laporan</p>
    </v-layout>
    <v-layout v-else column align-start>
      <v-container class="pa-0" fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm6 md3 v-for="(item) in laporan" :key="item.id">
            <v-card tile>
              <v-img :src="'http://' + (item.image)" aspect-ratio="2.75"></v-img>
              <v-card-title>
                <div>
                  <span :class="(getColor(item.status)+'--text')">{{item.status}}</span>
                  <br>
                  <span>{{item.description}}</span>
                  <br>
                  <span class="grey--text">{{convertDate(item.createdAt)}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  target="__blank"
                  color="blue"
                  :href="(`https://maps.google.com/?q=${(item.latitude)},${(item.longitude)}`)"
                >show on map</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      laporan: null
    };
  },
  beforeMount() {
    this.getLaporan();
  },
  methods: {
    async getLaporan() {
      try {
        const res = await this.$client.get("/laporan");
        this.laporan = res.data.laporan;
      } catch ({ response }) {
        console.log(response.data);
      }
    },
    convertDate(date) {
      return moment(date).fromNow();
    },
    getColor(status) {
      switch (status) {
        case "pending":
          return "warning";
        case "process":
          return "info";
        case "done":
          return "success";
        case "rejected":
          return "error";

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.laporan-list {
  list-style: none;
  padding-left: 0;
}
</style>

