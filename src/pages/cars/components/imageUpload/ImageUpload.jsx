import React from 'react';
import { Upload } from 'antd';

const ImageUpload = ({fileList,setFileList}) => {

    const onChange = ({ fileList: newFileList}) => {
        setFileList(newFileList);
        console.log(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                maxCount={5}
                minCount={1}
                multiple
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 5 && '+ Upload'}
            </Upload>
    );
};

export default ImageUpload;