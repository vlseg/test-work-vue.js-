export * from './store';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        infoTable: [
            {
                "id": 185,
                "time": "2019-08-19T09:23:51.852060+03:00",
                "status": "Прийнята",
                "telefone": "380960547903",
                "nameMaster": 'Фамилия Мастера 1, Имя Мастера 1',
                "nameMechanic": 'Имя механика 1, Фамилия механика 1',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 186,
                "time": "2019-08-19T10:42:32.852060+03:00",
                "status": "Прийнята",
                "telefone": "380960547903",
                "nameMaster": 'Фамилия Мастера 2, Имя Мастера 2',
                "nameMechanic": 'Имя механика 2, Фамилия механика 2',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 187,
                "time": "2019-08-19T10:43:39.852060+03:00",
                "status": "Прийнята",
                "telefone": "380960547903",
                "nameMaster": 'Фамилия Мастера 3, Имя Мастера 3',
                "nameMechanic": 'Имя механика 3, Фамилия механика 3',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 188,
                "time": "2019-08-19T11:30:09.852060+03:00",
                "status": "Прийнята",
                "telefone": "380960547903",
                "nameMaster": 'Фамилия Мастера 4, Имя Мастера 4',
                "nameMechanic": 'Имя механика 4, Фамилия механика 4',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 189,
                "time": "2019-08-19T11:35:56.852060+03:00",
                "status": "Прийнята",
                "telefone": "0",
                "nameMaster": 'Фамилия Мастера 5, Имя Мастера 5',
                "nameMechanic": 'Имя механика 5, Фамилия механика 5',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 190,
                "time": "2019-08-19T11:38:46.852060+03:00",
                "status": "Прийнята",
                "telefone": "380960547903",
                "nameMaster": 'Фамилия Мастера 6, Имя Мастера 6',
                "nameMechanic": 'Имя механика 6, Фамилия механика 6',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 191,
                "time": "2019-08-19T17:59:21.852060+03:00",
                "status": "Прийнята",
                "telefone": "(474) 744-4744",
                "nameMaster": 'Фамилия Мастера 7, Имя Мастера 7',
                "nameMechanic": 'Имя механика 7, Фамилия механика 7',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
            {
                "id": 192,
                "time": "2019-08-19T18:04:33.852060+03:00",
                "status": "Прийнята",
                "telefone": "(474) 744-4744",
                "nameMaster": 'Фамилия Мастера 8, Имя Мастера 8',
                "nameMechanic": 'Имя механика 8, Фамилия механика 8',
                "mark": "AC",
                "model": "428 Кабриолет",
                "numerAuto": "AA777BP",
                "service": "Автомагнiтола - замiна",
                "comment": "test"
            },
        ],
        filter: ['RU', 1, true]
    },
    getters: {
        infoTable(state){
            return state.infoTable
        },
        filter(state){
            return state.filter
        }
    },
    mutations: {
        cleararr(state) {
            state.infowork = []
        },
        creaall(state) {
            state.infowork = [...state.info]
        },
        creaallerror(state) {
            state.infowork = [...state.info_zap]
            state.info = [...state.info_zap]
        },
        copyarr(state, payload) {
            state.infowork = payload
        },
        creacou(state, payload) {
            state.filter[0] = String(payload)
        },
        creatype(state, payload) {
            state.filter[1] = payload
        },
        creaalive(state, payload) {
            state.filter[2] = payload
        },
        loadproxy(state, payload) {
            state.info = payload
        },
    },
    actions: {
        creacou (store, payload) {
            store.commit('creacou', payload)
        },
        creatype (store, payload) {
            store.commit('creatype', payload)
        },
        creaalive (store, payload) {
            store.commit('creaalive', payload)
        },
        copyarr (store, payload) {
            store.commit('copyarr', payload)
        },
        cleararr (store) {
            store.commit('cleararr')
        },
        creaallerror (store) {
            store.commit('creaallerror')
        },
        creaall (store) {
            store.commit('creaall')
        },
        loadproxy (store, payload) {
            store.commit('loadproxy', payload)
        },
    }
})

