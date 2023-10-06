import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWRhNWEzMjdjYmE1N2JlOTE4ZGQ0ZTIyM2IyNjAwNSIsInN1YiI6IjY1MDQ2N2YyNmEyMjI3MDBjM2I4MGU1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DeuvBY8dERrjW4N74wAaQgElL2NHDaSI_S5lF9FGVm4`
  }
})

export default api