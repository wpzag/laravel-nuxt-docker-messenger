<template>
  <div class="z-colorful-loader">
    <!--    <h2>loading ..</h2>-->
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>


<style lang="scss" scoped>
.z-colorful-loader {
  text-align: center;
}

.z-colorful-loader h2 {
  color: #ccc;
  margin: 0;
  font: 0.8em verdana;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.z-colorful-loader span {
  display: inline-block;
  vertical-align: middle;
  width: 0.7em;
  height: 0.7em;
  margin: 0.19em;
  background: #007db6;
  border-radius: 0.7em;
  animation: z-colorful-loader 1s infinite alternate;
}

.z-colorful-loader span:nth-of-type(2) {
  background: #008fb2;
  animation-delay: 0.2s;
}

.z-colorful-loader span:nth-of-type(3) {
  background: #009b9e;
  animation-delay: 0.4s;
}

.z-colorful-loader span:nth-of-type(4) {
  background: #00a77d;
  animation-delay: 0.6s;
}

.z-colorful-loader span:nth-of-type(5) {
  background: #00b247;
  animation-delay: 0.8s;
}

.z-colorful-loader span:nth-of-type(6) {
  background: #5ab027;
  animation-delay: 1s;
}

.z-colorful-loader span:nth-of-type(7) {
  background: #a0b61e;
  animation-delay: 1.2s;
}

/*
         * Animation keyframes
         * Use transition opacity instead of keyframes?
         */
@keyframes z-colorful-loader {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
