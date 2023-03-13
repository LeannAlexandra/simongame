let waitTillNextRound = 3000;
let waitTillNextPositionShow = 900;
let animationTransitionOut = 75;
let animationTransitionIn = 150;


let sr = new Audio("sounds/red.mp3");
let sb = new Audio("sounds/blue.mp3");
let sg = new Audio("sounds/green.mp3");
let sy = new Audio("sounds/yellow.mp3");
let sw = new Audio("sounds/wrong.mp3");
let volume = 0.2;
let game = ["g", "r", "y", "b"];
let lvl = 0;
let g = $(".green");
let r = $(".red");
let y = $(".yellow");
let b = $(".blue");
let gameInp = ["g", "r", "y", "b"];


clear();

$('html').keypress((ev) => {
    if (ev.key === 'a') {
        clear();
        playGame();
    }
});

function playGame() {
    game.push(genLvl());
    $("h1").text("Round 1");

    showPattern(game);
    //await input.

    return false;
    //conceptualise:
    //generate, show, awaitInput, return test(per input);

}
function playNextRound() {
    //console.log("\n\nNEXT ROUND\n\n");

    gameInp = [];
    game.push(genLvl());
    $("h1").text("Round " + lvl);

    showPattern(game);
}
function showPattern(arrPattern) {
    //console.log("\n\nPATTERN SHOW\n\n");
    let i = 0;
    for (let a of arrPattern) {
        setTimeout(() => { showSingle(a); }, (waitTillNextPositionShow * i++));
    }
    //console.log("\n\n END PATTERN SHOW\n\n" + arrPattern);
}

function clear() {
    lvl = 0;
    game = [];
    gameInp = [];
    //console.log("\n\nGameReset\n\n");
}
function genLvl() {
    lvl++;
    //for
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return 'g';
            break;
        case 1:
            return 'r';
            break;
        case 2:
            return 'y';
            break;
        case 3:
            return 'b';
            break;
        default:
            alert("CRITICAL MATHEMATICAL FLAW LEANN!");
            break;
    };
}
function showSingle(k, i = "pressed") {

    switch (k) {
        case 'g':
            g.addClass(i);
            g.fadeOut(animationTransitionOut).fadeIn(animationTransitionIn);
            if (i === "wrongPressed") {
                sw.volume = volume / 2;
                sw.play();
            } else {
                sg.volume = volume;
                sg.play();
            }
            setTimeout(() => {
                g.removeClass(i);
            }, animationTransitionOut + animationTransitionIn);

            break;
        case 'r':
            r.addClass(i);
            r.fadeOut(animationTransitionOut).fadeIn(animationTransitionIn);
            if (i === "wrongPressed") {
                sw.volume = volume / 2;
                sw.play();
            } else {
                sr.volume = volume;
                sr.play();
            }
            setTimeout(() => {
                r.removeClass(i);
            }, animationTransitionOut + animationTransitionIn);
            break;
        case 'y':
            y.addClass(i);
            y.fadeOut(animationTransitionOut).fadeIn(animationTransitionIn);
            if (i === "wrongPressed") {
                sw.volume = volume / 2;
                sw.play();
            } else {
                sy.volume = volume;
                sy.play();
            }
            setTimeout(() => {
                y.removeClass(i);
            }, animationTransitionOut + animationTransitionIn);
            break;
        case 'b':
            b.addClass(i);
            b.fadeOut(animationTransitionOut).fadeIn(animationTransitionIn);
            if (i === "wrongPressed") {
                sw.volume = volume / 2;
                sw.play();
            } else {
                sb.volume = volume;
                sb.play();
            }
            setTimeout(() => {
                b.removeClass(i);
            }, animationTransitionOut + animationTransitionIn);
            break;
        default:
            alert("CRITICAL MATHEMATICAL FLAW LEANN!");
            break;
    };
}
function addInput(k) {

    gameInp.push(k);
    let current = gameInp.length - 1;

    if (game[current] === undefined || gameInp[current] == undefined) { showSingle(k); }
    else if (gameInp[current] === game[current]) {
        showSingle(k, "rightPressed");
        //playnextround*
        if (game[current + 1] == undefined) {
            $("h1").text("YAY!!! YOU WON!");
            setTimeout(() => {
                $("h1").text("Round " + lvl);
                playNextRound();
            }, waitTillNextRound);

        }
    } else {
        showSingle(k, "wrongPressed");
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, (waitTillNextRound * 0.4));
        clear()
        $("h1").text("OOPS! Try Again");
        setTimeout(() => { playGame(); }, waitTillNextRound);
    }

}

g.click(() => { addInput('g'); });
r.click(() => { addInput('r'); });
y.click(() => { addInput('y'); });
b.click(() => { addInput('b'); });
