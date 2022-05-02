import React, {useState,useEffect} from "react"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { Row,Col } from 'antd';
import { useRouter } from 'next/router';
import CardWrapper from "../../component/Card";
import axios from 'axios';
import styled from "styled-components"
import SearchComp from "../../component/Search";

export default function Search() {
  const router = useRouter()
  const movie = router.query.slug
  console.log("movieName",movie); // '/blog/xyz'
  const [searchMovie, setSearchMovie] = useState("")
 
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&query=${movie}&page=1&include_adult=false`)
    .then(res => {
      setSearchMovie(res.data.results)
    })
  },[])

  console.log("MOvieList",searchMovie)

  const ColWrap = styled(Col)`
  display:flex;
  flex-wrap:wrap;
  justify-content:start;
  @media(max-width:480px){
    justify-content:space-around;
  }
  `
  const SearchSubmit = value => {
    router.push("/search/"+value)
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=73c98428fbd9b20c3cc69f83f5f2c42b&language=en-US&query=${value}&page=1&include_adult=false`)
    .then(res => {
      setSearchMovie(res.data.results)
    })
  }

  return (
    <>
      <section style={{background:`${NEXT_PRIMARY_COLOR}`,padding:"40px 0"}}>
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

    </>
  )
}
