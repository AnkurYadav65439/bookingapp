import { useFetch } from "../../hooks/useFetch";
import "./propertyList.css";
import { useState, useEffect } from 'react'
import axios from 'axios';

const PropertyList = () => {
  // const { data, loading, error } = useFetch("http://localhost:4000/api/hotels/countByType");
  // console.log(data[1]);
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:4000/api/hotels/countByType");
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }
    fetchData();
},[]);

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
  ];

  return (
    <div className="pList">
      {loading ? "Loading..." :
        <>
          {data &&
            images.map((img, i) => (
              <div key={i} className="pListItem">
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i].type}</h1>
                  <h2>{data[i].count}{data[i].type}</h2>
                </div>
              </div>
            ))
          }
        </>
      }
    </div>
  );
};

export default PropertyList;
