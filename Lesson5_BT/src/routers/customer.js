import { Router } from "express";
import { getAllCustomers, getCustomerId } from "../controllers/customer.js";

const customerRouter = Router();

customerRouter.get("", getAllCustomers);

customerRouter.get("/:id", getCustomerId);

export {customerRouter}