import { Request, Response } from "express";
import { Sequelize, Op } from "sequelize";

import Model from "../models";
const Sport = Model.Sport;

const sportsFetcher = async (req: Request, res: Response) => {
  const hasMultiPlayers = req.query.multiPlayers;
  const hasNoPlayers = req.query.noPlayers;

  Sport.findAll({
    where:
      hasMultiPlayers?.toString() === "1"
        ? {
            // Raw SQL query
            // `SELECT * FROM sports WHERE id IN (SELECT sport_id FROM player_sports GROUP BY sport_id HAVING COUNT(sport_id) >= 2)`;
            id: {
              [Op.in]: Sequelize.literal(
                "(SELECT sport_id FROM player_sports GROUP BY sport_id HAVING COUNT(sport_id) >= 2)"
              ),
            },
          }
        : hasNoPlayers?.toString() === "1"
        ? {
            // Raw SQL query
            // `SELECT * FROM sports WHERE id NOT IN (SELECT sport_id FROM player_sports)`;
            id: {
              [Op.notIn]: Sequelize.literal(
                "(SELECT sport_id FROM player_sports)"
              ),
            },
          }
        : {},
    include: [
      {
        model: Model.Player,
        as: "players",
        attributes: ["id", "email", "age", "gender", "level"],
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
  Sport.findOrCreate({
    where: { name },
    defaults: { name },
  })
    .then(([sport, created]) => {
      if (created) {
        return res.status(201).json({
          meta: {
            status: 201,
            success: true,
            message: "Sport created successfully",
          },
          body: sport,
        });
      } else {
        return res.status(409).json({
          meta: {
            status: 409,
            success: false,
            message: "Sport already exists",
          },
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

export default {
  sportCreator,
  sportsFetcher,
};
