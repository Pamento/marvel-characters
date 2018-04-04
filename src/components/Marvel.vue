<template>
  <div class="marvel">

    <div class="marvelImagBlock" v-if="marvelResponse !== null " >
      <div class="imageParent" v-if="(character.thumbnail.path.includes('available') !== true )" v-for="(character, index) in marvelResponse" :key="index" @click="descriptCharacter(index)">
        <img :src="character.thumbnail.path+'.'+character.thumbnail.extension" :alt="'Marvel Character : '+character.name">
        <div class="descrip" >
          <p>{{character.name}}</p>
          <p>{{character.description}}</p>
        </div>
      </div>
    </div>

    <div v-else >
      <Spinner></Spinner>
    </div>

  </div>
</template>

<script>
import ApiRequest from '@/api-request.js'
import Spinner from './Spinner.vue'

export default {
  name: 'Marvel',
  components: {
    ApiRequest,
    Spinner
  },
  data () {
    return {
      marvelResponse: null
    }
  },
  created(){
    ApiRequest.getcharacters().then( char => this.marvelResponse=char);
  },
  methods: {
    descriptCharacter(index){
      console.log('ok '+index);
    }
  }
}
</script>

<style scoped>
.marvel {
  display: inline-block;
  background-color: rgb(250, 250, 250);
  border-radius: 20px;
  margin: 1.9em 2.9em;
  padding: 1.8em;
  text-align: center;
}
.marvelImagBlock {
  display: inline-block;
}
.imageParent {
  border-radius: 10%;
  box-shadow: 8px 8px 10px rgb(240, 20, 30);
  display: inline-block;
  margin: 0.9em;
  min-width: 15em;
  max-width: 400px;
  min-height: 15em;
  max-height: 400px;
  overflow: hidden;
  position: relative;
}
img {
  display: block;
  width: 100%;
}
.descrip {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
p {
  padding: 0 1.8em;
}
</style>
