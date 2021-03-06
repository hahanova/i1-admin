import firebase from 'firebase';

class Database {
  constructor() {
    this.config = {
      apiKey: 'AIzaSyAd-VIzWE07W2VNQF7pNDnI7yg1yrR45cQ',
      authDomain: 'foodsurgeoni1.firebaseapp.com',
      databaseURL: 'https://foodsurgeoni1.firebaseio.com',
      projectId: 'foodsurgeoni1',
      storageBucket: 'foodsurgeoni1.appspot.com',
      messagingSenderId: '961964902262',
      appId: '1:961964902262:web:5fdefd442f617b72',
    };

    firebase.initializeApp(this.config);
    this.database = firebase.database();
  }

  add(data) {
    const {type, ...recipe } = data;

    return this.database.ref( `dishes/${type}/`).push(recipe).key;
  }

  get(tableName) {
    const self = this;

    return new Promise(function(resolve) {
      self.database.ref(tableName + '/').on('value', function(snapshot) {
        resolve(snapshot.val());
      });
    })
  }

  update(data) {
    const {
      ingredients,
      time,
      description,
      src,
      name,
      difficulty,
      id,
      type,
      servingsNumber,
    } = data;

    firebase.database().ref(`dishes/${type}/` + id).set({
      ingredients,
      time,
      description,
      src,
      name,
      difficulty,
      type,
      servingsNumber,
    });
  }

  delete(type, id) {
    this.database.ref(`dishes/${type}/`).child(id).remove();
  }
};

export const db = new Database();

export const dishes = db.get('dishes/').then((dishes) => {
  return dishes;
});

export const users = db.get('users/').then((users) => {
  return users;
});

window.db = db;
window.firebase = firebase;