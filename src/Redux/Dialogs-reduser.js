const SEND_MASSAGE = 'it-social/massagesPage/SEND-MASSAGE';

let initialState = {
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
    ]
};

const dialogsReduser = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MASSAGE:
            let body = action.dialogsMassege;
            return {
                ...state,
                massages: [...state.massages, {id: 5, massage: body}]
            }
        default:
            return state;
    }
}

export const sendMassageCreator = (dialogsMassege) => {
    return {type: SEND_MASSAGE, dialogsMassege};
}

export default dialogsReduser;