import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { User, Proposal, COLLECTIONS } from "../types/firebase";

export class FirebaseService {
  // Users
  static async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const userRef = await addDoc(collection(db, COLLECTIONS.USERS), {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return userRef.id;
  }

  static async getUserById(userId: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
    if (!userDoc.exists()) return null;

    return {
      id: userDoc.id,
      ...userDoc.data(),
      createdAt: userDoc.data().createdAt.toDate(),
      updatedAt: userDoc.data().updatedAt.toDate(),
    } as User;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data(),
      createdAt: userDoc.data().createdAt.toDate(),
      updatedAt: userDoc.data().updatedAt.toDate(),
    } as User;
  }

  static async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as User[];
  }

  static async updateUser(
    userId: string,
    userData: Partial<User>
  ): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
      ...userData,
      updatedAt: Timestamp.now(),
    });
  }

  static async deleteUser(userId: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.USERS, userId));
  }

  // Proposals
  static async createProposal(
    proposalData: Omit<Proposal, "id" | "createdAt" | "updatedAt">
  ): Promise<string> {
    const proposalRef = await addDoc(collection(db, COLLECTIONS.PROPOSALS), {
      ...proposalData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return proposalRef.id;
  }

  static async getProposalById(proposalId: string): Promise<Proposal | null> {
    const proposalDoc = await getDoc(
      doc(db, COLLECTIONS.PROPOSALS, proposalId)
    );
    if (!proposalDoc.exists()) return null;

    return {
      id: proposalDoc.id,
      ...proposalDoc.data(),
      createdAt: proposalDoc.data().createdAt.toDate(),
      updatedAt: proposalDoc.data().updatedAt.toDate(),
      deadline: proposalDoc.data().deadline?.toDate(),
    } as Proposal;
  }

  static async getProposals(filters?: {
    status?: string;
    studentId?: string;
    advisor?: string;
  }): Promise<Proposal[]> {
    let q = query(collection(db, COLLECTIONS.PROPOSALS));

    if (filters?.status) {
      q = query(q, where("status", "==", filters.status));
    }

    if (filters?.studentId) {
      q = query(q, where("studentId", "==", filters.studentId));
    }

    if (filters?.advisor) {
      q = query(q, where("advisor", "==", filters.advisor));
    }

    q = query(q, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      deadline: doc.data().deadline?.toDate(),
    })) as Proposal[];
  }

  static async updateProposal(
    proposalId: string,
    proposalData: Partial<Proposal>
  ): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.PROPOSALS, proposalId), {
      ...proposalData,
      updatedAt: Timestamp.now(),
    });
  }

  static async deleteProposal(proposalId: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.PROPOSALS, proposalId));
  }

  // Additional helper methods
  static async getUserProposalsCount(userId: string): Promise<number> {
    const proposals = await this.getProposals({ studentId: userId });
    return proposals.length;
  }

  static async searchUsers(searchTerm: string): Promise<User[]> {
    const allUsers = await this.getAllUsers();
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.matriculation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.course?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  static async getUsersByRole(role: string): Promise<User[]> {
    const q = query(
      collection(db, COLLECTIONS.USERS),
      where("role", "==", role)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as User[];
  }
}
