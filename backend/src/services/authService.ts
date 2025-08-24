import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { FirebaseService } from "./firebaseService";
import { User } from "../types/firebase";

export class AuthService {
  static async register(userData: {
    email: string;
    password: string;
    name: string;
    role: User["role"];
    matriculation?: string;
    course?: string;
  }): Promise<{ user: User; token: string }> {
    try {
      // Criar usuário no Firebase Auth
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );

      // Criar usuário no Firestore
      const userId = await FirebaseService.createUser({
        email: userData.email,
        name: userData.name,
        role: userData.role,
        matriculation: userData.matriculation,
        course: userData.course,
      });

      // Obter token JWT
      const token = await userCredential.user.getIdToken();

      // Buscar dados completos do usuário
      const user = await FirebaseService.getUserById(userId);
      if (!user) throw new Error("Usuário não encontrado após criação");

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message || "Erro ao registrar usuário");
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    try {
      // Fazer login no Firebase Auth
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Obter token JWT
      const token = await userCredential.user.getIdToken();

      // Buscar dados do usuário no Firestore
      const user = await FirebaseService.getUserByEmail(email);
      if (!user) throw new Error("Usuário não encontrado no Firestore");

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message || "Erro ao fazer login");
    }
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao fazer logout");
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) return null;

      return await FirebaseService.getUserByEmail(currentUser.email);
    } catch (error) {
      return null;
    }
  }
}
