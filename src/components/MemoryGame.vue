<template>
  <div class="container">
    <h1 class="display-4 text-center">Memory Game</h1>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="submitForm" v-if="!showGame">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" id="username" class="form-control" v-model="username" required>
            <div class="invalid-feedback" v-if="!username">Please enter a username.</div>
          </div>
          <button v-if="!showGame" type="submit" :disabled="!username" class="btn btn-primary" @click="startGame">Start Game</button>
        </form>
        <br>
        <h2 class="display-6 text-center" v-if="!showGame">Règles du Memory Game</h2>
        <br>
          <ul v-if="!showGame">
            <li>Retournez deux cartes à la fois pour trouver une paire.</li>
            <li>Si les cartes correspondent, vous gagnez un point.</li>
            <li>Si les cartes ne correspondent pas, une erreur est comptabilisée.</li>
            <li>Essayez de trouver toutes les paires correspondantes avec le moins d'erreurs possible.</li>
          </ul>
      </div>
      <div class="col-12" v-if="showGame">
        <p class="lead">Player: {{ username }}</p>
        <p class="lead">Score: <span class="badge bg-primary">{{ score }}</span></p>
        <p class="lead">Errors: <span class="badge bg-danger">{{ errors }}</span></p>
        <br>
      </div>
    </div>
    <div class="row" v-if="showGame">
      <div
        class="col-6 col-md-3 col-lg-3"
        v-for="(card, index) in cards"
        :key="index"
      >
        <div
          class="card mb-3"
          :class="{ 'flipped': card.flipped, 'disabled': !gameStarted }"
          @click="flipCard(card)"
        >
          <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">{{ card.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [],
      score: 0,
      errors: 0,
      flippedCards: [],
      username: '',
      gameStarted: false,
      showGame: false
    };
  },
  methods: {
    flipCard(card) {
      if (!card.flipped && this.flippedCards.length < 2 && this.gameStarted) {
        card.flipped = true;
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
          setTimeout(() => {
            this.checkMatch();
          }, 1000);
        }
      }
    },
    checkMatch() {
      const [card1, card2] = this.flippedCards;
      if (card1.value === card2.value) {
        this.score++;
      } else {
        card1.flipped = false;
        card2.flipped = false;
        this.errors++;
      }
      this.flippedCards = [];
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    startGame() {
      this.gameStarted = true;
      this.showGame = true;
    },
    
  },
  mounted() {
    const values = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    this.cards = values.map((value) => ({
      value,
      flipped: false,
    }));
    this.shuffleArray(this.cards);
  },
};
</script>
  
<style>
  .card {
    width: 10rem;
    height: 10rem;
    cursor: pointer;
    perspective: 1000px;
  }
  
  .card-inner {
    position: relative;
    width: 10rem;
    height: 10rem;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 10rem;
    height: 10rem;
    backface-visibility: hidden;
  }
  
  .card-front {
    background-color: aqua;
  }
  
  .card-back {
    background-color: #f8f9fa;
    color: black;
    transform: rotateY(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-wrapper {
    padding-right: 0;
  }

</style>
  