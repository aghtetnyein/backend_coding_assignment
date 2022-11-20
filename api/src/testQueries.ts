import Player from "./models/player.model";
import Sport from "./models/sport.model";

const playerCreator = async () => {
  await Player.create(
    {
      email: "sasa@gmail.com",
      gender: "male",
      age: 22,
      level: 5,
      sports: [
        {
          name: "Swimming",
        },
        {
          name: "Boxing",
        },
      ],
    },
    {
      include: "sports",
    }
  );
};

export default { playerCreator };
