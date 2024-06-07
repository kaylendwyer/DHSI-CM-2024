let grammar;
let lines = [];

let currentLine = "";
let currentChar = 0;
let lineIndex = 0;
let typingSpeed = 100; // Time in milliseconds per character
let pauseDuration = 1000; // Time to pause after a line is typed
let lastTypeTime = 0;
let lastLineTypedTime = 0;
let startY; // Starting Y position
let lineHeight = 40; // Height of each line
let linesToShow = []; // Lines that have been fully typed and need to be shown
let isTyping = true; // Track if currently typing or pausing

function setup() {
    createCanvas(800, 600);
    background(255);
    textFont('monospace');
    textSize(24);
    frameRate(30);

    startY = height * 3 / 4 ; // Start 3/4 down the page
}
    // Define the Tracery grammar
    let traceryGrammar = {
        "origin": ["#1#","#2#", "#3#", "#4#", "#5#", "#6#", "#7#", "#8#", "#9#", "#10#", "#11#", "#12#", "#13#", "#14#", "#15#"],
        "1": ["#interjection# #adjective# #noun#,"],
        "2": ["Thy #noun_plural# are #adverb# to me,"],
        "3": ["As #adjective# #noun.s#,"],
        "4": ["On a #adjective# #noun.s#,"],
        "5": ["That #adverb# #verb# out,"],
        "6": ["Its #adjective# #noun_plural#,"],
        "7": ["Into a #adjective# #adjective# #noun#."],
        "8": ["Now the #adjective# #noun_plural#,"],
        "9": ["Are #verb_gerund# #adverb# up the #noun_plural#,"],
        "10": ["And #verb_gerund# #noun_plural# #verb# and #verb#,"],
        "11": ["Like #verb_gerund# #adjective# #noun#."],
        "12": ["I implore thee, my #adjective# #verb_gerund# #noun_plural#,"],
        "13": ["And #adverb# #verb# me,"],
        "14": ["With #adjective# #noun_plural#,"],
        "15": ["Or else I shall #verb# thee in the #noun_plural# with my #noun#,"],
        // "16": ["See if I don't."],
        "interjection": ["Oh", "Ah", "Lo", "Behold"],
        "adjective": [
            "freddled",
            "plurdled",
            "lurgid",
            "mordiously",
            "festering",
            "crinkly",
            "wimbly",
            "zoggin",
            "quibblesome",
            "frabjous",
            "smurdly",
            "glorptastic",
            "blimblish",
            "thrindle",
            "scrobby",
            "flooply",
            "trumbular",
            "squibberous",
            "drimply",
            "nurdlesome",
            "grimbly",
            "zibberant",
            "frobnicated",
            "skroggled"
        ],
        "noun": [
            "#prefix##root##suffix#", 
            "#prefix##root#", 
            "#root##suffix#"
        ],
        "prefix": [
            "grunt", "mictu", "gabble", "slay", "agro", "axle", "glup", "liver", "foont", "turl", "bindle", "gobber", "blurgle",
            "snorfle", "splurg", "zorp", "frob", "quibble", "munch", "flibber", "grunkle", "squibble", "thrumble", "slubber",
            "plinker", "snarkle", "splooch", "glarble", "zazzle", "snozzle", "gobble", "bliffen", "snuggle",
            "blarg", "snarf", "plub", "frip", "glorp", "zort", "mug", "flan", "smor", "drob"
        ],
        "root": [
            "bugg", "turi", "blotch", "bee", "jurt", "organ", "squeal", "jid", "crust", "grurt", "pule", "slime", "ing", "drome",
            "wurdle", "wart", "cruncheon", "blotch", "let", "tangle", "tiz", "fizz", "waffle", "flab", "plort", "shank", "whomp",
            "dunk", "doodle", "quark", "doodle", "twist", "wort", "wump", "flop", "flump", "fuzz",
            "bidd", "flob", "krim", "gnap", "splee", "zook", "blib", "trud", "wham", "plix"
        ],
        "suffix": [
            "ly", "tion", "chat", "e", "le", "er", "jid", "le", "grurt", "ule", "slime", "ing", "drome", "wurdle", "wart", "cruncheon",
            "blotch", "let", "gle", "z", "fizz", "waffle", "flab", "plort", "shank", "whomp", "dunk", "doodle", "quark", "doodle",
            "twist", "wort", "wump", "flop", "flump", "fuzz",
            "gloop", "buzzle", "twit", "dunk", "snark", "dribble", "futz", "whomp", "quark", "spludge"
        ],
        "noun_plural": [
            "gruntbugglies",
            "micturitions",
            "gabbleblotchats",
            "bees",
            "jurtles",
            "organs",
            "squealers",
            "slayjids",
            "agrocrustles",
            "axlegrurts",
            "glupules",
            "liverslimes",
            "foontings",
            "turlings",
            "dromes",
            "bindlewurdles",
            "gobberwarts",
            "blurglecruncheons",
            "snorfleblotches",
            "splurglets",
            "zorptangles",
            "frobtizes",
            "quibblefizzes",
            "munchwaffles",
            "flibberflabs",
            "grunkleplortes",
            "squibbleshanks",
            "thrumblewhomps",
            "slubberdunks",
            "plinkerdoodles",
            "snarklequarks",
            "sploochdoodle",
            "glarbletwists",
            "zazzleworts",
            "snozzlewumps",
            "gobbleflops",
            "bliffenflumps",
            "snugglefuzzes"
        ],
        "verb": [
            "blurt",
            "slurp",
            "frart",
            "slipulate",
            "implore",
            "drangle",
            "rend",
            "squizzle",
            "splurgle",
            "zorpify",
            "flibberate",
            "quibble",
            "munch",
            "wiffle",
            "glonk",
            "thwarp",
            "blunk",
            "flibble",
            "snork",
            "wabble",
            "zorg",
            "sproink",
            "twaddle",
            "gobble",
            "splutter",
            "blarp",
            "quaggle"
        ],
        "verb_gerund": [
            "blurting",
            "slurping",
            "frarting",
            "slipulating",
            "imploring",
            "drangling",
            "rending"
        ],
        "adverb": [
            "mordiously",
            "hagrilly",
            "hooptiously"
        ]
    };

    grammar = tracery.createGrammar(traceryGrammar);

    // Generate the lines of the poem
    for (let i = 0; i < 16; i++) {
        lines.push(grammar.flatten('#origin#'));
    }

    function draw() {
        background(255);
        
        // Draw the already typed lines and scroll them up
        for (let i = 0; i < linesToShow.length; i++) {
            let lineY = startY - (linesToShow.length - i) * lineHeight;
            fill(255-i*10,255-i*10,255-i*10);
            text(linesToShow[i], 50, lineY);
        }
    
        // Handle typing and pausing logic
        if (lineIndex < lines.length) {
            if (isTyping) {
                if (millis() - lastTypeTime > typingSpeed) {
                    if (currentChar < lines[lineIndex].length) {
                        currentLine += lines[lineIndex].charAt(currentChar);
                        currentChar++;
                        lastTypeTime = millis();
                    } else {
                        // Finished typing current line
                        isTyping = false;
                        lastLineTypedTime = millis();
                    }
                }
            } else {
                if (millis() - lastLineTypedTime > pauseDuration) {
                    // Move to the next line
                    linesToShow.push(currentLine);
                    lineIndex++;
                    currentLine = "";
                    currentChar = 0;
                    isTyping = true;
                    lastTypeTime = millis();
                }
            }
    
            // Draw the current line being typed
            fill(0); // Full opacity for the current line being typed
            text(currentLine, 50, startY);
        }
    
        // Scroll all lines up
        if (linesToShow.length > height / lineHeight) {
            startY -= 1;
        }
    }