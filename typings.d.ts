export interface Tweet extends TweetBody {
  _id:string,
  _createdAt:string,
  _updatedAt:string,
  _rev:string,
  _type:'tweet',
  blockTweet:boolean,
  comments:[Comment]
}

export type TweetBody = {
  text:string,
  username:string,
  profileImg:string,
  image:string
  likes:string[]
  privacy:boolean
}

export type UserBody = {
  username:string,
  email:string,
  profileImg:string,
  // tweets:Tweet[],
  // savedTweets:Tweet[],
  // likeTweets:Tweet[],
}


export type CommentBody = {
  comment:string,
  tweetId:string,
  username:string,
  profileImg:string
}

export interface Comment extends CommentBody {
  _createdAt:string ,
  _id:string,
  _rev:string,
  _type:string, 
  _updatedAt:string,
  tweet:{
    _ref:string,
    _type:'reference'
  } 
}

export interface User extends UserBody {
  _createdAt:string,
  _id:string,
  _type:'user',
  _rev:string,
  _updatedAt:string,
  blockUser:boolean,
  tweets:[{
    _ref:string,
    _type:'reference'
  }],
  savedTweets:[{
    _ref:string,
    _type:'reference'
  }],
  likedTweets:[{
    _ref:string,
    _type:'reference'
  }]
}
export type passingQuery ={
  id:string,
  new_user:string,
}


export interface ReduxUserValue {
  username: string
  email: string
  profileImg: string
  _id: string
}

export interface ReduxUser {
  user: ReduxUserValue
}

export interface StoreUser{
  user:ReduxUser
}