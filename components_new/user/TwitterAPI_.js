// Get Tweet objects by ID, using bearer token authentication
// https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/quick-start

const needle = require('needle');

// // // // // // // // // // Functional Component // // // // // // // // // // 

const TwitterFeed_ = () => {

  const token = 'AAAAAAAAAAAAAAAAAAAAACmDegEAAAAAw2mQCCtdRkAWN6GSlGoXR%2BFbxxY%3DJlNZuKBqmSPsxS2ZAtaijDrEVZNY6BmA3z4Dr9S9YA2WHMvStV';


const getUserID = async (userName_) => {
  const endpoint0_ = `https://api.twitter.com/2/users/by/username/${userName_}`;

  const res0 = await needle('get', endpoint0_, null, {
    headers: {
      "User-Agent": "v2TweetLookupJS",
      "authorization": `Bearer ${token}`
    }
  })

  const resID = res0.body.data.id

  const endpoint1_ = "https://api.twitter.com/2/users/" + resID + "/tweets";

  const res1 = await needle('get', endpoint1_, {
    'tweet.fields': 'author_id,attachments',
    'media.fields': 'url',
  }, {
    headers: {
      "User-Agent": "v2TweetLookupJS",
      "authorization": `Bearer ${token}`
    }
  })

  return { data_: res1.body.data, id_: resID }

}

const exportData_ = (userName_) => getUserID(userName_).then((e) => {
  const obj_ = []

  e.data_.forEach(element => {

    const links = []
    const text = element.text.replace('\n', ' ')
    const tags = []
    const mentions = []

    element.text.replace('\n', ' ').split(' ').forEach((outcome) => {
      if (outcome.includes('https://t.co/') && outcome.length >= 23) {
        links.push(outcome.replace('\n', ''))
      } else if (outcome.includes('#')) {
        tags.push(outcome.replace('\n', ''))
      } else if (outcome.includes('@') && outcome.length > 2) {
        mentions.push(outcome.replace('\n', ''))
      }
    })
    obj_.push({ text: text, links: links, tags: tags, mentions: mentions })
  });

  return console.log(obj_)
})

  return (
    <div className={`w-full h-full bg-red flex flex-col justify-center items-center`}>
      {
        exportData_('LwaziNF').text
      }
    </div>
  );
}

export default TwitterFeed_;