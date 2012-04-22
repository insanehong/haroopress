var conf = {
    meta: {
        version: '0.8.0',
        defaultTitle: 'haroopress',
        description: 'Static Page Blog engine based Node.js',
        siteUrl: 'http://haroopress.github.com',
        author: 'Rhio Kim',
		keywords: [ 'node.js', 'javascript', 'html5' ]
    },
    articles: process.cwd() +'/source/articles',
    authors: process.cwd() +'/source/authors',

    sourceDir: __dirname + '/source',
    publicDir: __dirname + '/_public',
    deployDir: __dirname + '/_deploy',
    themeDir: __dirname + '/source/themes',

    lang: 'en',
    contentLength: 6,
    deployBranch: 'gh-pages',
    CNAME: ''
};

/* theme */
conf.theme = {
    name: 'basic'
};

/* third party settings */
conf.plugins = {
    github: {
        display: false,
        user: '[user github.com account]',
        repoCount: 0,       //if 0 is all else display count
        profileLink: true,
        skipForks: true
    },
    twitter: {
        display: false,
        user: '[user twitter account',
        tweetCount: 10,
        showReplies: false,
        followerButton: true,
        showFollowerCount: false,
        tweetButton: true
    },
    google: {
        display: false,
        googleAnalyticsId: 'UA-30492002-1',  //google analytics tracking id, default false
        googlePlus: true,
        googlePlusSize: 'medium',
        gplus: {
            display: false,
            user: '107034185858524700350'
        }
    },
    disqus: {
        display: true,
        shortName: 'haroopress',
        showCommentCount: true
    },
    facebook: {
        user: 'haroopress',
        showSiteLink: true,
        showLikeButton: true
    },
    delicious: {},
    contributors: {
        display: true
    },
    weather: {
        display: true,
        delay: 0,
        zipcode: 'KSXX0037'
    }
};

module.exports = conf;
