import profileReduser from "./Profile-reducer";
import dialogsReduser from "./Dialogs-reduser";
import sidebarReduser from "./Sidebar-Reduser";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, massage: 'Hi how are you?', likeCount: 23},
                {id: 2, massage: 'I love REACT', likeCount: 53},
                {id: 2, massage: 'I love REACT', likeCount: 53}
            ],
            newPostText: ''
        },
        massagesPage: {
            dialogs: [
                {
                    id: 1,
                    name: 'Dima',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC4jRg1btnvqAdcADoMgIw6RyQIXMOpZw-kg&usqp=CAU'
                },
                {
                    id: 2,
                    name: 'Valera',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfNHQ78zty5ZpAoBPBARyRvoPOhIgXXch0yg&usqp=CAU'
                },
                {
                    id: 3,
                    name: 'Vika',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcReKSYqrPw2eL826Nc3rYdTgl5-_pb7UdUwBw&usqp=CAU'
                },
                {
                    id: 4,
                    name: 'Nata',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5NEaXwrzHIqv3GXVWIuRKwtLXk6IRlW2AyA&usqp=CAU'
                }
            ],
            massages: [
                {id: 1, massage: 'Hi'},
                {id: 2, massage: 'How are you'},
                {id: 3, massage: 'yooyoyoyoy'},
                {id: 4, massage: 'Nata, I Love you'}
            ],
            newMassageBody: ''
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'cristina',
                    src: 'data:image/jpeg;base64,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'
                },
                {
                    id: 2,
                    name: 'Vika',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC4jRg1btnvqAdcADoMgIw6RyQIXMOpZw-kg&usqp=CAU'
                },
                {
                    id: 3,
                    name: 'Alena',
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_iEXq5Tq8suPbnZd51iuXk2m7Q64Zide5WA&usqp=CAU'
                }
            ]
        }
    },
    _callSubscriber() {
        console.log('changed state')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;    //observer - наблюдатель - это патерн
    },

    dispatch(action) {  //action это объект {type: 'ADD-POST'}
        this._state.profilePage = profileReduser(this._state.profilePage, action);
        this._state.massagesPage = dialogsReduser(this._state.massagesPage, action);
        this._state.sidebar = sidebarReduser(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}

export default store;


