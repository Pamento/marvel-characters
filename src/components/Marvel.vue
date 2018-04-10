<template>
  <div class="marvel">

    <div class="marvelImagBlock" v-if="characters.length !== 0" >
      <div class="imageParent" v-for="(character, index) in characters" :key="index" @mousemove="descriptHidde(character.id)" @click="descriptShow(character.id)" >
        <img :src="character.thumbnail.path+'.'+character.thumbnail.extension" :alt="'Marvel Character : '+character.name">
        <div class="hiddenDescript" :id="character.id">
          <p>{{character.name}}</p>
          <p>{{character.description}}</p>
          <!-- <icon name="fa-thumbs-up"></icon> -->
          <v-icon name="heart"></v-icon>
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
    Spinner,
    "icon": require("vue-icons")
  },
  data () {
    return {
      characters: [],
      limit: 20
    }
  },
  beforeCreate(){
    ApiRequest.getcharacters().then( char => char.forEach(element => {
      if((element.thumbnail.path.includes('available') !== true) && (this.characters.length < this.limit)){
        this.characters.push(element)
      }
    })).catch((error) => console.error(error) )
  },
  methods: {
    descriptShow(characterId){
      console.log('show '+`#${characterId}`)
      document.getElementById(characterId).classList.remove('hiddenDescript');
      document.getElementById(characterId).classList.add('descript');
    },
    descriptHidde(characterId){
      document.getElementById(characterId).classList.remove('descript');
      document.getElementById(characterId).classList.add('hiddenDescript');
      console.log('hidde '+`${characterId}`)
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
.descript {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.hiddenDescript {
  display: none;
  /* background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; */
}
p {
  padding: 0 1.8em;
}
svg {
  width: 2em;
}
</style>
