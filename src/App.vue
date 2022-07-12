<template>
  <div class="container">
    <header>
      <h1>
        <span>ROCK</span>
        <span>PAPER</span>
        <span>SCISSOR</span>
      </h1>
      <div class="score-container">
        <h4>SCORE</h4>
        <p id="score">{{ score }}</p>
      </div>
    </header>
    <main v-show="showMain">
      <button class="btn-circle btn-paper pick" data-choice="paper">
        <span class="wrapper">
          <img src="./assets/images/icon-paper.svg" alt="Paper Icon" />
        </span>
      </button>
      <button class="btn-circle btn-scissors pick" data-choice="scissors">
        <span class="wrapper">
          <img src="./assets/images/icon-scissors.svg" alt="Scissor Icon" />
        </span>
      </button>
      <button class="btn-circle btn-rock pick" data-choice="rock">
        <span class="wrapper">
          <img src="./assets/images/icon-rock.svg" alt="Rock Icon" />
        </span>
      </button>
    </main>
  </div>
  <div class="selection" v-show="showSelection">
    <div class="you-picked-container">
      <p class="you-picked">YOU PICKED</p>
      <button
        :class="[
          'btn-circle',
          true ? 'btn-' + userChoice : '',
          !isLose && !isDraw ? 'moreshadow' : '',
        ]"
      >
        <span class="wrapper">
          <img
            :src="require('@/assets/images/icon-' + userChoice + '.svg')"
            alt="{{userChoice}}"
          />
        </span>
      </button>
    </div>
    <div class="go-down">
      <p class="big-text">
        YOU <span id="win">{{ winlose }}</span>
      </p>
      <button :class="[{ lose: isLose }, 'btn']" @click="playAgain" id="reset">
        PLAY AGAIN
      </button>
    </div>
    <div class="house-picked-container">
      <p class="house-picked">THE HOUSE PICKED</p>
      <button
        :class="[
          'btn-circle',
          true ? 'btn-' + computerChoice : '',
          isLose && !isDraw ? 'moreshadow' : '',
        ]"
      >
        <span class="wrapper">
          <img
            :src="require('@/assets/images/icon-' + computerChoice + '.svg')"
            alt="Rock Icon"
          />
        </span>
      </button>
    </div>
  </div>
  <div v-show="popupshow" class="outer-popup">
    <div class="rules-modal">
      <div>
        <p>RULES</p>
        <button @click="popuphide()">
          <img src="./assets/images/icon-close.svg" alt="" />
        </button>
      </div>
      <img src="./assets/images/image-rules.svg" />
    </div>
  </div>
    <button class="btn-rules" @click="popup()">Rules</button>

</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {
      choices: ["paper", "rock", "scissors"],
      buttons: [],
      userChoice: "paper",
      computerChoice: "scissors",
      score: 0,
      showMain: true,
      showSelection: false,
      winlose: "",
      isLose: false,
      popupshow: false,
      isDraw: false,
    };
  },
  methods: {
    pickRandomChoices() {
      return this.choices[Math.floor(Math.random() * this.choices.length)];
    },
    updateScore(val) {
      this.score += val;
    },
    checkWinner() {
      this.computerChoice = this.pickRandomChoices();
      if (this.userChoice === this.computerChoice) {
        //user draw
        this.showMain = !this.showMain;
        this.showSelection = !this.showSelection;
        this.winlose = "DRAW";
        this.isLose = false;
        this.isDraw = true;
      } else if (
        (this.userChoice === "paper" && this.computerChoice === "rock") ||
        (this.userChoice === "scissors" && this.computerChoice === "paper") ||
        (this.userChoice === "rock" && this.computerChoice === "scissors")
      ) {
        //User Won
        this.showMain = !this.showMain;
        this.showSelection = !this.showSelection;
        this.isDraw = false;
        this.isLose = false;
        this.winlose = "WIN";
        this.updateScore(1);
      } else {
        this.updateScore(-1);
        this.showMain = !this.showMain;
        this.isLose = true;
        this.isDraw = false;
        this.winlose = "LOSE";
        this.showSelection = !this.showSelection;
        // User Loss
      }
    },
    playAgain() {
      this.showMain = !this.showMain;
      this.showSelection = !this.showSelection;
    },
    popup() {
      this.popupshow = true;
    },
    popuphide() {
      this.popupshow = false;
    },
  },
  mounted() {
    this.buttons = document.querySelectorAll(".pick");
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.userChoice = button.getAttribute("data-choice");
        this.checkWinner();
      });
    });
  },
};
</script>
