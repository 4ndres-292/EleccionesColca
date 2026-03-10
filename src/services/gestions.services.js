import { getCurrentGestion, createGestion } from "../models/gestions.model.js";

export const ensureCurrentGestion = async () => {

   const now = new Date();

   const month = now.getMonth() + 1;
   const year = now.getFullYear();

   const current = await getCurrentGestion();

   if (!current || current.month !== month || current.year !== year) {

      return await createGestion(month, year);

   }

   return current;
};