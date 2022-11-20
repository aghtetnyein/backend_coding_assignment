import { Request, Response } from "express";
import { Op } from "sequelize";

import Model from "../models";
const Sport = Model.Sport;
const Player_Sport = Model.Player_Sport;

const sportFetcher = async (req: Request, res: Response) => {
  // fetch sports multiple players are associated with
  Sport.findAll({
    include: [
      {
        model: Model.Player,
        as: "players",
        attributes: ["id", "email", "age", "level"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((sports) => {
      if (sports.length > 0) {
        return res.status(200).json({
          meta: {
            status: 200,
            success: true,
            message: "Sport fetched successfully",
          },
          body: sports,
        });
      } else {
        return res.status(404).json({
          meta: {
            status: 404,
            success: true,
            message: "Sport is empty",
          },
          body: sports,
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

const sportCreator = async (req: Request, res: Response) => {
  const { name } = req.body;
  Sport.create({ name })
    .then((sport) => {
      return res.status(201).json({
        meta: {
          status: 201,
          success: true,
          message: "Sport created successfully",
        },
        body: sport,
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
};

export default { sportCreator, sportFetcher };
