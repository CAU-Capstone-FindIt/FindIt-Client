import React, { useState } from 'react'
import sendMessageToChatGPT from './Vision_gpt';

const Vision_model = () => {

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
        if (selectedFile){
            try {
                const response = await sendMessageToChatGPT(selectedFile);
                setResult(response);  // ChatGPT의 응답 결과 설정
            } catch (error) {
                console.error("Error analyzing image:", error);
            }
        }
    };
    return (
        <div>
            <h1>Vision API Test</h1>
            
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
                    <p><strong>결과:</strong> {result}</p>
                </div>
            )}
        </div>
    );
};

export default Vision_model