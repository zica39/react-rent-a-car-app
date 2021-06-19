import { Image } from 'antd';
import {FILE_URL} from "../../constants/config";

function ImagePreview({photos}) {
    return (
        <Image.PreviewGroup>
            {photos.map((el,index)=>{
                return <Image
                    key={index}
                    width={100}
                    src={FILE_URL +  el?.photo}
                />
            })}

        </Image.PreviewGroup>
    );
}
export default ImagePreview;