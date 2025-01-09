import instance from './instance'

class PropertyApi {
  constructor(api) {
    this.api = api
  }

  async getAllProperties() {
    return this.api.get('/owned_properties')
  }

  async getFilteredProperties(params) {
    return this.api.get('/owned_properties', { params })
  }

  async createProperty(payload) {
    return this.api.post('/owned_properties', payload)
  }
}

const notesApi = new NotesApi(instance)
const propertyApi = new PropertyApi(instance)

export {
  notesApi,
  propertyApi
}
