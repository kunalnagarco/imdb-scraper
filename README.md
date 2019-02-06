# expressyo-imdb-scraper

This package is an attempt at creating the most complete IMDb API.

## Todos

[] Linting
[] Add more tests
[] Code Coverage (probably Instanbul)
[] CI

## Endpoints

Here are the endpoints supported by this API:

### Get the user's watchlist

```
/GET /watchlist/:userID
```

#### Response

```json
[
  {
    "baseUrl":"https://www.imdb.com",
    "id":"tt5461944",
    "name":"Hotel Mumbai",
    "type":"featureFilm",
    "link":"/title/tt5461944",
    "img":"https://m.media-amazon.com/images/M/MV5BYTJlZWY2YjYtZGIxMy00MDEwLTliNzMtZGM3MDQ1NzlmNDY1XkEyXkFqcGdeQXVyNDY2MjcyOTQ@._V1_.jpg",
    "year":2018,
    "plot":"The true story of the Taj Hotel terrorist attack in Mumbai. Hotel staff risk their lives to keep everyone safe as people make unthinkable sacrifices to protect themselves and their families.",
    "certificate":"",
    "rating":7.2,
    "votes":225,
    "movieMeterCurrentRank":698,
    "runtime":7500,
    "release":1552521600000,
    "metascore":66,
    "genres":[
      {
        "link":"/search/title?genres=drama",
        "name":"Drama"
      },
      {
        "link":"/search/title?genres=history",
        "name":"History"
      },
      {
        "link":"/search/title?genres=thriller",
        "name":"Thriller"
      }
    ],
    "stars":[
      {
        "link":"/name/nm2309517",
        "name":"Armie Hammer"
      },
      {
        "link":"/name/nm0005042",
        "name":"Jason Isaacs"
      },
      {
        "link":"/name/nm2258164",
        "name":"Nazanin Boniadi"
      },
      {
        "link":"/name/nm2353862",
        "name":"Dev Patel"
      }
    ],
    "directors":[
      {
        "link":"/name/nm2285536",
        "name":"Anthony Maras"
      }
    ]
  },
  {
    "baseUrl":"https://www.imdb.com",
    "id":"tt2798920",
    "name":"Annihilation",
    "type":"featureFilm",
    "link":"/title/tt2798920",
    "img":"https://m.media-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_.jpg",
    "year":2018,
    "plot":"A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don&#39;t apply.",
    "certificate":"R",
    "rating":6.9,
    "votes":205698,
    "movieMeterCurrentRank":64,
    "runtime":6900,
    "release":1519344000000,
    "metascore":79,
    "genres":[
      {
        "link":"/search/title?genres=adventure",
        "name":"Adventure"
      },
      {
        "link":"/search/title?genres=drama",
        "name":"Drama"
      },
      {
        "link":"/search/title?genres=horror",
        "name":"Horror"
      },
      {
        "link":"/search/title?genres=mystery",
        "name":"Mystery"
      },
      {
        "link":"/search/title?genres=sci-fi",
        "name":"Sci-Fi"
      },
      {
        "link":"/search/title?genres=thriller",
        "name":"Thriller"
      }
    ],
    "stars":[
      {
        "link":"/name/nm0000204",
        "name":"Natalie Portman"
      },
      {
        "link":"/name/nm0000492",
        "name":"Jennifer Jason Leigh"
      },
      {
        "link":"/name/nm1935086",
        "name":"Tessa Thompson"
      },
      {
        "link":"/name/nm0938950",
        "name":"Benedict Wong"
      }
    ],
    "directors":[
      {
        "link":"/name/nm0307497",
        "name":"Alex Garland"
      }
    ]
  }
]
```

### Get an IMDb list (public only)

```
/GET /list/:listID/:page
```

#### Response

```json
{
  "baseUrl":"https://www.imdb.com",
  "id":"ls057246838",
  "name":"Watched: Movies",
  "link":"/list/ls057246838",
  "created":"01 Mar 2013",
  "public":true,
  "user":{
    "id":"ur39600768",
    "link":"/user/ur39600768",
    "name":"iwantmoarcookiez"
  },
  "titles":[
    {
      "id":"tt1148204",
      "name":"Orphan",
      "link":"/title/tt1148204",
      "summary":"A husband and wife who recently lost their baby adopt a 9 year-old girl who is not nearly as innocent as she claims to be.",
      "directors":[
        {
          "id":"nm1429471",
          "link":"/name/nm1429471",
          "name":"Jaume Collet-Serra"
        }
      ],
      "stars":[
        {
          "id":"nm0267812",
          "link":"/name/nm0267812",
          "name":"Vera Farmiga"
        },
        {
          "id":"nm0765597",
          "link":"/name/nm0765597",
          "name":"Peter Sarsgaard"
        },
        {
          "id":"nm2265157",
          "link":"/name/nm2265157",
          "name":"Isabelle Fuhrman"
        },
        {
          "id":"nm0001634",
          "link":"/name/nm0001634",
          "name":"CCH Pounder"
        }
      ],
      "poster":"https://m.media-amazon.com/images/M/MV5BMTBjMjY0ODEtZGVkMy00MjUyLTlkMjAtNDBmNzVjOTk0NzQyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY209_CR0,0,140,209_AL_.jpg",
      "year":2009,
      "rating":70,
      "metascore":42,
      "certificate":"R",
      "runtime":{
        "val":123,
        "unit":"min"
      },
      "genres":[
        {
          "link":"/search/title?genres=horror",
          "name":"Horror"
        },
        {
          "link":"/search/title?genres=mystery",
          "name":"Mystery"
        },
        {
          "link":"/search/title?genres=thriller",
          "name":"Thriller"
        }
      ],
      "votes":171984,
      "gross":41596251
    },
    {
      "id":"tt0114814",
      "name":"The Usual Suspects",
      "link":"/title/tt0114814",
      "summary":"A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.",
      "directors":[
        {
          "id":"nm0001741",
          "link":"/name/nm0001741",
          "name":"Bryan Singer"
        }
      ],
      "stars":[
        {
          "id":"nm0000228",
          "link":"/name/nm0000228",
          "name":"Kevin Spacey"
        },
        {
          "id":"nm0000321",
          "link":"/name/nm0000321",
          "name":"Gabriel Byrne"
        },
        {
          "id":"nm0001590",
          "link":"/name/nm0001590",
          "name":"Chazz Palminteri"
        },
        {
          "id":"nm0000286",
          "link":"/name/nm0000286",
          "name":"Stephen Baldwin"
        }
      ],
      "poster":"https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YWE4NGI2ZjVmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY209_CR0,0,140,209_AL_.jpg",
      "year":1995,
      "rating":8.6,
      "metascore":77,
      "certificate":"A",
      "runtime":{
        "val":106,
        "unit":"min"
      },
      "genres":[
        {
          "link":"/search/title?genres=crime",
          "name":"Crime"
        },
        {
          "link":"/search/title?genres=mystery",
          "name":"Mystery"
        },
        {
          "link":"/search/title?genres=thriller",
          "name":"Thriller"
        }
      ],
      "votes":887025,
      "gross":23341568
    }
  ]
}
```

### Get a title (movie, series etc)

```
/GET /title/:titleID
```

#### Response

```json
{
  "baseUrl":"https://www.imdb.com",
  "id":"tt1457767",
  "description":"The Conjuring is a movie starring Patrick Wilson, Vera Farmiga, and Ron Livingston. Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
  "name":"The Conjuring",
  "link":"/title/tt1457767/",
  "img":"https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg",
  "keywords":[
    "ghost",
    "exorcism",
    "possession",
    "paranormal investigation",
    "haunted house"
  ],
  "year":2013,
  "plot":"Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
  "storyline":"In 1971, Carolyn and Roger Perron move their family into a dilapidated Rhode Island farm house and soon strange things start happening around it with escalating nightmarish terror. In desperation, Carolyn contacts the noted paranormal investigators, Ed and Lorraine Warren, to examine the house. What the Warrens discover is a whole area steeped in a satanic haunting that is now targeting the Perron family wherever they go. To stop this evil, the Warrens will have to call upon all their skills and spiritual strength to defeat this spectral menace at its source that threatens to destroy everyone involved.",
  "certificate":"R",
  "rating":7.5,
  "runtime":6720,
  "release":1374105600000,
  "metascore":68,
  "trailer":{
    "link":"/video/imdb/vi3819874585",
    "name":"Trailer #3"
  },
  "genres":[
    {
      "link":"/search/title?genres=horror",
      "name":"Horror"
    },
    {
      "link":"/search/title?genres=mystery",
      "name":"Mystery"
    },
    {
      "link":"/search/title?genres=thriller",
      "name":"Thriller"
    }
  ],
  "directors":[
    {
      "link":"/name/nm1490123/",
      "name":"James Wan"
    }
  ],
  "creators":[
    {
      "link":"/name/nm0370937/",
      "name":"Chad Hayes"
    },
    {
      "link":"/name/nm0370928/",
      "name":"Carey W. Hayes"
    },
    {
      "link":"/company/co0046718/",
      "name":"New Line Cinema"
    },
    {
      "link":"/company/co0179825/",
      "name":"The Safran Company"
    },
    {
      "link":"/company/co0179990/",
      "name":"Evergreen Media Group"
    }
  ]
}
```

### Get a person (not a user)

```
/GET /name/:personID
```

#### Response

```json
{
  "baseUrl":"https://www.imdb.com",
  "id":"nm0933940",
  "description":"Patrick Joseph Wilson was born in Norfolk, Virginia and raised in St. Petersburg, Florida, the son of Mary Kathryn (Burton), a voice teacher and professional singer, and John Franklin Wilson, a news anchor. Wilson has a B.F.A. in Drama from Carnegie-Mellon University. His theater work has produced many nominations and awards. He was nominated for ...",
  "name":"Patrick Wilson",
  "link":"/name/nm0933940",
  "img":"https://m.media-amazon.com/images/M/MV5BMTkzNzcxNzcxMF5BMl5BanBnXkFtZTgwOTM1ODUzMTE@._V1_.jpg",
  "born":110505600000,
  "hometown":"Norfolk, Virginia, USA",
  "jobTitles":[
    "Actor",
    "Soundtrack",
    "Producer"
  ],
  "height":1.83,
  "filmography":[
    {
      "title":"Actor",
      "items":[
        {
          "year":2019,
          "title":"In the Tall Grass",
          "status":"filming"
        },
        {
          "year":2019,
          "title":"Midway",
          "status":"post-production",
          "meta":"Edwin Layton"
        },
        {
          "year":2019,
          "title":"Untitled Annabelle Film",
          "status":"post-production",
          "meta":"Ed Warren"
        },
        {
          "year":2018,
          "title":"Aquaman",
          "meta":"King Orm"
        },
        {
          "year":2018,
          "title":"The Nun",
          "meta":"Ed Warren"
        },
        {
          "year":2018,
          "title":"Nightmare Cinema",
          "meta":"Eric Sr."
        },
        {
          "year":2018,
          "title":"The Commuter",
          "meta":"Alex Murphy"
        },
        {
          "year":2018,
          "title":"Insidious: The Last Key",
          "meta":"Josh Lambert"
        },
        {
          "year":2013,
          "title":"Girls",
          "meta":"Joshua"
        },
        {
          "year":2016,
          "title":"The Founder",
          "meta":"Rollie Smith"
        },
        {
          "year":2016,
          "title":"The Conjuring 2",
          "meta":"Ed Warren"
        },
        {
          "year":2016,
          "title":"The Hollow Point",
          "meta":"Wallace"
        },
        {
          "year":2016,
          "title":"A Kind of Murder",
          "meta":"Walter Stackhouse"
        },
        {
          "year":2016,
          "title":"Batman v Superman: Dawn of Justice",
          "meta":"POTUS (voice)"
        },
        {
          "year":2015,
          "title":"Matters of the Heart",
          "meta":"Will"
        },
        {
          "year":2015,
          "title":"Fargo",
          "meta":"Lou Solverson"
        },
        {
          "year":2015,
          "title":"Bone Tomahawk",
          "meta":"Arthur"
        },
        {
          "year":2015,
          "title":"Home Sweet Hell",
          "meta":"Don Champagne"
        },
        {
          "year":2015,
          "title":"Zipper",
          "meta":"Sam Ellis"
        },
        {
          "year":2014,
          "title":"Let's Kill Ward's Wife",
          "meta":"David"
        },
        {
          "year":2014,
          "title":"Big Stone Gap",
          "meta":"Jack MacChesney"
        },
        {
          "year":2014,
          "title":"Stretch",
          "meta":"Stretch"
        },
        {
          "year":2014,
          "title":"Space Station 76",
          "meta":"Captain Glenn"
        },
        {
          "year":2014,
          "title":"Jack Strong",
          "meta":"Daniel"
        },
        {
          "year":2013,
          "title":"Insidious: Chapter 2",
          "meta":"Josh Lambert"
        },
        {
          "year":2013,
          "title":"The Conjuring",
          "meta":"Ed Warren"
        },
        {
          "year":2012,
          "title":"Prometheus",
          "meta":"Shaw&apos;s Father"
        },
        {
          "year":2011,
          "title":"A Gifted Man",
          "meta":"Dr. Michael Holt"
        },
        {
          "year":2011,
          "title":"Young Adult",
          "meta":"Buddy Slade"
        },
        {
          "year":2011,
          "title":"The Ledge",
          "meta":"Joe Harris"
        },
        {
          "year":2010,
          "title":"Morning Glory",
          "meta":"Adam Bennett"
        },
        {
          "year":2010,
          "title":"Insidious",
          "meta":"Josh Lambert"
        },
        {
          "year":2010,
          "title":"The Switch",
          "meta":"Roland"
        },
        {
          "year":2010,
          "title":"The A-Team",
          "meta":"Lynch"
        },
        {
          "year":2010,
          "title":"Barry Munday",
          "meta":"Barry Munday"
        },
        {
          "year":2009,
          "title":"American Dad!",
          "meta":"Jim"
        },
        {
          "year":2009,
          "title":"Watchmen: The End Is Nigh",
          "meta":"Nite Owl II (voice)"
        },
        {
          "year":2009,
          "title":"Watchmen",
          "meta":"Dan Dreiberg / Nite Owl"
        },
        {
          "year":2008,
          "title":"Passengers",
          "meta":"Eric"
        },
        {
          "year":2008,
          "title":"Lakeview Terrace",
          "meta":"Chris Mattson"
        },
        {
          "year":2008,
          "title":"Life in Flight",
          "meta":"Will"
        },
        {
          "year":2007,
          "title":"Brothers Three: An American Gothic",
          "meta":"Peter"
        },
        {
          "year":2007,
          "title":"Evening",
          "meta":"Harris Arden"
        },
        {
          "year":2007,
          "title":"Purple Violets",
          "meta":"Brian Callahan"
        },
        {
          "year":2007,
          "title":"Vanity Fair: Killers Kill, Dead Men Die",
          "meta":"The Pretty Boy (credit only)"
        },
        {
          "year":2006,
          "title":"Running with Scissors",
          "meta":"Michael Shephard"
        },
        {
          "year":2006,
          "title":"Little Children",
          "meta":"Brad Adamson"
        },
        {
          "year":2005,
          "title":"Hard Candy",
          "meta":"Jeff Kohlver"
        },
        {
          "year":2004,
          "title":"The Phantom of the Opera",
          "meta":"Raoul"
        },
        {
          "year":2004,
          "title":"The Alamo",
          "meta":"William Travis"
        },
        {
          "year":2003,
          "title":"Angels in America",
          "meta":"Joe Pitt"
        },
        {
          "year":2001,
          "title":"My Sister's Wedding",
          "meta":"Quinn"
        }
      ]
    },
    {
      "title":"Soundtrack",
      "items":[
        {
          "year":2016,
          "title":"The Conjuring 2"
        },
        {
          "year":2008,
          "title":"Maman est chez le coiffeur"
        },
        {
          "year":2007,
          "title":"Evening"
        },
        {
          "year":2004,
          "title":"The Phantom of the Opera"
        },
        {
          "year":2002,
          "title":"The 56th Annual Tony Awards"
        },
        {
          "year":2001,
          "title":"The 55th Annual Tony Awards"
        }
      ]
    },
    {
      "title":"Producer",
      "items":[
        {
          "year":null,
          "title":"Caught Stealing",
          "status":"announced"
        },
        {
          "year":2014,
          "title":"Let's Kill Ward's Wife"
        }
      ]
    },
    {
      "title":"Thanks",
      "items":[
        {
          "year":2014,
          "title":"Zero Gravity: Making Space Station 76"
        },
        {
          "year":2009,
          "title":"Welcome to Lakeview Terrace: Behind the Scenes"
        }
      ]
    },
    {
      "title":"Self",
      "items":[
        {
          "year":2018,
          "title":"WGN Morning News",
          "meta":"Himself"
        },
        {
          "year":2018,
          "title":"IMDb on the Scene - Interviews",
          "meta":"Himself - Guest"
        },
        {
          "year":2018,
          "title":"The Late Late Show with James Corden",
          "meta":"Himself"
        },
        {
          "year":2016,
          "title":"Good Morning America",
          "meta":"Himself - Guest / Himself"
        },
        {
          "year":2016,
          "title":"The Late Show with Stephen Colbert",
          "meta":"Himself"
        },
        {
          "year":2018,
          "title":"Conan",
          "meta":"Himself - Guest"
        },
        {
          "year":2018,
          "title":"Every Act of Life",
          "meta":"Himself"
        },
        {
          "year":2018,
          "title":"Ok! TV",
          "meta":"Himself"
        },
        {
          "year":2015,
          "title":"The Chew",
          "meta":"Himself"
        },
        {
          "year":2014,
          "title":"Late Night with Seth Meyers",
          "meta":"Himself"
        },
        {
          "year":2018,
          "title":"Live with Regis and Kathie Lee",
          "meta":"Himself - Guest"
        },
        {
          "year":2017,
          "title":"Harry",
          "meta":"Himself"
        },
        {
          "year":2016,
          "title":"Fargo: Year Two - Lou on Lou"
        },
        {
          "year":2016,
          "title":"Fargo: Year Two - Waffles and Bullet Holes: A Return to Sioux Falls",
          "meta":"Himself"
        },
        {
          "year":2010,
          "title":"Made in Hollywood",
          "meta":"Himself"
        },
        {
          "year":2016,
          "title":"The Talk",
          "meta":"Himself"
        },
        {
          "year":2015,
          "title":"Today",
          "meta":"Himself - Guest / Himself"
        },
        {
          "year":2016,
          "title":"WORD Bookstores: Nick Offerman is Okay with Millenials",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"Film '72",
          "meta":"Himself - Interviewee"
        },
        {
          "year":2016,
          "title":"73rd Golden Globe Awards",
          "meta":"Himself - Nominee"
        },
        {
          "year":2009,
          "title":"Rachael Ray",
          "meta":"Himself"
        },
        {
          "year":2015,
          "title":"Watch What Happens: Live",
          "meta":"Himself"
        },
        {
          "year":2014,
          "title":"Zero Gravity: Making Space Station 76",
          "meta":"Himself - Actor"
        },
        {
          "year":2014,
          "title":"The 68th Annual Tony Awards",
          "meta":"Himself - Presenter"
        },
        {
          "year":2013,
          "title":"Ellen: The Ellen DeGeneres Show",
          "meta":"Himself"
        },
        {
          "year":2013,
          "title":"Vivir de cine",
          "meta":"Himself"
        },
        {
          "year":2008,
          "title":"Up Close with Carrie Keagan",
          "meta":"Himself"
        },
        {
          "year":2013,
          "title":"Chelsea Lately",
          "meta":"Himself - Guest"
        },
        {
          "year":2013,
          "title":"Reel Junkie",
          "meta":"Himself"
        },
        {
          "year":2013,
          "title":"The Hollywood Fast Lane",
          "meta":"Himself - Interviewee"
        },
        {
          "year":2012,
          "title":"CollegeHumor Originals",
          "meta":"Himself"
        },
        {
          "year":2012,
          "title":"Misery Loves Company: The Making of Young Adult",
          "meta":"Himself - &apos;Buddy Slade&apos;"
        },
        {
          "year":2011,
          "title":"The 65th Annual Tony Awards",
          "meta":"Himself - Presenter"
        },
        {
          "year":2011,
          "title":"Kinotipp",
          "meta":"Himself"
        },
        {
          "year":2011,
          "title":"Daybreak",
          "meta":"Himself"
        },
        {
          "year":2010,
          "title":"The A-Team: Plan of Attack",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"Welcome to Lakeview Terrace: Behind the Scenes",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"Watchmen: Story Within a Story, The Books of Watchmen",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"Real Super Heroes: Real Vigilantes",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"The Manifest and Making of 'Passengers'",
          "meta":"Himself"
        },
        {
          "year":2009,
          "title":"Making of..."
        },
        {
          "year":2009,
          "title":"Watchmen: A G4 Special"
        },
        {
          "year":2009,
          "title":"Xposé",
          "meta":"Himself"
        },
        {
          "year":2008,
          "title":"Entertainment Tonight",
          "meta":"Himself"
        },
        {
          "year":2007,
          "title":"The 61st Annual Tony Awards",
          "meta":"Himself - Presenter"
        },
        {
          "year":2006,
          "title":"The Megan Mullally Show",
          "meta":"Himself"
        },
        {
          "year":2006,
          "title":"Controversial Confection: The Soul of 'Hard Candy'",
          "meta":"Himself"
        },
        {
          "year":2006,
          "title":"Creating 'Hard Candy'",
          "meta":"Himself"
        },
        {
          "year":2005,
          "title":"The Making of 'The Phantom of the Opera'",
          "meta":"Himself (uncredited)"
        },
        {
          "year":2005,
          "title":"The Tony Danza Show",
          "meta":"Himself"
        },
        {
          "year":2005,
          "title":"Late Night with Conan O'Brien",
          "meta":"Himself"
        },
        {
          "year":2005,
          "title":"Dennis Miller",
          "meta":"Himself"
        },
        {
          "year":2004,
          "title":"Return of the Legend: The Making of 'The Alamo'",
          "meta":"Himself"
        },
        {
          "year":2003,
          "title":"Cartaz Cultural",
          "meta":"Himself (2008)"
        },
        {
          "year":2002,
          "title":"The 56th Annual Tony Awards",
          "meta":"Himself - Nominee, Presenter &amp; Performer"
        },
        {
          "year":2001,
          "title":"The Kennedy Center Honors: A Celebration of the Performing Arts",
          "meta":"Himself"
        },
        {
          "year":2001,
          "title":"The 55th Annual Tony Awards",
          "meta":"Himself - Nominee &amp; Performer"
        }
      ]
    },
    {
      "title":"Archive footage",
      "items":[
        {
          "year":2017,
          "title":"Barbra: The Music... The Mem'ries... The Magic!",
          "meta":"Himself"
        },
        {
          "year":2007,
          "title":"The 79th Annual Academy Awards",
          "meta":"Brad Adamson (uncredited)"
        },
        {
          "year":2006,
          "title":"Canada A.M.",
          "meta":"Himself"
        },
        {
          "year":2006,
          "title":"Silenci?",
          "meta":"Jeff Kohlver"
        }
      ]
    }
  ]
}
```

## FAQ

Here's a list of questions you may have:

### Are you scraping the IMDb website for results?

Yes. Because IMDb doesn't have an official API, yet.

### What if the IMDb website HTML changes?

The package is Open Source. I'll try my best to keep it up to date for as long as possible. If you notice the package is not working, please feel free to open an issue.

### Can I contribute?

Of course! As the package description mentions, I'd like this to be the most complete IMDb API with as many data points available. A lot of the packages out there don't provide extensive information on Movies, TV Shows etc. This package aims to change that and I'd really appreciate your help. Code reviews are welcome too!
