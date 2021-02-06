import profileReduser, { addPostActionCreater } from '../Profile-reducer';

test('length posts should be deremented', () => {
    //1. Test data
    let action = addPostActionCreater('it-kamasutra');
    let state = {
        posts: [
            {id: 1, massage: 'Hi how are you?', likeCount: 23},
            {id: 2, massage: 'I love REACT', likeCount: 53},
            {id: 2, massage: 'I love REACT', likeCount: 53}
        ],
        profile: null,
        avatarIsFetching: true,
        profileStatus: ''
    };
    //2.Action
    let newState = profileReduser(state, action)
    //3. Expectation
    expect(newState.posts.length).toBe(4);  
    expect(newState.posts[3].massage).toBe('it-kamasutra');
  });

