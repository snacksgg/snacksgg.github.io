/*
ZONELOTS cliff notes

Adding posts:
1) Copy the post template file.
2) Write the post content in the file.
3) Add a new object to the "posts" array, containing the post's title (this can include HTML), filename (not including the ".html" extension), and tag list (optional). Sample:
	{
		"title": `{{ POST TITLE }}`,
		"filename": `{{ YYYY-MM-DD-post-title }}`,
		"tags": [`tag 1`, `tag 2`, `tag 3`],
	},

Safe characters to use in tags:
	letters (upper- or lowercase)
	numbers
	? / : @ - . _ ~ ! $ & ' ( ) * + , ; = (question mark, slash, colon, at sign, hyphen-minus, period, underscore, tilde, exclamation mark, dollar, ampersand, apostrophe, left parenthesis, right parenthesis, asterisk, plus, comma, semicolon, equals)
	spaces (will be replaced by hyphens in tag urls)

Adding messages:
Add a new item in the "messages" array, containing the message content (this can include HTML, but should be inline content only)
*/



/* =============
	SETTINGS
============= */

const latestPostsCutoff = 10; // number of blog posts displayed on home page
const messagesOn = true; // whether or not to show a random message in the header

// links listed in header (nav) and footer (contact)
const navLinks = [
{	"name": `Snacks' Blog Box`,	"filename": `index`,	},
{	"name": `About`,		"filename": `about`,	},
{	"name": `Tags`,			"filename": `tags`,		},
{	"name": `Archive`,		"filename": `archive`,	},
{	"name": `Journal`,		"filename": `journal`,	},
];
const contactLinks = [
{	"name": `Back to Home`,	"url": `/`,	},
{	"name": `Blog Index`,	"url": `/blog/index`,	},
{	"name": `Neocities`,	"url": `https://neocities.org/site/snacksgg`,	},
{	"name": `Bluesky`,		"url": `https://bsky.app/profile/snacksgg.me`,	},
{	"name": `Tumblr`,		"url": `https://snacksgg.tumblr.com`,	},
{	"name": `Powered by Zonelots!`,		"url": `https://codeberg.org/cdvr/Zonelots`,	},

];



/* ===============
	BLOG POSTS
=============== */

const posts = [
    
    {
	"title": `Art Games to Start Drawing Again`,
	"filename": `2025-02-17-easing-back-into-art`,
	"tags": [`art talk`, ],
},
    
{
	"title": `Happy New Year!`,
	"filename": `2024-01-02-happy-new-year`,
	"tags": [`updates`, `new year`],
},
    
{
	"title": `Test Blog!`,
	"filename": `2023-12-23-test-blog`,
	"tags": [`updates`, ],
},
      

      
];



/* =============
	MESSAGES
============= */

const messages = [
    	`<img src="/images/pumapost1.png" width="50px">`,
    	`here, have a medkit <img src="https://developer.valvesoftware.com/w/images/thumb/5/52/Item_healthkit.png/300px-Item_healthkit.png" width="50px">`,
	`<img src="https://snacksgg.me/images/mewave.gif" width="50px">`,
	`WELCOME TO BONUS STAGE!`,
	`wahoo`,
	`howdy 🤠`,
	`music make you lose control`,
	`using proper rhythm, wiggle your fingers and jam the keys!`,
	`i get eaten by the worms`,
	`hey kid, i'm a computah`,
	`stop all the downloadin'`,
	`help computah`,
	`<em>*continues to butter my biscuit*</em>`,
	`dibs on the candy bars`,
	`dibs on the chips`,
	`incinerate.`,
	`i can't control my brain`,
	`i just found 12 bricks`,
	`hope you're having a good day :)`,
	`its a good day to do what has to be done by me`,
	`so very sleepy`,
	`hello my treacherous friends, thank you for joining me here tonight`,
	`you gotta draaaaaw somethin'!`,
	`gimme a hug, man`,
	`what can you say about carlton? he was carlton`,
	`have you heard of the high elves?`,
	`walk into the wall like you're an NPC`,
	`i live in a giant bucket`,
	`Tuesday's coming, did you bring your coat?`,
	`you didn't tell me you were bringing a secret weapon, luigi`,
	`funky music playing in my head`,
	`i'm feeling fat, and sassy`,
	`i'm not sick, but i'm not well`,
	`they got this game called Braid, ain't no point to the game`,
	`deserves to be eaten by wolves`,
	`last night a dj saved my life`,
	`on the internet, no one has to know i'm a.... seaman`,
	`fishbowl to mercury`,
	`i am a patient boy, i wait i wait i wait i wait`,
	`mmm, delicious, rap snitch knishes`,
	`it's you're lying to me`,
	`oobh i got plany off time`,
	`no squealing, remember that it's free real estate`,
	`wuh`,
	`buh`,
	`guh`,
	`yuh`,
	`huh`,
	`woag`,
	`YOU should back up your files!`,
	`sometimes i dream about cheese`,
	`daft punk is playing at my house`,
	`*takes poison damage*`,
	`you hear about video games?`,
	`Way back when I was just a little bitty boy living in a box under the stairs in the corner of the basement of the house half a block down the street from Jerry's Bait shop. You know the place.`,
	`don't breathe this`,
	`!rtv`,
	`i got a message for the poodle in your pocket`,
	`you are not the guy, you're not capable of being the guy`,
	`i wanna be the guy`,
	`woohoo flimby`,
	`play tf2`,
	`play sayonara wild hearts`,
	`play gitaroo man`,
	`get funky! be funky! stay funky, yo hustle hustle!`,
	`hey G, would you make me a sandwich?`,
	`play TUNIC`,
	`play rhythm heaven fever`,
	`drink 5 hour energy`,
	`<b>DRINK</b> 5 hour energy`,
	`it's not a drink, more like a drink`,
	`can i get a bowl of that chili`,
	`CONGRATULATIONS! YOU WON!`,
	`mmm soup`,
	`my dogs expecting me, i'm ready to go`,
	`CAR BATTERY!`,
	`probably procrastinating`,
	`aeiou`,
	`honk shoe`,
	`yeah`,
	`yeah?`,
	`stay lame`,
	`girls rule the day... but us guys.... <font color="lightblue"><a href="https://www.youtube.com/watch?v=kZlZ-ZK3bXQ rel="external" target="_blank">we get the night</a></font>`,


];



/* ======================
	PAGE CONSTRUCTION
====================== */

// get current filepath and the relative paths to the posts folder and the index folder
const path = location.pathname.split("/");
const inPost = path.at(-2) === `posts`;
const pathToPosts = inPost ? `./` : `./posts/`;
const pathToInfo = inPost ? `../` : `./`;

// take a post in posts array and return a formatted link to that post
function formatPostLink(post) {
	return `<li><time>${post.filename.slice(0, 10)}</time>: <a href="${pathToPosts}${post.filename}.html">${post.title}</a></li>`;
}

// convert tag to HTML id/link hash
function formatTagHash(tag) {
	return `--${tag.replaceAll(/\s+/g, `-`)}`;
}

/* ------------------
	HEADER/FOOTER
------------------ */

// write in main-nav and footer content
document.getElementById(`header`).innerHTML = `
<nav id="main-nav"><ul class="flex-list">${navLinks.map(link => `<li><a href="${pathToInfo}${link.filename}.html">${link.name}</a></li>`).join(``)}</ul></nav>
${messagesOn && messages.length > 0
? `<div id="header-message">${messages[Math.floor(Math.random() * messages.length)]}</div>`
: ``}
`;
document.getElementById(`contact-links`).innerHTML = contactLinks.map(link => `<li><a href="${link.url}" rel="external">${link.name}</a></li>`).join(``);

/* ----------
	LISTS
---------- */

// build list of latest X blog posts for the home page
const latestPosts = document.getElementById(`latest-posts`);
if (latestPosts) latestPosts.innerHTML = posts.slice(0, latestPostsCutoff).map(formatPostLink).join(``);

// build list of all blog posts for the main blog page
const allPosts = document.getElementById(`all-posts`);
if (allPosts) allPosts.innerHTML = posts.map(formatPostLink).join(``);

// build tag list and list posts by tag on tags page
const tagsList = document.getElementById(`tag-index`);
if (tagsList) {
	const postsByTag = {};

	// for each tag, make a set of indices of posts with that tag
	posts.forEach((post, i) => post.tags.forEach(tag => {
		postsByTag[tag] ??= new Set();
		postsByTag[tag].add(i);
	}));

	tagsList.innerHTML = Object.entries(postsByTag).map(([tag, postIndices]) => `
	<li id="${formatTagHash(tag)}">
		<details>
			<summary>${tag}</summary>
			<ol class="post-list" reversed>${[...postIndices].map(i => formatPostLink(posts[i])).join(``)}</ol>
		</details>
	</li>
	`).join(``);

	// if URL includes hash with tag name, open its post list
	if (location.hash.length > 0) {
		const selectedTag = document.getElementById(location.hash.slice(1));
		if (selectedTag) selectedTag.querySelector(`details`).open = true;
	}
}

/* --------------
	BLOG POST
-------------- */

if (inPost) {
	// get index of post matching path (cut off file extension so if webhost cuts off extension the script still works)
	const i = posts.findIndex(post => post.filename === path.at(-1).split(`.html`)[0]);

	const postDate = document.getElementById(`post-date`);
	const pathDate = posts[i].filename.substring(0, 10);
	postDate.dateTime = pathDate;
	postDate.innerHTML = new Date(pathDate).toLocaleDateString();

	if (posts[i].tags) document.getElementById(`post-tags`).innerHTML = posts[i].tags.map(tag => `<li><a href="${pathToInfo}tags.html#${formatTagHash(tag)}">${tag}</a></li>`).join(``);

	// link to previous and next posts (if this post is first/latest, link to index instead of previous/next post)
	let postNav = ``;

	postNav += `<li>${i < posts.length - 1
	? `<a href="${pathToPosts}${posts[i + 1].filename}.html" rel="prev">${posts[i + 1].title}</a>`
	: `<a href="${pathToInfo}index.html" rel="index">Back to index</a>`}</li>`;
	postNav += `<li>${i > 0
	? `<a href="${pathToPosts}${posts[i - 1].filename}.html" rel="next">${posts[i - 1].title}</a>`
	: `<a href="${pathToInfo}index.html" rel="index">Back to index</a>`}</li>`;

	document.getElementById(`post-nav`).innerHTML = `<ul>${postNav}</ul>`;
}
