import { firestore } from './firebase';

const searchName = async (searchQuery) => {
  try {
    const namesRef = firestore.collection('names');
    
    // Use Firestore query to search for names
    const querySnapshot = await namesRef
      .where('name', '>=', searchQuery)
      .where('name', '<=', searchQuery + '\uf8ff')
      .get();
    
    // Extract the data from the query results
    const names = querySnapshot.docs.map((doc) => doc.data().name);

    return names;
  } catch (error) {
    console.error('Error searching for names:', error);
    throw error;
  }
};

export default searchName;