import { db } from '../../firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

// new chat
export const newChat = async (chatData) => {
  return await addDoc(collection(db, 'chats'), chatData).then(
    (docRef) => docRef
  );
};

// new message
export const newMessage = async (messageData) => {
  const chatRef = doc(collection(db, 'chats'), item.id);
  return await getDoc(chatRef).then((docSnapshot) => {
    const chatData = docSnapshot.data();
    const existingMessages = chatData.messages || [];

    // Prepend the new message at index 0
    const updatedMessages = [messageData, ...existingMessages];

    // Update the chat document with the modified messages array
    return updateDoc(chatRef, { messages: updatedMessages });
  });
};
