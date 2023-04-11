export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username/ Anonymous Name',
      type: 'string',
    },
    {
      name:'blockUser',
      title:'Block User',
      type:'boolean',
    },
    {
      name: 'realname',
      title: 'Real Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      // description:'ADMIN Controls: Toggle if tweet is deemed inappropriate',
      type: 'email',
    },
    {
      name:'profileImg',
      title:'Profile Image',
      type:'string',
    },
    {
      name:'tweets',
      title:'Tweets Created',
      description:'Tweets Created by the User...',
      type:'array',
      of:[
        {
          type:'reference',
          to:{
            type:'tweet'
          }
        }
      ]
    },
    {
      name:'savedTweets',
      title:'Tweets Saved',
      description:'Tweets Saved by the User...',
      type:'array',
      of:[
        {
          type:'reference',
          to:{
            type:'tweet'
          }
        }
      ]
    },
    {
      name:'likedTweets',
      title:'Tweets Liked',
      description:'Tweets Liked by the User...',
      type:'array',
      of:[
        {
          type:'reference',
          to:{
            type:'tweet'
          }
        }
      ]
    },
  ],
}
