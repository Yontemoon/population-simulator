import { select, geoPath, geoMercator } from "d3";
import { useEffect, useRef } from "react";
import useResizeObserver from "../hooks/useResizeObserver";
import { TGeoJSON, TGeoJSONFeature } from "../types";

type PropTypes = {
  data: TGeoJSON;
  selectedCountry: string | null;
};

const GeoChart = ({ data, selectedCountry }: PropTypes) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current);
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const projection = geoMercator()
        .fitSize([width, height], data)
        .scale(200)
        .translate([width / 2, height / 1.4]);
      const pathGenerator = geoPath().projection(projection);

      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("id", (feature: TGeoJSONFeature) => feature.properties.adm0_a3)
        .attr("class", "country")
        .attr("d", (feature: TGeoJSONFeature) => pathGenerator(feature))
        .attr("fill", "#ccc");
    }
  }, [data, dimensions]);

  useEffect(() => {
    if (selectedCountry && svgRef.current) {
      const svg = select(svgRef.current);

      svg
        .selectAll<SVGPathElement, TGeoJSONFeature>(".country")
        .attr("fill", "#ccc");
      svg
        .selectAll<SVGPathElement, TGeoJSONFeature>(".country")
        .attr("fill", (feature) => {
          return feature.properties.adm0_a3 === selectedCountry
            ? "red"
            : "#ccc";
        });
    }
  }, [selectedCountry]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }} className="geoChart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default GeoChart;
