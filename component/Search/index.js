import { Input,Select} from 'antd';
import styled from "styled-components"
import { NEXT_SECONDARY_COLOR,NEXT_WHITE_COLOR } from '../../public/theme';

const { Option } = Select;
const { Search } = Input;
export default function SearchComp({onSearch}) {
    const InputGroup = styled(Input.Group)`
    .select-wrap{
        width:15%;
    }
    .search-wrap{
        width:85%;
    }
    @media(max-width:992px){
        .select-wrap{
            width:25%;
        }
        .search-wrap{
            width:75%;
        }
    }
    @media(max-width:576px){
        .select-wrap{
            width:35%;
        }
        .search-wrap{
            width:65%;
        }
    }
    .ant-select-selector,.ant-input{
        height:42px !important;
        display:flex;
        background:${NEXT_SECONDARY_COLOR} !important;
        color:${NEXT_WHITE_COLOR};
        align-items:center;
    }
    .ant-input-group-addon, .ant-input-group-addon .ant-btn{
        background:${NEXT_SECONDARY_COLOR} !important;
        outline:none;
        color:${NEXT_WHITE_COLOR};
        
    }
    .ant-input-group-addon .ant-btn{
        border:none;
    }
    .ant-input-group-addon{
        border:1px solid ${NEXT_WHITE_COLOR} !important;
    }
    .ant-select-arrow, .anticon{
        color:${NEXT_WHITE_COLOR};
    }
    .anticon svg{
        font-size:24px;
    }
    `

  return (
    <>
       <div className='container' style={{marginBottom:"20px"}}>
          <InputGroup compact >
            <Select defaultValue="Movie"  className='select-wrap'>
              {/* <Option value="TV Show">TV Show</Option> */}
              <Option value="Movie">Movie</Option>
            </Select>
            <Search className='search-wrap' placeholder="Search for a Movie " onSearch={onSearch}/>
          </InputGroup>
        </div>

    </>
  )
}
