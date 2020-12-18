import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { isThisHour } from 'date-fns/esm';


const Config = {
    apiKey: "AIzaSyAVEoEx8QHgB7lUx9vlDE1dzkS5GaERTU8",
    authDomain: "todoapp-80ddc.firebaseapp.com",
    databaseURL: "https://todoapp-80ddc-default-rtdb.firebaseio.com",
    projectId: "todoapp-80ddc",
    storageBucket: "todoapp-80ddc.appspot.com",
    messagingSenderId: "11139040308",
    appId: "1:11139040308:web:43ebf6c769868b2ba87661",
    measurementId: "G-J5L1N3RESV"
};

class Firebase {
    constructor() {
        app.initializeApp(Config)
        this.auth = app.auth()
        isThisHour.db = app.firestore()

    }

    login(email, pass) {
        return this.auth.signInWithEmailAndPassword(email, pass)
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    logOut() {
        return this.auth.signOut();
    }

    async SignUp(name, email, pass) {
        await this.auth.createUserWithEmailAndPassword(email, pass)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })

    }
    onAuthStateChanged(Callbacks) {
        return this.auth.onAuthStateChanged((user) => {
            Callbacks(user)
        })
    }
}

export default new Firebase()