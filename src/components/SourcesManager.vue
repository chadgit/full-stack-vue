<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Sources</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <b-card>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
                <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="source in sources" :key="source.id">
              <td>{{ source.name }}</td>
              <td>
               <router-link size="sm" variant="primary" :to="{ name: 'SourcesManagerDetail', params: { source: source, thing: thingValue } }">
                <b-button size="sm" variant="primary">view</b-button>
              </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card :name="(model.id ? 'Edit Source ID#' + model.id : 'New Source')">
          <form @submit.prevent="saveSource">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Source</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      sources: [],
      model: {}
    }
  },
  async created () {
    this.refreshSources()
  },
  methods: {
    async refreshSources () {
      this.loading = true
      this.sources = await api.getSources()
      this.loading = false
    },
    async populateSourceToEdit (source) {
      this.model = Object.assign({}, source)
    },
    async saveSource () {
      if (this.model.id) {
        await api.updateSource(this.model.id, this.model)
      } else {
        await api.createSource(this.model)
      }
      this.model = {} // reset form
      await this.refreshSources()
    },
    async deleteSource (id) {
      if (confirm('Are you sure you want to delete this source?')) {
        // if we are editing a source we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteSource(id)
        await this.refreshSources()
      }
    }
  }
}
</script>
