export interface FandomItem {
  id: string;
  category: string;
  title: string;
  creator: string;
  year: number;
  rating: number;
  tags: string[];
  synopsis: string;
  trending?: boolean;
}

const mk = (
  category: string,
  rows: [string, string, string, number, number, string[], string, boolean?][],
): FandomItem[] =>
  rows.map(([id, title, creator, year, rating, tags, synopsis, trending]) => ({
    id,
    category,
    title,
    creator,
    year,
    rating,
    tags,
    synopsis,
    trending,
  }));

export const items: FandomItem[] = [
  ...mk("anime", [
    ["fullmetal-alchemist", "Fullmetal Alchemist: Brotherhood", "Bones", 2009, 9.1, ["Shonen", "Adventure", "Drama"], "Two brothers pay a terrible price for forbidden alchemy and travel a war-scarred nation chasing the one stone that could undo it.", true],
    ["attack-on-titan", "Attack on Titan", "Wit Studio / MAPPA", 2013, 9.0, ["Dark Fantasy", "Action"], "Humanity's last walled cities face man-eating giants — until the truth behind the walls proves far worse than the monsters outside.", true],
    ["steins-gate", "Steins;Gate", "White Fox", 2011, 9.0, ["Sci-Fi", "Thriller"], "A self-styled mad scientist discovers his microwave can text the past, and every message rewrites a future he can't survive."],
    ["demon-slayer", "Demon Slayer", "ufotable", 2019, 8.6, ["Shonen", "Supernatural"], "A kind-hearted charcoal seller takes up a blade after demons destroy his family, determined to make his sister human again.", true],
    ["cowboy-bebop", "Cowboy Bebop", "Sunrise", 1998, 8.9, ["Space Western", "Noir"], "A jazz-scored crew of bounty hunters drifts through the solar system, each running from a past that always catches up."],
    ["spirited-away", "Spirited Away", "Studio Ghibli", 2001, 8.9, ["Fantasy", "Film"], "A sulky ten-year-old is trapped in a bathhouse for spirits and must work, remember her name, and free her parents."],
    ["jujutsu-kaisen", "Jujutsu Kaisen", "MAPPA", 2020, 8.6, ["Shonen", "Supernatural"], "Swallowing a cursed finger makes a high schooler host to the king of curses — and a student at a very dangerous school."],
    ["vinland-saga", "Vinland Saga", "Wit Studio", 2019, 8.8, ["Historical", "Drama"], "A Viking boy raised on revenge slowly discovers that the hardest thing a warrior can do is put the sword down."],
    ["mob-psycho", "Mob Psycho 100", "Bones", 2016, 8.7, ["Comedy", "Supernatural"], "The most powerful esper alive would rather get in shape and talk to a girl than use his devastating psychic gifts."],
    ["monster", "Monster", "Madhouse", 2004, 8.9, ["Thriller", "Mystery"], "A surgeon saves a boy's life and spends the next decade learning that he rescued something inhuman."],
  ]),
  ...mk("gaming", [
    ["elden-ring", "Elden Ring", "FromSoftware", 2022, 9.5, ["Open World", "Souls-like"], "A shattered golden realm opens up in every direction, indifferent to whether you are ready for what lives in it.", true],
    ["hollow-knight", "Hollow Knight", "Team Cherry", 2017, 9.2, ["Metroidvania", "Indie"], "A tiny nail-wielding knight descends into a ruined insect kingdom that is quietly, beautifully dying."],
    ["the-witcher-3", "The Witcher 3: Wild Hunt", "CD Projekt Red", 2015, 9.4, ["RPG", "Open World"], "A monster hunter searches a war-torn continent for his adopted daughter while every contract asks a harder moral question.", true],
    ["breath-of-the-wild", "Breath of the Wild", "Nintendo", 2017, 9.4, ["Adventure", "Open World"], "Wake up in a ruined Hyrule with a glider, a slate and absolutely no instructions about where to go."],
    ["disco-elysium", "Disco Elysium", "ZA/UM", 2019, 9.3, ["RPG", "Narrative"], "A detective with no memory and too many voices in his head investigates a hanging in a collapsing seaside district."],
    ["hades", "Hades", "Supergiant Games", 2020, 9.1, ["Roguelike", "Action"], "The prince of the underworld keeps trying to leave home, and every failed escape deepens the family argument."],
    ["red-dead-2", "Red Dead Redemption 2", "Rockstar Games", 2018, 9.3, ["Open World", "Western"], "An outlaw gang runs out of frontier to hide in as America closes the last gaps in its map."],
    ["stardew-valley", "Stardew Valley", "ConcernedApe", 2016, 8.9, ["Simulation", "Cozy"], "Quit the corporate job, inherit a ruined farm, and rebuild a small town one season at a time.", true],
    ["portal-2", "Portal 2", "Valve", 2011, 9.3, ["Puzzle", "Comedy"], "Two portals, one collapsing test facility and the funniest AI ever written into a video game."],
    ["celeste", "Celeste", "Maddy Makes Games", 2018, 9.0, ["Platformer", "Indie"], "Climbing a mountain as a metaphor for anxiety, with pixel-perfect controls and an extraordinary soundtrack."],
  ]),
  ...mk("movies", [
    ["dune-part-two", "Dune: Part Two", "Denis Villeneuve", 2024, 8.7, ["Sci-Fi", "Epic"], "Paul Atreides joins the Fremen and becomes exactly the messiah he was warned not to become.", true],
    ["everything-everywhere", "Everything Everywhere All at Once", "Daniels", 2022, 8.6, ["Sci-Fi", "Comedy"], "A laundromat owner audits her taxes and simultaneously saves the multiverse from a bagel."],
    ["spider-verse", "Across the Spider-Verse", "Sony Animation", 2023, 8.8, ["Animation", "Superhero"], "Every Spider-Person in existence agrees on one rule, and Miles Morales decides to break it.", true],
    ["interstellar", "Interstellar", "Christopher Nolan", 2014, 8.7, ["Sci-Fi", "Drama"], "A farmer-turned-pilot leaves a dying Earth to find a new one, and loses decades to the gravity of a single planet."],
    ["parasite", "Parasite", "Bong Joon-ho", 2019, 8.5, ["Thriller", "Drama"], "One family infiltrates another, and the basement of a beautiful house holds the whole class system."],
    ["mad-max-fury-road", "Mad Max: Fury Road", "George Miller", 2015, 8.1, ["Action", "Post-Apocalyptic"], "A two-hour car chase in the desert that turns out to be a tightly plotted liberation story."],
    ["blade-runner-2049", "Blade Runner 2049", "Denis Villeneuve", 2017, 8.0, ["Sci-Fi", "Noir"], "A replicant detective follows a thirty-year-old secret through the most beautiful fog ever filmed."],
    ["the-dark-knight", "The Dark Knight", "Christopher Nolan", 2008, 9.0, ["Superhero", "Crime"], "Gotham's best hope and its worst impulse spend a summer proving points about each other."],
    ["arrival", "Arrival", "Denis Villeneuve", 2016, 7.9, ["Sci-Fi", "Drama"], "A linguist learns an alien language and discovers that grammar can change how you experience time."],
    ["princess-mononoke", "Princess Mononoke", "Hayao Miyazaki", 1997, 8.7, ["Animation", "Fantasy"], "Gods of the forest and the people of the iron town go to war, and nobody in the film is simply wrong."],
  ]),
  ...mk("tv-shows", [
    ["breaking-bad", "Breaking Bad", "Vince Gilligan", 2008, 9.5, ["Crime", "Drama"], "A chemistry teacher's cancer diagnosis becomes the excuse he'd been waiting for his entire life.", true],
    ["the-last-of-us", "The Last of Us", "HBO", 2023, 8.7, ["Drama", "Post-Apocalyptic"], "A smuggler escorts an immune teenager across a collapsed America and slowly stops pretending she's cargo."],
    ["severance", "Severance", "Dan Erickson", 2022, 8.7, ["Sci-Fi", "Thriller"], "Employees split their memories between work and home, and the work half starts asking questions.", true],
    ["arcane", "Arcane", "Fortiche / Riot", 2021, 9.0, ["Animation", "Fantasy"], "Two sisters end up on opposite sides of a city war painted like a moving oil canvas.", true],
    ["the-wire", "The Wire", "David Simon", 2002, 9.3, ["Crime", "Drama"], "Baltimore examined institution by institution, with no interest in making any of them heroic."],
    ["chernobyl", "Chernobyl", "Craig Mazin", 2019, 9.4, ["Historical", "Drama"], "The cost of lies, dramatised hour by hour as a reactor and a system both come apart."],
    ["better-call-saul", "Better Call Saul", "Peter Gould", 2015, 9.0, ["Crime", "Drama"], "A decent-ish lawyer talks himself, very slowly and very entertainingly, into becoming someone else."],
    ["twin-peaks", "Twin Peaks", "David Lynch", 1990, 8.9, ["Mystery", "Surreal"], "An FBI agent investigates a murder in a logging town that runs on coffee, pie and dream logic."],
    ["fleabag", "Fleabag", "Phoebe Waller-Bridge", 2016, 8.7, ["Comedy", "Drama"], "A woman narrates her own life to camera until someone finally notices her doing it."],
    ["stranger-things", "Stranger Things", "The Duffer Brothers", 2016, 8.6, ["Sci-Fi", "Horror"], "Small-town kids, a government lab and a dimension that keeps reaching through the wall."],
  ]),
  ...mk("k-pop", [
    ["bts", "BTS", "BigHit Music", 2013, 9.2, ["Boy Group", "Global"], "Seven members who turned intensely personal songwriting into the biggest pop act on the planet.", true],
    ["blackpink", "BLACKPINK", "YG Entertainment", 2016, 8.9, ["Girl Group", "Hip-Hop"], "Four members, maximalist production and a stage presence engineered for stadiums.", true],
    ["newjeans", "NewJeans", "ADOR", 2022, 8.8, ["Girl Group", "Alt-Pop"], "Nineties breakbeats and understated styling that reset what a debut group could sound like.", true],
    ["seventeen", "SEVENTEEN", "Pledis", 2015, 8.9, ["Boy Group", "Self-Produced"], "Thirteen members who write, produce and choreograph their own work in three distinct units."],
    ["twice", "TWICE", "JYP Entertainment", 2015, 8.6, ["Girl Group", "Bright Pop"], "The hook-machine of a generation, with a discography built on choruses you cannot escape."],
    ["stray-kids", "Stray Kids", "JYP Entertainment", 2018, 8.7, ["Boy Group", "Noise Music"], "Aggressive, self-produced tracks that treat a title song like a demolition."],
    ["iu", "IU", "EDAM Entertainment", 2008, 9.0, ["Soloist", "Ballad"], "A soloist whose songwriting turned a child star into the country's most trusted voice."],
    ["exo", "EXO", "SM Entertainment", 2012, 8.7, ["Boy Group", "R&B"], "A superpower concept, immaculate vocals and the template most of the 2010s followed."],
    ["le-sserafim", "LE SSERAFIM", "Source Music", 2022, 8.5, ["Girl Group", "Attitude"], "Fearless by mandate, with sharp choreography and a deliberately abrasive edge."],
    ["red-velvet", "Red Velvet", "SM Entertainment", 2014, 8.6, ["Girl Group", "Experimental"], "Two concepts in one group: sugary 'red' singles and moody 'velvet' R&B."],
  ]),
  ...mk("comics", [
    ["watchmen", "Watchmen", "Alan Moore & Dave Gibbons", 1986, 9.4, ["Superhero", "Deconstruction"], "Costumed vigilantes in a world that hates them, structured like a clock running down.", true],
    ["saga", "Saga", "Brian K. Vaughan & Fiona Staples", 2012, 9.2, ["Space Opera", "Romance"], "Two soldiers from opposite sides of a galactic war raise a baby on the run.", true],
    ["sandman", "The Sandman", "Neil Gaiman", 1989, 9.1, ["Fantasy", "Mythology"], "The anthropomorphic personification of dreams escapes captivity and rebuilds a kingdom."],
    ["maus", "Maus", "Art Spiegelman", 1980, 9.3, ["Memoir", "Historical"], "A son interviews his father about surviving Auschwitz, drawn with mice and cats."],
    ["batman-year-one", "Batman: Year One", "Frank Miller & David Mazzucchelli", 1987, 8.9, ["Superhero", "Noir"], "Two men return to a corrupt Gotham: one in a cape, one in a police uniform."],
    ["ms-marvel", "Ms. Marvel", "G. Willow Wilson", 2014, 8.5, ["Superhero", "Coming of Age"], "A Pakistani-American teen in Jersey City gets polymorph powers and a lot of homework."],
    ["y-the-last-man", "Y: The Last Man", "Brian K. Vaughan", 2002, 8.8, ["Post-Apocalyptic", "Drama"], "Every mammal with a Y chromosome dies at once — except one man and his monkey."],
    ["hellboy", "Hellboy", "Mike Mignola", 1993, 8.7, ["Horror", "Folklore"], "A demon raised by the good guys punches folklore in the face across a century of black ink."],
    ["daredevil-born-again", "Daredevil: Born Again", "Frank Miller", 1986, 8.9, ["Superhero", "Crime"], "Kingpin learns Daredevil's name and methodically takes apart everything he has."],
    ["monstress", "Monstress", "Marjorie Liu & Sana Takeda", 2015, 8.6, ["Dark Fantasy", "Art Nouveau"], "A war survivor shares her body with an eldritch power in an exquisitely illustrated matriarchal world."],
  ]),
  ...mk("manga", [
    ["berserk", "Berserk", "Kentaro Miura", 1989, 9.4, ["Dark Fantasy", "Seinen"], "The most detailed ink in the medium, spent on a mercenary's long walk through causality and grief.", true],
    ["one-piece", "One Piece", "Eiichiro Oda", 1997, 9.2, ["Shonen", "Adventure"], "A rubber-bodied optimist assembles a crew and sails toward the largest treasure ever plotted.", true],
    ["vagabond", "Vagabond", "Takehiko Inoue", 1998, 9.3, ["Historical", "Seinen"], "Musashi Miyamoto's brush-painted journey from feral swordsman to something close to peace."],
    ["chainsaw-man", "Chainsaw Man", "Tatsuki Fujimoto", 2018, 8.9, ["Shonen", "Horror"], "A boy who merges with his chainsaw devil-dog wants nothing more than bread and a normal life.", true],
    ["20th-century-boys", "20th Century Boys", "Naoki Urasawa", 1999, 9.1, ["Mystery", "Thriller"], "A childhood game invented in a grass field turns out to be the blueprint for the end of the world."],
    ["oyasumi-punpun", "Oyasumi Punpun", "Inio Asano", 2007, 8.9, ["Drama", "Coming of Age"], "A boy drawn as a cartoon bird grows up inside photorealistic Tokyo and unbearable honesty."],
    ["blame", "BLAME!", "Tsutomu Nihei", 1997, 8.6, ["Cyberpunk", "Sci-Fi"], "A near-silent search through a megastructure so large that cities fit inside its floor plan."],
    ["death-note", "Death Note", "Tsugumi Ohba & Takeshi Obata", 2003, 8.9, ["Thriller", "Supernatural"], "A notebook that kills, a student who thinks he's justice, and the detective who disagrees."],
    ["witch-hat-atelier", "Witch Hat Atelier", "Kamome Shirahama", 2016, 8.8, ["Fantasy", "Art"], "Magic is drawing, which makes every page an argument about craft."],
    ["dungeon-meshi", "Delicious in Dungeon", "Ryoko Kui", 2014, 8.8, ["Fantasy", "Comedy"], "An adventuring party runs out of money and starts eating the monsters, rigorously."],
  ]),
];

export const itemsByCategory = (slug: string) =>
  items.filter((i) => i.category === slug);

export const itemById = (category: string, id: string) =>
  items.find((i) => i.category === category && i.id === id);

export const trendingItems = items.filter((i) => i.trending);
