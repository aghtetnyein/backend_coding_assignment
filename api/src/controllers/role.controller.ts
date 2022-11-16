import { Request, Response } from "express";

import Model from "../models";
const Role = Model.Role;

const roleCreator = async (req: Request, res: Response) => {
  if (req.body.name) {
    Role.create({
      name: req.body.name,
    })
      .then((role) => {
        return res.status(201).json({
          meta: {
            status: 201,
            success: true,
            message: "Role created successfully",
          },
          body: role,
        });
      })
      .catch((err: Error) => {
        return res.status(500).json({
          meta: {
            status: 500,
            success: false,
            message: err,
          },
        });
      });
  } else {
    return res.status(402).json({
      meta: {
        status: 402,
        success: false,
        message: "Role name is required",
      },
    });
  }
};

const roleFetcher = async (req: Request, res: Response) => {
  Role.findAll()
    .then((roles) => {
      if (roles.length > 0) {
        return res.status(200).json({
          meta: {
            status: 200,
            success: true,
            message: "Role fetched successfully",
          },
          body: roles,
        });
      } else {
        return res.status(404).json({
          meta: {
            status: 404,
            success: true,
            message: "Role is empty",
          },
          body: roles,
        });
      }
    })
    .catch((err: Error) => {
      return res.status(500).json({
        meta: {
          status: 500,
          success: false,
          message: err,
        },
      });
    });
};

export default { roleCreator, roleFetcher };
