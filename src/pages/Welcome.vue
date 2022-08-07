<template>
  <q-page  @click.native="$router.push('/home')">
  <!-- Desktop -->
  <template v-if="!$q.platform.is.mobile">
    <q-page class="page" >
        <div class="box1 text-center flex column justify-center">
        <div class="" style="height: 50%; width: 100%">
            <img src="/Pokeball.png" alt="pikachu" width="50%" >
        </div>
        </div>
        <div class="box2 q-pl-xl q-pr-xl bg-form">
        <div class="text q-pl-xl text-dark">
            <q-img src="/LogoPokemon.png"  width="50%">
                <div class="absolute-bottom text-subtitle1 text-center bg-transparent text-black">
                    Bienvenido a la PokeApp
                </div>
            </q-img>
            <span></span> 
        </div>
        </div>
        <div class="box3 text-center q-pt-sm text-color-fonts-form text-bold">
            Hacé click para continuar.
        </div>
    </q-page>
  </template>

  <!-- Mobile -->
  <template v-if="$q.platform.is.mobile">
    <div class="container-mobile ">
      <div class="box3-mobile text-center q-pt-sm text-color-fonts-form text-bold">
            Hacé click para continuar.
      </div>

      <div>
        <div class="box1-mobile q-pt-lg line1">
          <div class="text-mobile text-center text-dark text-bold">
            <q-img src="/LogoPokemon.png"  width="50%">
            </q-img>
          </div>
        </div>        
        <div class="box2-mobile text-center">
          <div class="" style="height: 50%; width: 100%">
            <img src="/Pokeball.png" alt="pikachu" width="50%" >
          </div>
        </div>    
      </div>
    </div>
  </template>

  
  </q-page>
</template>
<script>

export default {
  name: 'Index'
}
</script>
<style>
.page {
  margin: 0;
  background-image: url('/BackgroundWelcomePage.png');
  background-size: 100%;
  overflow: hidden; 
}
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;  
}
.box1 {
  width: 50vw;
  height: 100vh;
  position: absolute; 
  bottom: -100%;
  left: 30%;
  animation: anim 3s forwards, anim2 2s forwards 2s;
  z-index: 1000;
}
.box2 {
  width: 100%;
  height: auto;
  font-family: 'Bahnschrift Condensed';
  font-weight: 500;
  line-height: 200%;
  position: absolute;
  top: 200px;

    z-index:1001;
}
.box3 {
  width: 100%;
  position: absolute; 
  top: -0%;
  animation: anim4 2s;
}
.text {
  position: relative;
  left: -100%;
  animation: anim3 forwards 3s
}
@keyframes anim {
  from {
    bottom: -100%;
  }
  to {
    bottom: 0%;
  }
}
@keyframes anim2 {
  from {
    left: 30%;
  }
  to {
    left: 50%;
  }
}
@keyframes anim3 {
  from {
    left: -100%;
  }
  to {
    left: 0%
  }
}
@keyframes anim4 {
  from {
    top: -10%;
  }
  to {
    top: 0%
  }
}

/* Mobile */
.container-mobile {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.box1-mobile {
  position: relative;
  width: 100%;
  z-index: 100;
}
.text-mobile {
  line-height: 150%;
  z-index: 100;
}
.box2-mobile {
  position: relative;
  width: 100%;
  height: auto;
  font-family: 'Bahnschrift Condensed';
  z-index: 100;
}
.box3-mobile {
  width: 100%;
  position: absolute; 
  top: -0%;
  animation: anim4 2s;
  z-index: 100;
}
.line1{
  width: 100%;
  height: 20px;
  position: absolute;
  z-index: 101;
}
.line1 {
  animation: line1 forwards 1.3s;
}

@keyframes line1 {
  from {
    top: -10%;
  }
  to {
    top: 20%
  }
}
</style>

