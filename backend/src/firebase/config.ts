import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import admin from "firebase-admin";

// Configuração do Firebase Client (para frontend)
const firebaseConfig = {
  apiKey: "AIzaSyD2a7Kl15tgsiV-jIbBOvLDewn3ZvtIzGE",
  authDomain: "sistema-tcc-management.firebaseapp.com",
  projectId: "sistema-tcc-management",
  storageBucket: "sistema-tcc-management.firebasestorage.app",
  messagingSenderId: "655597612582",
  appId: "1:655597612582:web:b5592b0dce35f14f4b80e7",
};

// Inicializar Firebase Client
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configuração do Firebase Admin (para backend)
let adminInitialized = false;

export const initializeAdmin = () => {
  if (!adminInitialized) {
    const serviceAccount = require("../../serviceAccountKey.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
    });

    adminInitialized = true;
  }
};

export const getAdminAuth = () => {
  if (!adminInitialized) initializeAdmin();
  return admin.auth();
};

// Adicione este método
export const deleteUserFromAuth = async (uid: string): Promise<void> => {
  const adminAuth = getAdminAuth();
  await adminAuth.deleteUser(uid);
};

export const getAdminDb = () => {
  if (!adminInitialized) initializeAdmin();
  return admin.firestore();
};
