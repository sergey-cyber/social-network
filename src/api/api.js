import * as axios from "axios";

const instance = axios.create({ 
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'cd27ce18-89dc-42b3-ba44-10bd8b8a6d99'
    }    
});

export const usersAPI = {
    setUsers (currentPage = 1, pageSize = 100) {  //присвоение 1 и 10 к параметрам функции - это параметры по умолчанию если в функцию ниего не прийдет
        return instance.get(`users?page=${currentPage}&count=${pageSize}`) //Базовый урл сам добавляется, так как сидит в инстансе
        .then(response => {
                return response.data;   //после ответа сервака, функция возвращает дата, которая сидит в респонсе(урок 63)
            });
    }, 
    setUnfollow (userId) {
        return instance.delete(`follow/${userId}`);    
    },
    setFollow (userId) {
        return instance.post(`follow/${userId}`);
    },
    getProfile (userId) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getProfile(userId);
    }     
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get('profile/'+userId);
    },
    getStatus(userId) {
        return instance.get('profile/status/'+userId);
    },
    updateStatus(status) {
        return instance.put('profile/status/', {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();    //Юзаем это при отпраке фоток на сервак 
        formData.append('image', photoFile);
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type':'multipart/form-data' 
            }
        });
    }     
}

export const authAPI = {
    me () {
        return instance.get('auth/me');
    },
    authPhoto () {
        return instance.get('users?page=1&count=100');
    },
    login (email, password, rememberMe = false) {   //Lesson 78
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logout () { //Lesson 78
        return instance.delete('auth/login');
    }
}

