import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('PUT request to update the jateDB');
  const contentDb = await openDB('jate', 1);  // connect to DB and version we want to use
  const tx = contentDb.transaction('jate', 'readwrite');  // make new transaction...need to specify the DB we are posting to and the data privileges. 
  const store = tx.objectStore('jate');  // open the object store
  const request = store.add({ id:id, content: content });// use the .add() method to pass in content
  const result = await request;// confirm the data was fetched
  console.log('🚀 - data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Getting data from the jateDB');
  const jateDb = await openDB('jate', 1);// connect to DB and version we want to use
  const tx = jateDb.transaction('jate', 'readwrite');// make new transaction...need to specify the DB we are posting to and the data privileges. 
  const objStore = tx.objectStore('jate');  // open the object store
  const req = objStore.getAll()// use the .getAll() method to grab all the content in the DB
  const result = await req;// confirm the data was fetched
  console.log('data saved to the jateDB', result);
}

initdb();
