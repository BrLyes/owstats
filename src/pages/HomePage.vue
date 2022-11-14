<template>
  <div>
    <q-list bordered
            class="rounded-borders q-mt-lg">
      <q-expansion-item
        v-model="disclaimerOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="0- Disclaimer"
      >
        <q-card bordered
                flat>
          <CardSectionWithImage src="img/howto/report-issue.png"
                                href="https://github.com/BrLyes/owstatsapi/issues">
            <p>This project is still early in dev so expect bugs, if you find any please use the repo issues board and
               report them, thanks!</p>
          </CardSectionWithImage>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="disclaimerOpen=false; downloadTrackerOpen=true">Continue
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="downloadTrackerOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="1- Download tracker"
      >
        <q-card bordered
                flat>
          <CardSectionWithImage src="img/howto/download-tracker.png"
                                width="250px">
            <p>First download the tracker by clicking:
              <q-btn flat
                     @click="downloadTracker">Here
              </q-btn>
            </p>
            <p>This tracker will be in archive extract and you will find the following files:</p>
          </CardSectionWithImage>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="downloadTrackerOpen=false; downloadTesseractOpen=true;">Continue
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="downloadTesseractOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="2- Download tesseract"
      >
        <q-card bordered
                flat>
          <CardSectionWithImage src="img/howto/download-tesseract.png"
                                width="715px">
            <p>Tesseract is an optical character recognition engine for various operating systems. It is free software,
               released under the Apache License. Originally developed by Hewlett-Packard as proprietary software in the
               1980s, it was released as open source in 2005 and development has been sponsored by Google since 2006
               (thank you wikipedia)</p>
            <p>If you are on windows download the tesseract from:
              <q-btn flat
                     @click="downloadTesseract">Here
              </q-btn>
            </p>
          </CardSectionWithImage>
          <q-card-section>
            <p>On linux system is should be already installed</p>
          </q-card-section>
          <q-card-section>
            <p>Once installed, locate the tesseract.exe within the install folder and copy the absolute path (shift +
               click) and click the 'copy as path' in the contextual menu, save it somewhere we will need it soon</p>
          </q-card-section>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="downloadTesseractOpen=false; configureTrackerOpen=true">Continue
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="configureTrackerOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="3- Configure tracker"
      >
        <q-card bordered
                flat>
          <CardSectionWithImage src="img/howto/config-auth.png"
                                width="715px">
            <p>
              Almost done, now we just need to configure the tracker correctly open the config.ini from extracted
              archive in step 1 and set the HEADER_AUTHORIZATION to:<br />
              <b ref="auth">Bearer {{ userStore.token }}</b>
              <q-btn flat
                     @click="copyAuth">
                (click to copy)
              </q-btn>
            </p>

          </CardSectionWithImage>
          <CardSectionWithImage src="img/howto/config-tesseract.png"
                                width="715px">
            <p>
              Now configure set the EXE_LOCATION from tesseract, copy the path you saved in step 2 and paste it in next
              to EXE_LOCATION=<br />
              For me it's J:\\tesseract\\tesseract.exe (you need to double the \ !! very important)
            </p>

          </CardSectionWithImage>
          <CardSectionWithImage src="img/howto/config-monitor.png"
                                width="715px">
            <p>
              Finally change the monitor number, this is kind of buggy i suggest you start from 1 and see if it works.
            </p>

          </CardSectionWithImage>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="configureTrackerOpen=false; usingTrackerOpen=true">Continue
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="usingTrackerOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="4- Using the tracker"
      >
        <q-card bordered
                flat>
          <q-card-section>
            You are all setup, now just double click the exe and a console will open, don't panic leave it open in the
            background and start Overwatch (2)
            <CardSectionWithImage src="img/howTo/tracker-console.png" width="715px"/>
            Play a game and <b>NEAR the end</b>  press F12, the scoreboard should pop for a 2 seconds or so and then close it's 100% fine and expected, the way this works is that it scraps the scoreboard for data before sending it so leave it open and dont press any button during this process.
            <CardSectionWithImage src="img/howTo/scoreboard-screenshot.png" width="715px"/>
            <b>Please note if you press too late the scoreboard will be missing your character name and it will fail</b>
            <CardSectionWithImage src="img/howTo/post-game.png" width="715px"/>
            I dont know why it does that but... i dont have a fix for it yet... anyways, if you done everything correctly, after a few seconds stats should come up and you can refresh owstats and see them! :D
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pa-none">
            <div class="text-h6 bg-warning text-white q-pa-md">
              I know this is not ideal i'm working on a script that does this automatically but i'm having alot of issues detecting the end of the game plus the fact the character name is missing at the end does not help at all :l
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="usingTrackerOpen=false; creditsOpen=true">Continue
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        v-model="creditsOpen"
        expand-separator
        class="bg-primary bg-color-transition"
        header-class="text-white"
        expand-icon-class="text-white"
        label="5- Credits"
      >
        <q-card bordered
                flat>
          <CardSectionWithImage href="https://github.com/InventivetalentDev/OCRwatch"
                                src="img/inventivetalentdev/star-ocr-watch.png">
            <p>This tracker could not be possible with <a href="https://github.com/InventivetalentDev">Haylee Schäfer
                                                                                                       InventivetalentDev</a>
               amazing
              <a href="https://github.com/InventivetalentDev/OCRwatch">OCRWatch</a>
               Consider showing your support by staring the project!
            </p>
          </CardSectionWithImage>
          <q-separator />
          <q-card-section class="text-center">
            <q-btn class="bg-primary text-white full-width"
                   @click="returnHome">Finish
            </q-btn>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>
<script>
import {api} from 'boot/axios';
import CardSectionWithImage from 'components/qCardSection/CardSectionWithImage';
import {userStore} from 'stores/user';

export default {
  components: {
    CardSectionWithImage,
  },
  data() {
    return {
      userStore            : userStore(),
      disclaimerOpen       : false,
      downloadTrackerOpen  : false,
      downloadTesseractOpen: false,
      configureTrackerOpen : false,
      usingTrackerOpen     : true,
      creditsOpen          : false,
    }
  },
  methods   : {
    downloadTracker() {
      api.get('/tracker').then((response) =>
                               {
                                 window.open(response.data);
                               });
    },
    downloadTesseract() {
      window.open('https://github.com/UB-Mannheim/tesseract/wiki');
    },
    copyAuth() {
      navigator.clipboard.writeText('Bearer ' + this.userStore.token);
    },
    returnHome(){
      this.$router.push('/');
    }
  },
}
</script>
