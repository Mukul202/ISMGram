export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in Tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      description:'ADMIN Controls: Toggle if tweet is deemed inappropriate',
      type: 'boolean',
    },
    {
      name: 'username',
      title: 'User Name/ Anonymous Name',
      type: 'string',
    },
    {
      name:'profileImg',
      title:'Profile Image',
      type:'string',
    },
    {
      name:'image',
      title:'Tweet image',
      type:'string',
    },
    {
      name:'likes',
      title:'Likes',
      type:'array',
      of:[{type:'string'}]
    },
    {
      name:'privacy',
      title:'Privacy',
      type:'boolean',
      description:'If selected post will be visible only to ISMites!!!'
    }
  ],
}
