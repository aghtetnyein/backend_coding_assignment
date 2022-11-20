import { Request, Response } from "express";

import Model from "../models";
const Sport = Model.Sport;
const Player = Model.Player;
const Player_Sport = Model.Player_Sport;

const sportsWithNoPlayer = async (req: Request, res: Response) => {
  // retrieves sports no player is associated with.
  // `SELECT * FROM sports WHERE id NOT IN (SELECT sport_id FROM player_sports)`;
};

const sportsFetcherWithMultipleUsers = async (req: Request, res: Response) => {
  // retrieves sports multiple (= more than or equal to 2) players are associated with.
  // `SELECT * FROM sports WHERE id IN (SELECT sport_id FROM player_sports GROUP BY sport_id HAVING COUNT(sport_id) >= 2)`;
  const sports = await Sport.findAll({
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

  console.log("sports", sports);
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

export default {
  sportCreator,
  sportsWithNoPlayer,
  sportsFetcherWithMultipleUsers,
};
