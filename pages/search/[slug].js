import React, {useState,useEffect} from "react"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { Row,Col } from 'antd';
import { useRouter } from 'next/router';
import CardWrapper from "../../component/Card";
import styled from "styled-components"
import SearchComp from "../../component/Search";
import Layout from "../../component/layout";
import { API_INSTANCE, AxiosGET } from "../../component/API/api";
export default function Search() {
  const router = useRouter()
  const movie = router.query.slug
  const [searchMovie, setSearchMovie] = useState("")
 
 
  const SearchMovieData = async () => {
    try {
      const response = await  AxiosGET(API_INSTANCE, `/search/movie?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&query=${movie}&page=1&include_adult=false`);
      setSearchMovie(response.results);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    SearchMovieData();
  }, [movie]);
  


  const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  `
  const SearchSubmit = async (value) => {
    try {
      router.push("/search/"+value);
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&query=${value}&page=1&include_adult=false`);
      setSearchMovie(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <section style={{background:`${NEXT_PRIMARY_COLOR}`,padding:"0 0 40px 0",}}>
      <SearchComp onSearch={SearchSubmit}/>
      <Row className="container" justify="space-between">
        <Col sm={24} xl={24}>
          <Row justify="space-between" style={{flexWrap:"wrap"}}>
            <ColWrap span={24} >
            {searchMovie ?  
            searchMovie.map((x,i)=><CardWrapper  {...x} key={x.Title + i + x.imDbRating } />)
            :null}
            </ColWrap>
          </Row>
        </Col>
        <Col sm={24} xl={5}></Col>
      </Row>
      </section>

    </Layout>
  )
}
