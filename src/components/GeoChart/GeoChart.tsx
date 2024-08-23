import { select, geoPath, geoMercator, pointer } from "d3";
import { useEffect, useRef } from "react";
import useResizeObserver from "../../hooks/useResizeObserver";
import { TGeoJSON, TGeoJSONFeature } from "../../types";
import "./GeoChart.css";

type PropTypes = {
  data: TGeoJSON;
  selectedCountry: string | null;
};

const GeoChart = ({ data, selectedCountry }: PropTypes) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dimensions = useResizeObserver(wrapperRef);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const mouseoverEffect = function (_event: PointerEvent, d: TGeoJSONFeature) {
    console.log(d.properties.adm0_a3);
    const toolTipDiv = tooltipRef.current;
    const svgElement = svgRef.current;
    if (toolTipDiv) {
      const div = select(toolTipDiv);
      div.transition().duration(200).style("opacity", 0.9);
    }

    if (svgElement) {
      const svg = select(`#${d.properties.adm0_a3}`);
      svg
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("fill", "#ACBED8");
    }
  };

  const mousemoveEffect = function (event: PointerEvent, d: TGeoJSONFeature) {
    const mouseCoordinates = pointer(event);

    const x = mouseCoordinates[0];
    const y = mouseCoordinates[1];
    const tooltipDiv = tooltipRef.current;
    if (tooltipDiv) {
      const div = select(tooltipDiv);
      div
        .html(d.properties.name)
        .style("left", x + 20 + "px")
        .style("top", y + 20 + "px");
    }
  };

  const mouseleaveEffect = function (_event: PointerEvent, d: TGeoJSONFeature) {
    const tooltipDiv = tooltipRef.current;
    const svgElement = svgRef.current;
    if (tooltipDiv) {
      select(tooltipDiv).transition().duration(200).style("opacity", 0);
    }

    if (svgElement) {
      const svg = select(`#${d.properties.adm0_a3}`);
      svg
        .style("stroke", "#999")
        .style("stroke-width", "1px")
        .style("fill", "#ccc");
    }
  };

  useEffect(() => {
    if (svgRef.current && wrapperRef.current) {
      const svg = select(svgRef.current);
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const projection = geoMercator()
        .fitSize([width, height], data)
        .translate([width / 2, height / 1.44])
        .scale(160);
      const pathGenerator = geoPath().projection(projection);

      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("id", (feature: TGeoJSONFeature) => feature.properties.adm0_a3)
        .attr("class", "country")
        .attr("d", (feature: TGeoJSONFeature) => pathGenerator(feature))
        .attr("fill", "#ccc")
        .on("mouseover", mouseoverEffect)
        .on("mousemove", mousemoveEffect)
        .on("mouseleave", mouseleaveEffect);
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
            ? "#197278"
            : "#ccc";
        });
    }
  }, [selectedCountry]);

  return (
    <div ref={wrapperRef} className="geoChart-container">
      <div className="geoChart-tooltip" ref={tooltipRef} />
      <svg ref={svgRef} id="geoChart"></svg>
    </div>
  );
};

export default GeoChart;
