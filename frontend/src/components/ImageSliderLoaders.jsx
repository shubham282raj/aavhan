import { useQuery } from "react-query";
import { getSheet } from "../api-clients";
import ImageSlider from "./ImageSlider";

export default function ImageSliderLoaders({ sheetName }) {
  const { data: sheets = undefined, isError } = useQuery({
    queryKey: "getSheetData_General",
    queryFn: () =>
      getSheet(
        "https://docs.google.com/spreadsheets/d/1fibIy-Ts1g5DCO6ETFEN40c7HSj456y04wFdpUvlGJI/export?format=xlsx"
      ),
  });

  if (isError) {
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
