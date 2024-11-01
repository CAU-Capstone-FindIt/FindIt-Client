import React, { useState } from "react";
import axios from "axios";

const Vision_google = () => {
    const [selectedFile, setSelectedFile] = useState(null);  // 업로드된 파일 (base64)
    const [preview, setPreview] = useState(null);            // 이미지 미리보기 URL
    const [result, setResult] = useState(null);              // Vision API 분석 결과
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
                setSelectedFile(base64String);  // 이미지가 base64로 변환됨
                setPreview(reader.result);      // 미리보기 이미지를 저장
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        const API_KEY = process.env.REACT_APP_Google_Vision;
        const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

        const requestBody = {
            requests: [
                {
                    image: {
                        content: selectedFile,
                    },
                    features: [
                        { type: "LABEL_DETECTION", maxResults: 10 },  // 물건 라벨 인식
                        { type: "IMAGE_PROPERTIES" },  // 이미지 색상 분석
                        { type: "LOGO_DETECTION" }  // 로고(브랜드) 인식
                    ],
                },
            ],
        };

        try {
            const response = await axios.post(endpoint, requestBody);
            console.log(response.data)

            const labelAnnotations = response.data.responses[0].labelAnnotations || [];
            const imageProperties = response.data.responses[0].imagePropertiesAnnotation || {};
            const logoAnnotations = response.data.responses[0].logoAnnotations || [];

            const labels = labelAnnotations.map(label => label.description).join(", ");
            const colors = imageProperties.dominantColors?.colors.map(color => `rgb(${color.color.red}, ${color.color.green}, ${color.color.blue})`).join(", ");
            const logos = logoAnnotations.map(logo => logo.description).join(", ");

            const result = {
                labels: labels,
                colors: colors,
                logos: logos,
            };

            setResult(result);
        } catch (error) {
            console.error("Error analyzing image", error);
        }
    };

    return (
        <div>
            <h1>Google Cloud Vision API Test</h1>
            
            <input type="file" onChange={handleFileChange} />
            <button onClick={analyzeImage} disabled={!selectedFile}>
                Analyze Image
            </button>

            {preview && (
                <div>
                    <h2>미리보기:</h2>
                    <img src={preview} alt="미리보기" style={{ width: "300px", margin: "10px 0" }} />
                </div>
            )}

            {result && (
                <div>
                    <h2>분석 결과:</h2>
                    <p><strong>라벨:</strong> {result.labels}</p>
                    <p><strong>색상:</strong> {result.colors}</p>
                    <p><strong>브랜드:</strong> {result.logos}</p>
                </div>
            )}
        </div>
    );
};

export default Vision_google;