import { Request, Response } from "express";
import { Op } from "sequelize";

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
    }).catch((err: Error) => {
      return res.status(500).json({
        meta: {
          status: 500,
          success: false,
          message: err,
        },
      });
    });

    if (req.body.sports) {
      for (let sport of req.body.sports) {
        const sportRow = await Sport.findOne({
          where: { name: sport.name.toLowerCase() },
        });

        if (sportRow) {
          player
            .addSport(sportRow, { through: { selfGranted: false } })
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
          const newSport = await Sport.create({
            name: sport.name.toLowerCase(),
          });
          player
            .addSport(newSport, { through: { selfGranted: false } })
            .catch((err: Error) => {
              return res.status(500).json({
                meta: {
                  status: 500,
                  success: false,
                  message: err,
                },
              });
            });
        }
      }

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
  const { gender, level, age } = req.query;
  // Raw SQL query
  // `SELECT * FROM players WHERE gender LIKE '%' + gender + '%' AND level LIKE '%' + level + '%' AND age LIKE '%' + age + '%'`;

  Player.findAll({
    where: {
      gender: gender !== undefined ? { [Op.eq]: gender } : { [Op.like]: "%" },
      level: level !== undefined ? { [Op.eq]: level } : { [Op.like]: "%" },
      age: age !== undefined ? { [Op.eq]: age } : { [Op.like]: "%" },
    },
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
