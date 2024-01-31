import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'auth') {
    res.status(401);
    res.json({ message: err.message });
    return;
  }

  if (err.type === 'input') {
    res.status(400);
    res.json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500);
  res.json({ message: err.message });
};

export default errorHandler;