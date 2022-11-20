import Player from "./player.model";
import Sport from "./sport.model";
import db from "../config";

// many-to-many relationship with sport model
const Player_Sport = db.define("player_sports", {}, { timestamps: false });

Player.belongsToMany(Sport, {
  through: Player_Sport,
  // as: "sports",
  foreignKey: "player_id",
});

Sport.belongsToMany(Player, {
  through: Player_Sport,
  // as: "players",
  foreignKey: "sport_id",
});

export default Player_Sport;
