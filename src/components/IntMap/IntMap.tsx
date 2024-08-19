"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
  GeoJSON,
  useMap,
} from "react-leaflet";
import { Icon, LatLng, LatLngBounds, Map as LeafletMap, Layer } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster/lib/index";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./IntMap.css";

import markerIcon from "./marker_icon.svg";
import layer1 from "@/assets/images/layers.png";
import layer2 from "@/assets/images/layers2.png";

import { projects } from "@/data/projects";
// import { disticts } from "@/data/districts";

import { useEffect, useRef, useState } from "react";
import { districtsMap } from "./Geojsons";
import { IProject } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { API_KEY } from "@/utils";

interface AddControlProps {
  onClick: () => void;
}

const AddControl: React.FC<AddControlProps> = ({ onClick }) => {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (map && !controlRef.current) {
      const customControl = L.Control.extend({
        onAdd: function () {
          const div = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control leaflet-control-custom"
          );
          div.innerHTML = `<button style="width: 30px; background: white;"><img style="width: 100%" src="${layer1.src}"</button>`;
          div.onclick = onClick;
          return div;
        },
      });
      const controlInstance: any = new customControl({
        position: "bottomright",
      });
      controlRef.current = controlInstance;
      map.addControl(controlInstance);
    }
  }, [map]);

  return null;
};

const AddControl2: React.FC<AddControlProps> = ({ onClick }) => {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (map && !controlRef.current) {
      const customControl = L.Control.extend({
        onAdd: function () {
          const div = L.DomUtil.create(
            "div",
            "leaflet-bar leaflet-control leaflet-control-custom"
          );
          div.innerHTML = `<button style="width: 30px; height: 30px; background-color: white;"><img style="width: 100%; height: 100%" src="${layer2.src}"</button>`;
          div.onclick = onClick;
          return div;
        },
      });
      const controlInstance: any = new customControl({
        position: "bottomright",
      });
      controlRef.current = controlInstance;
      map.addControl(controlInstance);
    }
  }, [map]);

  return null;
};

export default function IntMap(props: any) {
  const { position, zoom } = props;
  const [orthphoto, setOrthphoto] = useState(false);
  const [layerMap, setLayerMap] = useState<boolean>(true);

  const mapRef = useRef<LeafletMap>(null);

  const southWest = new LatLng(36.672811, 67.335296);
  const northEast = new LatLng(40.0, 75.150703);
  const bounds = new LatLngBounds(southWest, northEast);

  const iconPerson = new L.Icon({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon.src,
    iconSize: new L.Point(30, 30),
    // className: 'leaflet-div-icon'
  });

  const handleGeoJSONClick = (feature: any, layer: any) => {
    console.log(layer);
    if (feature?.properties?.region === 4) {
      layer.on({
        // mouseover: highlightFeature,
        // mouseout: resetHighlight,
        click: () => {
          if (mapRef.current) {
            mapRef.current.fitBounds(layer.getBounds());
          }
          //  dispatch(selectFilter(feature.properties.name))
          // event.target.setStyle(defaultStyle);
        },
        mouseover: undefined,
        mouseout: undefined,
      });
    }
    const title = feature.properties.name;
    layer.bindTooltip(title);
    layer.focusless = "null";
    // layer.classList.add('focusless')
  };

  const handleSelectFilter = (value: number) => {
    let districtName = "";
    districtsMap.features.forEach(
      (el: { properties: { district: number; district_name: string } }) => {
        if (el.properties.district == value)
          districtName = el.properties.district_name;
      }
    );
    // dispatch(selectFilter(districtName));
    console.log("marker click", districtName);
  };

  const handleChangeMap = () => {
    setOrthphoto(true);
  };
  const handleChangeMap2 = () => {
    setOrthphoto(false);
  };

  const [data, setData] = useState([]);

  async function getProjects() {
    try {
      const response = await fetch(`${API_KEY}/get/project`);
      const data = await response.json();
      setData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  const router = useRouter();

  return (
    <MapContainer
      id="map-gbao"
      ref={mapRef}
      className="w-[800px] h-[600px] max-w-full rounded-[30px] relative"
      center={[36.861034, 72.276093]}
      zoom={7}
      zoomControl={false}
      maxBounds={bounds}
      scrollWheelZoom={false}
      minZoom={7}
    >
      <ZoomControl position="bottomright" />

      <TileLayer
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmF6YXJraHVkb2V2IiwiYSI6ImNsampzeGx2NTBjYmMzbXFxaDBzeXEzcW8ifQ.TIi2ZR3-Vjj8mGghyIGchA"
        id="mapbox/satellite-streets-v12"
        attribution='Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        opacity={orthphoto ? 0.9 : 0.0}
      />
      <TileLayer
        url="https://tile.openstreetmap.org-/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        opacity={orthphoto ? 0.8 : 0.0}
      />
      {/* <Marker position={[36.861034, 72.276093]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}

      <MarkerClusterGroup
        chunkedLoading
        onClick={(ev: any) => {
          console.log(ev);
        }}
      >
        {data.map((project: IProject, index) => (
          <Marker
            key={index}
            position={project?.location?.coordinates}
            // title={project.name_en}
            icon={iconPerson}
            eventHandlers={{
              click: () => {
                handleSelectFilter(project?.Id);
              },
            }}
          >
            <Popup className="w-[200px]">
              <div className="flex flex-col ">
                <img
                  width={200}
                  height={200}
                  className="w-full "
                  src={`${API_KEY}/get/static?path=Banners/${project?.banner_url}`}
                  alt="project"
                />
                <div className="">
                  <h5 className="text-lg">{project?.english?.name}</h5>
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <p>
                      {
                        districtsMap.features.filter((el: any) => {
                          if (
                            el.properties.district ==
                            project?.location?.district
                          )
                            return el;
                        })[0]?.properties.name
                      }
                    </p>
                  </div>
                  <button
                    className="px-2 py-1 bg-orange-600 rounded-[5px] mt-2 text-white"
                    onClick={() => {
                      router.replace(`/projects/${project.Id}`);
                      //   dispatch(viewProject(project));
                      //   router.push('./project', { scroll: false })
                    }}
                  >
                    read more
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <GeoJSON
        style={(feature) => {
          return {
            fillColor: feature?.properties.color,
            weight: orthphoto ? 5 : 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: orthphoto ? 0.2 : 0.7,
          };
        }}
        data={districtsMap}
        onEachFeature={handleGeoJSONClick}
      />

      <AddControl onClick={handleChangeMap} />

      <AddControl2 onClick={handleChangeMap2} />
    </MapContainer>
  );
}
