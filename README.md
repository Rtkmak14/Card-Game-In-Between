<img src="https://cdn.pixabay.com/photo/2015/06/14/19/14/playing-cards-809356_1280.jpg" alt="Picture of playing cards" width="100%" height= "300" style ="border: 2px solid #daa520; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)"
/>

[Insert link to live game or GitHub Pages deployment]

# IN-BETWEEN CARD GAME
A two-player betting game built with vanilla JavaScript, HTML, and CSS. Players ante into a shared pot, then bet on whether a third card will fall between two outer cards. Strategic betting, pot-clearing wins, and turn-based logic make for a fast-paced, casino-inspired experience.



# HOW TO PLAY
* Each player starts with $100.
* On each turn, two outer cards are dealt.
* Players ante $10 each into the pot.
* The active player may pass or place a bet.
* If betting, they can increase or decrease the wager (up to the pot total).
* Submitting the bet reveals the middle card:
    * If it falls between the outer cards → win!
    * If not → lose the bet to the pot.
    * Game ends after 20 turns or when the pot is cleared.
* Other information:
    * Each player initially starts with $100 but you're allowed to go negative (i.e. buy in for more money).
    * If the deck runs out during a hand, all cards — including those currently in play — are reshuffled into a new full deck. 

# TECHNOLOGIES USED
JavaScript: Game logic, state management, DOM manipulation
HTML: Semantic structure and layout
CSS: Styling, card visuals, accessible color contrast

# ATTRIBUTION
* [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* AI Usage:
    * This project benefited from Microsoft Copilot’s support in code pseudocode generation, architectural planning, syntax debugging, and initial README composition.

# Planned Enhancements
* Restructure the display to rely less on the game message.
* Add visual feedback for bets won or lost.
* Introduce sound effects in the browser. 

