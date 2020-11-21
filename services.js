
class Api {

  async fetchData(){
    try {
       const res = await fetch('api.json')
       const data = await res.json()
       return data;
    } catch (error) {
      console.log(error)
    }

  }
}

export default Api