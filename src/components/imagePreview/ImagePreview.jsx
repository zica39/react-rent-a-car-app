import { Image } from 'antd';
import {FILE_URL} from "../../constants/config";
import PropTypes from 'prop-types';

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
ImagePreview.propTypes = {
    photos: PropTypes.array.isRequired
}
export default ImagePreview;