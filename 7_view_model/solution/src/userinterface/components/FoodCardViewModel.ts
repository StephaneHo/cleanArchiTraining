import { useState } from "react";

const COLOR_TITLE_CARD = "black";
const BG_COLOR_TITLE_CARD = "gray.100";

export function FoodCardViewModel() {
  const [colorTitleCard, setColorTitleCard] = useState(COLOR_TITLE_CARD);
  // warning: I have changed the name of the variable / to the 6 part
  const [bgColorTitleCard, setBgColorTitleCard] = useState(BG_COLOR_TITLE_CARD);

  // we inverse the values
  const handleMouseEnterCard = () => {
    setColorTitleCard(BG_COLOR_TITLE_CARD);
    setBgColorTitleCard(COLOR_TITLE_CARD);
  };

  const handleMouseLeaveCard = () => {
    setColorTitleCard(COLOR_TITLE_CARD);
    setBgColorTitleCard(BG_COLOR_TITLE_CARD);
  };
  return {
    colorTitleCard,
    bgColorTitleCard,
    handleMouseEnterCard,
    handleMouseLeaveCard,
  };
}
