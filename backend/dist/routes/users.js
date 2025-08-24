// import express from 'express';
// import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';
// import { authenticate, authorize } from '../middleware/auth';
// const router = express.Router();
// router.get('/', authenticate, authorize(['ADMIN', 'COORDENADOR']), getUsers);
// router.get('/:id', authenticate, getUserById);
// router.put('/:id', authenticate, updateUser);
// router.delete('/:id', authenticate, authorize(['ADMIN']), deleteUser);
// export default router;
import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser, getProfile, updateProfile, } from "../controllers/users";
import { authenticate, authorize } from "../middleware/auth";
const router = express.Router();
// Public route (if needed for registration)
// router.post("/", createUser);
// Protected routes
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
// Admin only routes
router.get("/", authenticate, authorize(["ADMIN"]), getUsers);
router.get("/:id", authenticate, authorize(["ADMIN"]), getUserById);
router.post("/", authenticate, authorize(["ADMIN"]), createUser);
router.put("/:id", authenticate, authorize(["ADMIN"]), updateUser);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteUser);
export default router;
//# sourceMappingURL=users.js.map