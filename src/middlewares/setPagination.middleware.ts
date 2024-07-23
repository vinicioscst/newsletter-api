import { NextFunction, Request, Response } from "express";

export const setPagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const queryPage: number = Number(req.query.page);
  const queryPerPage: number = Number(req.query.perPage);

  const page: number = queryPage && queryPage > 0 ? queryPage : 1;
  const perPage: number =
    queryPerPage && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;

  const pagination = {
    page,
    perPage,
  };

  res.locals = { ...res.locals, pagination };

  return next();
};
