<template>
  <div class="marvel">

    <MarvelHeader>du text</MarvelHeader>

    <div class="marvelImagBlock" v-if="characters.length !== 0" >
      <div class="imageParent" v-for="(character, index) in characters" :key="index" @mousemove="descriptHidde(character.id)" :id="index" >
        <img :src="character.thumbnail.path+'.'+character.thumbnail.extension" :alt="'Marvel Character : '+character.name" @click="descriptShow(character.id)">
        <div class="hiddenDescript" :id="character.id">
          <p>{{character.name}}</p>
          <p>{{character.description}}</p>
          <!-- <icon name="fa-thumbs-up"></icon> -->

        </div>
        <a id="aIcon" class="aIcon " href="#" @click="addMyCharacters(character.id), chosenCharacter(index)">
          <v-icon  name="heart" ></v-icon>
        </a>
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
import MarvelHeader from './MarvelHeader.vue'

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
      myCharacters: [],
      limit: 20,
      toggleIcon: false
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
      console.log('hidde '+`${characterId}`)
      document.getElementById(characterId).classList.remove('descript');
      document.getElementById(characterId).classList.add('hiddenDescript');
    },
    addMyCharacters(characterId){
      console.log('add character to array')
      this.toggleIcon = !this.toggleIcon
      if (this.myCharacters.length === 5) {
        alert("Je sai, tout les characters de Marvel \n sont magnifique! \n Choisi que cinq ;)")
      } else {
        this.myCharacters.push(characterId)
      }
    },
    chosenCharacter(chosenId){
      if (this.toggleIcon) {
        document.getElementById(chosenId).classList.add('chosen')
        console.log(chosenId)
      } else {
        document.getElementById(chosenId).classList.remove('chosen')
      }
    }
  }
}
</script>

<style scoped>
Header {
  position: absolute;
  left: 2em;
  top: 2em;
}
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
  box-shadow: 8px 8px 10px rgb(90, 0, 0);
  cursor: pointer;
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
}
p {
  padding: 0 1.8em;
}
.imageParent:hover svg {
  visibility: visible;
}
.aIcon {
  line-height: 2em;
  width: 2em;
}
svg {
  background-color: rgb(240, 20, 30);
  border-radius: 25%;
  color: #ffffff;
  width: 2em;
  padding: 0.4em;
  position: absolute;
  right: 2em;
  bottom: 2em;
  visibility: hidden;
  z-index: 100;
}
.chosen {
  border: 3px solid rgb(240, 20, 30);
  box-shadow: 12px 12px 15px rgb(240, 20, 30);
}

</style>
