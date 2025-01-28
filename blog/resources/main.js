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
];
const contactLinks = [
{	"name": `Index`,	"url": `/blog/index`,	},
{	"name": `Neocities`,	"url": `https://neocities.org/site/snacksgg`,	},
{	"name": `Bluesky`,		"url": `https://bsky.app/profile/snacksgg.me`,	},
{	"name": `Tumblr`,		"url": `https://snacksgg.tumblr.com`,	},

];



/* ===============
	BLOG POSTS
=============== */

const posts = [
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
	`WELCOME TO BONUS STAGE!`,
	`wahoo`,
	`howdy 🤠`,
	`i get eaten by the worms`,
	`hey kid, i'm a computah`,
	`stop all the downloadin'`,
	`help computah`,
	`dibs on the candy bars`,
	`i just found 12 bricks`,
	`hope you're having a good day :)`,
	`its a good day to do what has to be done by me`,
	`so very sleepy`,
	`oughhhhh executive dysfunction`,
	`play tf2`,
	`play sayonara wild hearts`,
	`play gitaroo man`,
	`play TUNIC`,
	`play rhythm heaven fever`,
	`drink 5 hour energy`,
	`<b>DRINK</b> 5 hour energy`,
	`it's not a drink, more like a drink`,
	`can i get a bowl of that chili`,
	`CONGRATULATIONS! YOU WON!`,
	`mmm soup`,
	`CAR BATTERY!`,
	`probably procrastinating`,
	`honk shoe`,
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
