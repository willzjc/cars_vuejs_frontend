<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="car.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="make">Make</label>
        <input
          class="form-control"
          id="make"
          required
          v-model="car.make"
          name="make"
        />
      </div>

      <button @click="saveCar" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCar">Add</button>
    </div>
  </div>
</template>

<script>
import CarDataService from "../services/CarDataService";

export default {
  name: "add-car",
  data() {
    return {
      car: {
        id: null,
        title: "",
        make: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveCar() {
      var data = {
        title: this.car.title,
        make: this.car.make
      };

      CarDataService.create(data)
        .then(response => {
          this.car.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCar() {
      this.submitted = false;
      this.car = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
