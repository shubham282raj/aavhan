import { useQuery } from "react-query";
import { getSheet } from "../api-clients";
import ImageSlider from "./ImageSlider";
import { useAppContext } from "../contexts/AppContext";

export default function ImageSliderLoaders({ sheetName }) {
  const sheets = useAppContext()?.genSheet || [];

  if (sheets.length == 0) {
    return <div>Error Loading {sheetName} Section</div>;
  }

  return (
    <>
      <ImageSlider
        images={sheets ? sheets[sheetName] : []}
        sheetName={sheetName}
      />
    </>
  );
}
