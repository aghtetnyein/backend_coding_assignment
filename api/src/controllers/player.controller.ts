import { Request, Response } from "express";

import Model from "../models";
const Player = Model.Player;
const Sport = Model.Sport;

const playerCreator = async (req: Request, res: Response) => {
  if (req.body && req.body.email && req.body.gender && req.body.level) {
    const player: any = await Player.create({
      email: req.body.email,
      gender: req.body.gender,
      age: req.body.age ?? null,
      level: req.body.level,
    });

    let resOkay = false;
    if (req.body.sports) {
      for (let sport of req.body.sports) {
        const sportRow = await Sport.findOne({ where: { name: sport.name } });
        if (sportRow) {
          player
            .addSport(sportRow, { through: { selfGranted: false } })
            .then(() => {
              resOkay = true;
            });
        } else {
          const newSport = await Sport.create({ name: sport.name });
          player
            .addSport(newSport, { through: { selfGranted: false } })
            .then(() => {
              resOkay = true;
            });
        }
      }

      resOkay &&
        res.status(201).json({
          meta: {
            status: 201,
            success: true,
            message: "Player created successfully",
          },
          body: {
            email: player.email,
            gender: player.gender,
            age: player.age,
            level: player.level,
            sports: req.body.sports,
          },
        });
    }
  } else {
    return res.status(402).json({
      meta: {
        status: 402,
        success: false,
        message: "Something is required",
      },
    });
  }
};

const playerFetcher = async (req: Request, res: Response) => {
  Player.findAll({
    include: [
      {
        model: Model.Sport,
        as: "sports",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((players) => {
      if (players.length > 0) {
        return res.status(200).json({
          meta: {
            status: 200,
            success: true,
            message: "Player fetched successfully",
          },
          body: players,
        });
      } else {
        return res.status(404).json({
          meta: {
            status: 404,
            success: true,
            message: "Player is empty",
          },
          body: players,
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

export default { playerCreator, playerFetcher };
