import { Image } from 'antd';

function ImagePreview({photos}) {
    return (
        <Image.PreviewGroup>
            {photos.map((el,index)=>{
                return <Image
                    key={index}
                    width={100}
                    src={el.photo}
                />
            })}

        </Image.PreviewGroup>
    );
}
export default ImagePreview;