/* eslint-disable react-hooks/exhaustive-deps */
import "./GeoChart.css";
import { select, geoPath, geoMercator, pointer } from "d3";
import { useEffect, useRef } from "react";
import { TGeoJSON, TGeoJSONFeature, TCountry } from "../../types";

type PropTypes = {
  data: TGeoJSON;
  selectedCountry: TCountry[] | null;
};

const GeoChart = ({ data, selectedCountry }: PropTypes) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const mouseoverEffect = (_event: PointerEvent, d: TGeoJSONFeature) => {
    const toolTipDiv = tooltipRef.current;
    const svgElement = svgRef.current;
    if (toolTipDiv) {
      const div = select(toolTipDiv);
      div.transition().duration(190).style("opacity", 0.9);
    }

    if (svgElement) {
      const svg = select(`#${d.properties.adm0_a3}`);
      svg.style("stroke", "black").style("stroke-width", "1px");
    }
  };

  function handleMapFill(feature: TGeoJSONFeature): string {
    const matchedCountry = selectedCountry?.find(
      (selected) => selected.abbreviation_3 === feature.properties.adm0_a3
    );
    return matchedCountry ? "#197278" : "#ccc";
  }

  const mousemoveEffect = (event: PointerEvent, d: TGeoJSONFeature) => {
    const tooltipDiv = tooltipRef.current;
    const svgElement = svgRef.current;

    if (!tooltipDiv || !svgElement) return;

    const div = select(tooltipDiv);
    const mouseCoordinates = pointer(event);
    let [x, y] = mouseCoordinates;

    const tooltipWidth = tooltipDiv.offsetWidth;
    const tooltipHeight = tooltipDiv.offsetHeight;
    const { width: svgWidth, height: svgHeight } =
      svgElement.getBoundingClientRect();

    if (x + tooltipWidth > svgWidth) {
      x = svgWidth - tooltipWidth - 10;
    }

    if (y + tooltipHeight > svgHeight) {
      y = svgHeight - tooltipHeight - 10;
    }

    if (x < 0) {
      x = 10;
    }

    if (y < 0) {
      y = 10;
    }

    div
      .html(d.properties.name)
      .style("left", `${x + 5}px`)
      .style("top", `${y + 5}px`)
      .style("visibility", "visible");
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
    }
  };

  const clickCountry = (_event: PointerEvent, d: TGeoJSONFeature) => {
    const countryAbv = d.properties.adm0_a3;
    const countryIsPresent = document.getElementById(countryAbv + "-card");
    if (countryIsPresent) {
      console.log(countryIsPresent);
      window.location.hash = `#${countryAbv}-card`;
    }
  };

  // TODO - SEPARATE OUT CONCERNS
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
        .attr("fill", (feature) => handleMapFill(feature))
        .on("mouseover", mouseoverEffect)
        .on("mousemove", mousemoveEffect)
        .on("mouseleave", mouseleaveEffect)
        .on("click", clickCountry);
    }
  }, [data, wrapperRef, svgRef, selectedCountry]);

  return (
    <div ref={wrapperRef} className="geoChart-container">
      <div className="geoChart-tooltip" ref={tooltipRef} />
      <svg ref={svgRef} id="geoChart" className="svg-content"></svg>
    </div>
  );
};

export default GeoChart;
