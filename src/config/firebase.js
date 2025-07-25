import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, query, Query,  where } from "firebase/firestore";

import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, setDoc} from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDftRw_qAh1AZ6zOi5ck8-tVOLXu84VdbQ",
  authDomain: "chatapp-c0ddd.firebaseapp.com",
  projectId: "chatapp-c0ddd",
  storageBucket: "chatapp-c0ddd.firebasestorage.app",
  messagingSenderId: "908704953696",
  appId: "1:908704953696:web:7ed02eacbd318524ed9a05"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
const db=getFirestore(app);

const signup =async(username,email,password)=>{
   try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await setDoc(doc(db,"users",user.uid),{
        id:user.uid,
        username:username.toLowerCase(),
        email,
        name:"",
        avatar:"",
        bio:"Hey,There i am using chat app",
        lastSeen:Date.now()

    })
    await setDoc(doc(db,"chats",user.uid),{
        chatsData:[]
    })
   }catch(error){
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));

   }
}
const login =async (email,password) => {
    try{
        await signInWithEmailAndPassword(auth,email,password);

    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = async () => {
    
    try{
        await signOut(auth)
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const resetPass = async (email) =>{
    if(!email){
        toast.error("Enter your email");
        return null;
    }
    try{
        const userRef = collection(db,'users');
        const q = query(userRef,where("email","==",email));
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email sent")
        }else{
            toast.error("Email doesn't exists");
        }
        

    }catch(error){
        console.error(error);
        toast.error(error.message);

    }
}
export {signup,login,logout,auth,db,resetPass}