<template>
  <div v-if="currentCar" class="edit-form">
    <h4>Car</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentCar.title"
        />
      </div>
      <div class="form-group">
        <label for="make">Make</label>
        <input
          type="text"
          class="form-control"
          id="make"
          v-model="currentCar.make"
        />
      </div>

      <div class="form-group">
        <label><strong>Model:</strong></label>
        {{ currentCar.model }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentCar.model"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteCar">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateCar">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Car...</p>
  </div>
</template>

<script>
import CarDataService from "../services/CarDataService";

export default {
  name: "car",
  data() {
    return {
      currentCar: null,
      message: "",
    };
  },
  methods: {
    getCar(id) {
      CarDataService.get(id)
        .then((response) => {
          this.currentCar = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(newModel) {
      var data = {
        id: this.currentCar.id,
        title: this.currentCar.title,
        make: this.currentCar.make,
        model: this.currentCar.model,
      };

      CarDataService.update(this.currentCar.id, data)
        .then((response) => {
          // this.currentCar.model = newModel;
          console.log(response.data);
          console.log('newModel',newModel);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateCar() {
      CarDataService.update(this.currentCar.id, this.currentCar)
        .then((response) => {
          console.log(response.data);
          this.message = "The car was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteCar() {
      CarDataService.delete(this.currentCar.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "cars" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getCar(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
