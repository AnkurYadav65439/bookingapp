import express from 'express';
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/:hid", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hid", verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router