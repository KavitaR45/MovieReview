import { Card, Avatar } from 'antd';
import styled from "styled-components"
import {BsStarFill} from "react-icons/bs"

const { Meta } = Card;

export default function CardWrapper() {

const CardWrap = styled(Card)`
.ant-card-cover{
    position:relative;
}
.ant-card-body{
    position:absolute;
    bottom:80px;
    width:100%;
}
.ant-card-meta-title, .ant-card-meta-description{
    color:white;
    font-weight:bold;
}
.ant-card-meta-title{
    font-size:2rem !important;
}
.ant-card-cover > * {
    height: 400px;
    object-fit: cover;
}
`

    return (
        <CardWrap
            style={{ width: "100%", borderRadius:"4px" }}
            cover={
                <img
                    alt="example"
                    src="http://html.bdiakcml8h-e92498n216kr.p.runcloud.link/blockbuster/images/uploads/slider1.jpg"
                />
            }
        >
            <div style={{background:"#f5b50a",width:"max-content",color:"white",borderRadius:"4px",padding:"0 5px",margin:"10px 0"}}>Action</div>
            <Meta style={{ position: "absolute" }}
                title="The revenant"
                description={<BsStarFill style={{color:"#f5b50a",fontSize:"22px"}}/>}
            />
            <div style={{position:"absolute",color:"white",bottom:"-34px",left:"52px"}}><strong style={{fontSize:"20px"}}>7.4</strong>/10</div>

            
        </CardWrap>
    )
}
