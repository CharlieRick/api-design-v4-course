import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);
  res.json({ data: { token } });
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    res.status(401);
    res.json({ message: "Invalid username or password" });
    return;
  }

  const token = createJWT(user);
  res.json({ data: { token } });
};
