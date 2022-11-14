<template>
  <q-page class="q-pa-md">
    <div v-if="$q.platform.is.electron">
      <q-btn class="full-width bg-secondary text-white q-ma-md" @click="sendIt">Send it</q-btn>
      <q-card>
        <q-card-section class="bg-secondary text-white">
          <div class="text-h4 ow-font">How it works</div>
        </q-card-section>
        <q-card-section align="center">
          <div class="text-h5">TL;DR</div>
          Just press one the button when a game ends! &#128579;
        </q-card-section>
        <q-separator />
        <q-card-section align="center">
          <div class="text-h5 bg-secondary text-white text-uppercase">Intro</div>
        </q-card-section>
        <q-card-section>
          <p>
            Hi, first of all thank you for downloading my app! it really means alot to me &#128539; this is still a WIP
            solution so please be patient with me.
          </p>
          <p>
            I like <a href="https://overwatch.blizzard.com/en-us/">Overwatch</a>, i think it's a very fun and competitive game but lacks a nice visual analytics dashboard to help players know if they are improving or how can they improve. Instead as a player you have the profile career which contains ALOT of stats but they are not easly readable plus without the proper knowledge it's hard to understand if it's good or not, so i wanted to change that and offer a nice(r) UI for players to track and share their stats and a way to share; advice and mentor other players to do better.
          </p>
          <p>
            The sad part is that Overwatch does not offer an API &#128542; and i didn't notice it until i deployed the first stage version of this app. I almost gave up on this and was trying to refund my purchased domain name, but then after searching for a few days i found the miracle answer. OCR or more precisely <a href="https://github.com/InventivetalentDev">Haylee Schäfer InventivetalentDev</a>'s amazing
            <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a> this beast of a Python script scraps the data of the scoreboard and extract it in a nice JSON format! This means that tracking stats is at the player's discretion.
          </p>
          <p>
            This was quite an endeavour and is my first own project, it's a 100% free and i intend to keep it this way however hosting this is not 100% free and i'm using the cheapest AWS solution currently offers, it's intended for prototyping not production but it will still do the job just know that slow response time is to be expected and maybe crash(s)... I will upgrade the tier once i have some income for now i'm without a job...
          </p>
          <p>
            That said, i hope you enjoy using this app if you could support
            <q-btn flat href="https://ko-fi.com/biromarket" target="_blank">
              <q-icon name="fa-solid fa-coffee" color="primary"/>
              <q-tooltip>Buy me a kofi</q-tooltip>
            </q-btn> the project i would greatly appreciate it! and star the repo on <q-btn flat href="https://github.com/BrLyes/owstats" target="_blank">
              <q-icon name="fa-solid fa-brands fa-github" color="primary"/>
              <q-tooltip>Check out the github</q-tooltip>
            </q-btn> please &#128523; it will mean the world to me
          </p>
        </q-card-section>
        <q-card-section align="center">
          <div class="text-h5 bg-secondary text-white text-uppercase">Install tesseract!</div>
        </q-card-section>
        <q-card-section>
          <p>Tesseract is an optical character recognition engine for various operating systems. It is free software,
             released under the Apache License. Originally developed by Hewlett-Packard as proprietary software in the
             1980s, it was released as open source in 2005 and development has been sponsored by Google since 2006
             (thank you wikipedia)</p>
          <p>If you are on windows download the tesseract from:
            <a href="https://github.com/UB-Mannheim/tesseract/wiki">Here</a>
          </p>
        </q-card-section> <q-card-section align="center">
          <div class="text-h5 bg-secondary text-white text-uppercase">OCRWATCH</div>
        </q-card-section>
        <q-card-section>
          <p>
            Okay now into the good stuff, as i wrote in the intro this project is made possible thanks to <a href="https://github.com/InventivetalentDev">Haylee Schäfer InventivetalentDev</a>'s <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a>. This means that it's up to you to track your stats while the reading and storing is handled, the operation of sending the stats must be made manually. <i>For now</i>
          </p>
          <p>
            So the app comes with a tracker.exe, it's a compiled version of <a target="_top" href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a>, OWStats auto starts it and whenever you press tab it will try to parse the scoreboard and stores the data in a JSON file named <b>latest.json</b>, this file is then reformatted when you click the <b>Send it</b> button before posting to the owstats's API and then the file is deleted so you don't post twice the same stats by mistake.I hope it all makes sense, it's a bit technical but the process should be easy to grasp.
          </p>
          <p>
            The app also comes with a config.ini, you shouldn't need to edit it but it contains vars specific to <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a>, you should leave everything to default the only thing that you <i>may</i> have to edit would be the <code>[tesseract]EXE_LOCATION</code> and the <code>[input]monitor</code>. The <code>[tesseract]EXE_LOCATION</code> is the location of the tesseract binary required by <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a> to work, it should be automatically detected but in case there is an issue please edit it manually, the <code>[input]monitor</code> is the monitor Overwatch is running on, it should follow the windows monitors number.
          </p>
          <p>This about covers it, so don't panic about the tracker.exe file it's not a virus or anything just a compiled version of the <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a></p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  methods:{
    sendIt(){

    }
  }
}
</script>
