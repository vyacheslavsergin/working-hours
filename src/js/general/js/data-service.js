import fb from 'firebase/app';
import 'firebase/database';

const axios = require('axios');

class Ad {
    constructor(firstName, type, userNumber, id = null) {
        this.firstName = firstName;
        this.type = type;
        this.userNumber = userNumber;
        this.id = id;
    }
}

class DataService {
    constructor() {
        this.data = null;

        this.init();
    }

    init() {
        // http://worldtimeapi.org/api/timezone/Europe/Moscow.txt
        // http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg
        // http://worldtimeapi.org/api/timezone/Europe/London.txt
        const data = axios.get('http://worldtimeapi.org/api/timezone/Asia/Yekaterinburg')
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        // console.log('data', data);

        const config = {
            apiKey: 'AIzaSyBtvzZlxD_TLwsoE2kMZUMRPnFgz20RyjA',
            authDomain: 'javascript-app-8804a.firebaseapp.com',
            databaseURL: 'https://javascript-app-8804a.firebaseio.com',
            projectId: 'javascript-app-8804a',
            storageBucket: 'javascript-app-8804a.appspot.com',
            messagingSenderId: '916390243341',
            appId: '1:916390243341:web:d93322ea53d50bae'
        };

        fb.initializeApp(config);
    }

    async fetchAds() {

        const resultAds = [];

        try {
            const fbVal = await fb.database()
                .ref('users')
                .once('value');

            const ads = fbVal.val();

            if (!ads) {
                return resultAds;
            }

            Object.keys(ads)
                .forEach(key => {
                    const ad = ads[key];

                    resultAds.push(
                        new Ad(ad.firstName, ad.type, ad.userNumber, key)
                    );
                });

            this.data = resultAds;

            // console.log('data', this.data);

            return this.data;
        } catch (error) {
            throw error;
        }
    }

    async createAd(payload) {
        const newAd = new Ad(
            payload.firstName,
            payload.type,
            payload.userNumber
        );

        try {
            const ad = await fb.database()
                .ref('users')
                .push(newAd);
        } catch (error) {
            throw error;
        }
    }

    async deleteAd(id) {
        try {
            const ad = await fb.database()
                .ref('users')
                .child(id)
                .remove();
        } catch (error) {
            throw error;
        }
    }

    async updateAd(id, payload) {
        try {
            const ad = await fb.database()
                .ref('users')
                .child(id)
                .update(payload);
        } catch (error) {
            throw error;
        }
    }

    // fetchAds = () => {
    //   fb.database()
    //     .ref('users')
    //     .once('value')
    //     .then((fbVal) => {
    //       const ads = fbVal.val();
    //       // console.log('ads', ads);
    //
    //       const resultAds = [];
    //
    //       Object.keys(ads).forEach(key => {
    //         const ad = ads[key];
    //
    //         resultAds.push(
    //           new Ad(ad.firstName, ad.type, ad.userNumber, key)
    //         )
    //       });
    //
    //       console.log('resultAds', resultAds);
    //
    //       this.data = resultAds;
    //
    //       return this.data;
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
}

const instance = new DataService();
export default instance;
