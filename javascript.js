let xp = 0;
let health = 100;
let gold = 10;

let inventory = ["stick"];

let currentWeapon = 0;
let character, strike, agility;
let monsterHealth, monsterName;

const characterPhto = document.querySelector("#character-small-photo");
const welcomePage = document.querySelector("#welcome-page-div");
const hud = document.querySelector("#hud");
const monsterHud = document.querySelector("#monster-stats-div");
const monsterHealthText = document.querySelector("#monster-health-text");
const monsterNameText = document.querySelector("#monster-name-text");
const maleButton = document.querySelector(".character-photo-menu.m");
const femaleButton = document.querySelector(".character-photo-menu.f");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const mainText = document.querySelector("#main-text");
const backgroundPhoto = document.querySelector("#background-photo");
const healthText = document.querySelector("#health-stat-text");
const goldText = document.querySelector("#gold-stat-text");
const xpText = document.querySelector("#xp-stat-text");
const monsterPic = document.querySelector("#monster-pic")

maleButton.onclick = pickMale;
femaleButton.onclick = pickFemale;

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function pickMale() {
    character = "male";
    strike: 20;
    agility: 10;

    characterPhto.src="src/male_face.png";
    welcomePage.style.display = "none";
    hud.style.display = "block";
    backgroundPhoto.style.display = "block";
}
function pickFemale() {
    character = "female"
    strike: 10;
    agility: 20;

    characterPhto.src="src/female_face.png";
    welcomePage.style.display = "none";
    hud.style.display = "flex";
    backgroundPhoto.style.display = "block";
}

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
]

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 10,
        pic: "src/slime.png"
    },
    {
        name: "beast",
        level: 10,
        health: 50,
        pic: "src/beast.png"
    },
    {
        name: "dragon",
        level: 20,
        health: 200,
        pic: "src/dragon.png"
    }
]

const locations = [
    {
        name: "town center",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        "img src": "src/town_square.png",
        text: "You are in the town center. You see a sign that says \"Store\" and an entrace to a cave."
    },
    {
        name: "store",
        "button text": ["Buy 10HP (10 gold)", "Buy Weapon (20 gold)", "Go Back"],
        "button functions": [buyHealth, buyWeapon, goTown],
        "img src": "src/store_interior.jpeg",
        text: "You are in the store."
    },
    {
        name: "cave",
        "button text": ["Fight Slime", "Fight Beast", "Go Back"],
        "button functions": [fightSlime, fightBeast, goTown],
        "img src": "src/cave_interior.png",
        text: "You are in the cave."
    },
    {
        name: "fighting",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        "img src": "src/fight_scene.png",
        text: "You are fighting a monster."
    },
    {
        name: "defeat monster",
        "button text": ["Go to Town", "Go to Town", "Go to Town"],
        "button functions": [goTown, goTown, goTown],
        "img src": "src/fight_scene.png",
        text: "The monster is dead. You have gained experience and gold."
    },
    {
        name: "lose screen",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "img src": "src/lose.png",
        text: "You died and lost. Play again?"
    },
    {
        name: "win screen",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        "img src": "src/win.jpeg",
        text: "Congratulations! You defeated the dragon and won!"
    }
]

function update(location) {
    button1.textContent = location["button text"][0];
    button2.textContent = location["button text"][1];
    button3.textContent = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    mainText.textContent = location.text;
    backgroundPhoto.src = location["img src"]
}

function goStore() {
    console.log("going to store");

    update(locations[1]);
}
function goCave() {
    console.log("going to cave");

    update(locations[2]);
}

function buyHealth() {
    console.log("buying health");

    if (gold >= 10) {
        health += 10;
        gold -= 10;

        healthText.textContent = health;
        goldText.textContent = gold;
    }
    else {
        mainText.textContent = "Not enough gold to buy health.";
    }
}
function buyWeapon() {
    console.log("buying weapon");

    if (currentWeapon < weapons.length - 1) {
        if (gold >= 20) {
            gold -= 20;
            goldText.innerText = gold;
            currentWeapon++;

            let newWeapon = weapons[currentWeapon].name;
            mainText.textContent = "You have bought a " + newWeapon + ".";
            inventory.push(newWeapon);

            mainText.textContent += "You now have " + inventory + " in your inventory.";
        }
        else {
            mainText.textContent = "Not enough gold to buy a new weapon";
        }
    }
    else {
        mainText.textContent = "You already have the most powerful weapon. You can sell old ones for more gold.";

        button2.innerText = "Sell weapon for 10 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon() {
    console.log("selling weapon");

    if (inventory.length > 1) {
        gold += 15;
        goldText.textContent = gold;

        let soldWeapon = inventory.shift();
        mainText.textContent = "You just sold your " + soldWeapon + ".";
        mainText.textContent += "You now have " + inventory + " in your inventory.";
    }
    else {
        mainText.textContent = "You can't sell your only weapon."
    }
}
function goTown() {
    console.log("going to town");

    monsterHud.style.display = "none";
    monsterPic.style.display = "none";

    update(locations[0]);
}

function fightSlime() {
    console.log("fighting slime");
    currentMonster = 0;
    goFight();
}
function fightBeast() {
    console.log("fighting beast");
    currentMonster = 1;
    goFight()
}

function fightDragon() {
    console.log("fighting dragon");
    currentMonster = 2;
    goFight()
}

function goFight() {
    monsterName = monsters[currentMonster].name;
    monsterHealth = monsters[currentMonster].health;

    monsterHud.style.display = "flex";
    monsterHealthText.textContent = monsterHealth;
    monsterNameText.textContent = monsterName;
    monsterPic.src = monsters[currentMonster].pic;
    monsterPic.style.display = "block";

    update(locations[3]);
}

function attack() {
    console.log("attacking monster");

    mainText.textContent = "The " + monsterName + " attacks.";
    mainText.textContent += "You attack it with your " + weapons[currentWeapon].name + ".";

    if (monsterIsHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        if (monsterHealth <= 0) monsterHealth = 0;
    }
    else {
        mainText.textContent = "You miss.";
    }
    health -= getMonsterAttack();
    if (health <= 0) health = 0;

    monsterHealthText.textContent = monsterHealth;
    healthText.textContent = health;

    if (health <= 0) loseGame();
    else if (monsterHealth <= 0) {
        mainText.textContent = "You have defeated the " + monsters[currentMonster].name + ".";
        if (currentMonster == 2) winGame();
        else defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length >= 1) {
        mainText.textContent += "Your " + inventory.pop() + " breaks.";
        mainText.textContent += "You now have only " + inventory + ".";
    }
}
function monsterIsHit() {
    return (Math.random() > .2) || health <= 20;
}
function getMonsterAttack() {
    let hit = (monsters[currentMonster].level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);

    if (hit < 0) hit = 1;
    return hit;
}
function defeatMonster() {
    gold += Math.floor(monsters[currentMonster].level * 6.7)
    xp += monsters[currentMonster].level;

    goldText.innerText = gold;
    xpText.innerText = xp;
    monsterPic.style.display = "none";

    update(locations[4]);
}

function dodge() {
    mainText.textContent = "You dodge the attack from the " + monsters[currentMonster].name + ".";
}


function loseGame() {
    console.log("lost game");

    monsterPic.style.display = "none";
    monsterHud.style.display = "none";
    update(locations[5]);
}
function winGame() {
    console.log("won game");

    monsterPic.style.display = "none";
    monsterHud.style.display = "none";
    update(locations[6]);
}
function restart() {
    xp = 0;
    health = 100;
    gold = 10;

    inventory = ["stick"];
    currentWeapon = 0;

    goldText.textContent = gold;
    xpText.textContent = xp;
    healthText.textContent = health;

    goTown();
}