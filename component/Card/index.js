import { Card, Avatar } from 'antd';
import styled from "styled-components"
import { BsStarFill } from "react-icons/bs"
import { NEXT_PRIMARY_COLOR } from '../../public/theme';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Meta } = Card;

export default function CardWrapper({ poster_path, title, original_name, vote_average, id,absolute }) {

    const CardWrap = styled(Card)`
    border:none !important;
    background:${NEXT_PRIMARY_COLOR};
    border-radius:4px;
.ant-card-cover{
    position:relative;
    border-radius:4px;
}
.ant-card-body{
    position:${absolute ? 'absolute':"relative"};
    bottom:${absolute ? '80px':"0px"};
    width:${absolute ? '85%':"100%"};
    padding:${absolute ? '24px':"24px 10px"};
    background:${absolute ? 'transparent':NEXT_PRIMARY_COLOR};
}
.ant-card-meta-title, .ant-card-meta-description{
    color:white;
    font-weight:bold;
}
.ant-card-meta-title{
    font-size:2rem !important;
    overflow:wrap;
}
.ant-card-cover > * {
    height:${absolute ? '400px':"360px"};
    object-fit: cover;
    border-radius:4px;
}
`

const LinkWrap = styled.a`
width:${absolute ? '100%':"260px"};
margin:${absolute ? '0':"20px 10px"};
@media(max-width:992px){
    width:${absolute ? '100%':"200px"};
}
@media(max-width:480px){
    width:85%;
}
`

    return (
        <>
        {poster_path ? 
            <LinkWrap href={"/movie/" + id} >
            <CardWrap
                style={{ width: "100%", borderRadius: "4px" }}
                cover={ 
                    <LazyLoadImage alt="example" src={"https://image.tmdb.org/t/p/original" + poster_path} />
                }
            >
                {/* {genre ? <div style={{background:"#f5b50a",width:"max-content",color:"white",borderRadius:"4px",padding:"0 5px",margin:"10px 0"}}>Action</div> : null} */}
                <Meta style={{ position: `${absolute ? "absolute":"relative"}`, width: "100%", zIndex: "5" }}
                    title={title ? title : original_name ? original_name : null}
                    description={<BsStarFill style={{ color: "#f5b50a", fontSize: "22px" }} />}
                />
                <div style={{ position: `absolute`, color: "white", bottom: `${absolute ? "-34px":"20px"}`, left: `${absolute ? "52px":"55px"}`, zIndex: "5" }}><strong style={{ fontSize: "20px" }}>{parseFloat(vote_average).toFixed(1)}</strong>/10</div>

            </CardWrap>
           {absolute ? <div style={{ position: `absolute`, background: "black", height: "100%", width: "100%", opacity: "0.55", zIndex: "2", top: "0",  borderRadius:"4px" }}></div>:null}
        </LinkWrap>
        :null}
        </>
    )
}
