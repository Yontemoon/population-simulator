import "./GeoChart.css";
import { select, geoPath, geoMercator, pointer } from "d3";
import { useEffect, useRef } from "react";
import { TGeoJSON, TGeoJSONFeature } from "../../types";
// import { FeatureCollection } from "geojson";

type PropTypes = {
  data: TGeoJSON;
  selectedCountry: string | null;
};

const GeoChart = ({ data, selectedCountry }: PropTypes) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const mouseoverEffect = (
    _event: PointerEvent,
    d: TGeoJSONFeature
    // svgRef: React.RefObject<SVGSVGElement>,
    // tooltipRef: React.RefObject<HTMLDivElement>
  ) => {
    const toolTipDiv = tooltipRef.current;
    const svgElement = svgRef.current;
    if (toolTipDiv) {
      const div = select(toolTipDiv);
      div.transition().duration(190).style("opacity", 0.9);
    }

    if (svgElement) {
      const svg = select(`#${d.properties.adm0_a3}`);
      svg.style("stroke", "black").style("stroke-width", "1px");
      // .style("fill", "#ACBED8");
    }
  };

  const mousemoveEffect = (
    event: PointerEvent,
    d: TGeoJSONFeature
    // tooltipRef: React.RefObject<HTMLDivElement>
  ) => {
    const mouseCoordinates = pointer(event);
    const x = mouseCoordinates[0];
    const y = mouseCoordinates[1];
    const tooltipDiv = tooltipRef.current;
    if (tooltipDiv) {
      const div = select(tooltipDiv);
      div
        .html(d.properties.name)
        .style("left", x + 5 + "px")
        .style("top", y + 5 + "px");
    }
  };

  const mouseleaveEffect = (_event: PointerEvent, d: TGeoJSONFeature) => {
    const tooltipDiv = tooltipRef.current;
    if (tooltipDiv) {
      select(tooltipDiv).transition().duration(200).style("opacity", 0);
    }
    const svgElement = svgRef.current;
    if (svgElement) {
      const svg = select(`#${d.properties.adm0_a3}`);
      svg.style("stroke", "#999").style("stroke-width", "1px");
      // .style("fill", "#ccc");
    }
  };

  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current);
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      const projection = geoMercator().fitSize([width, height], data);

      const pathGenerator = geoPath().projection(projection);

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("id", (feature: TGeoJSONFeature) => feature.properties.adm0_a3)
        .attr("class", "country")
        .attr("d", (feature: TGeoJSONFeature) => pathGenerator(feature))
        .attr("fill", (feature) =>
          feature.properties.adm0_a3 === selectedCountry ? "#197278" : "#ccc"
        )
        .on("mouseover", mouseoverEffect)
        .on("mousemove", mousemoveEffect)
        .on("mouseleave", mouseleaveEffect);
    }
  }, [data, wrapperRef, svgRef, selectedCountry]);

  // useEffect(() => {
  //   if (selectedCountry && svgRef.current) {
  //     const svg = select(svgRef.current);
  //     // console.log(selectedCountry);
  //     svg
  //       .selectAll<SVGPathElement, TGeoJSONFeature>(".country")
  //       .attr("fill", "#ccc");
  //     svg
  //       .selectAll<SVGPathElement, TGeoJSONFeature>(".country")
  //       .attr("fill", (feature) => {
  //         // console.log(feature);
  //         return feature.properties.adm0_a3 === selectedCountry
  //           ? "#197278"
  //           : "#ccc";
  //       });
  //   }
  // }, [selectedCountry]);

  return (
    <div ref={wrapperRef} className="geoChart-container">
      <div className="geoChart-tooltip" ref={tooltipRef} />
      <svg ref={svgRef} id="geoChart" className="svg-content"></svg>
    </div>
  );
};

export default GeoChart;
