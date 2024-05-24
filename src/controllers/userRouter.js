import { Router } from "express";

const user = Router({ caseSensitive: true });

user.get("/", (req, res) => {
  res.json("hello");
});

export { user };
