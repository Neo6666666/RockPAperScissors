import { InjectionKey } from 'vue'
import { Store } from 'vuex'
import Api from '@/services/api'

interface IUser {
    username: string
    status: string
    id: string
}

export const key: InjectionKey<Store<IUser>> = Symbol()
const localUser: any = JSON.parse(localStorage.getItem('user') || 'false');

console.log(localUser);

export default {
    state: (): { user: IUser, users: IUser[] } => ({
        user: {
            username: "",
            status: "",
            id: ""
        },
        users: [],
    }),
    mutations: {
        set(state: any, payload: IUser) {
            if (!localUser || state.user.id) {
                localStorage.setItem('user', JSON.stringify(payload));
            }

            state.user = payload;
        },
        setUsers(state: any, payload: any) {
            console.log('22222222', payload);
            

            state.users = payload;
        }
    },
    getters: {
        loggedIn(state: any) {
            const user: IUser = localUser || state.user

            return user.id;
        }
    },
    actions: {
        async login({ commit }: any, body: any) {
            const { data } = await Api.createRequest('login', body);

            commit('set', data)
        },
        async register({ commit }: any, body: any) {
            const { data } = await Api.createRequest('register', body);

            commit('set', data)
        }
    }
}