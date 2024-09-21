'use client'
import React, { useState } from 'react';

// 엑셀 파일의 각 행을 표현하는 타입을 정의
type ExcelRow = {
    [key: string]: any; // 엑셀의 각 열을 동적으로 다루기 위한 타입
};

function ExcelUpload() {
    const [excelData, setExcelData] = useState<ExcelRow[]>([]); // 엑셀 데이터를 저장할 상태
    const [file, setFile] = useState<File | null>(null); // 업로드된 파일을 저장할 상태

    // 파일이 변경될 때 파일 상태를 업데이트
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    // 파일을 업로드하고 서버에서 엑셀 데이터를 가져옴
    const handleUpload = async () => {
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload-excel/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('파일 업로드에 실패했습니다.');
            }

            const data = await response.json();
            setExcelData(data); // 서버에서 받은 데이터를 상태로 설정
        } catch (error) {
           
        }
    };

    // 특정 셀을 수정할 때 상태를 업데이트
    const handleEdit = (rowIndex: number, key: string, value: string) => {
        const updatedData = [...excelData];
        updatedData[rowIndex][key] = value;
        setExcelData(updatedData); // 수정된 데이터를 상태에 반영
    };

    // 수정된 데이터를 서버로 전송하여 저장
    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8000/save-edits/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(excelData),
            });

            if (!response.ok) {
                throw new Error('데이터 저장에 실패했습니다.');
            }

            const result = await response.json();
            alert(result.message); // 서버에서 받은 결과 메시지 출력
        } catch (error) {
            
        }
    };

    return (
        <div>
            <h1>엑셀 파일 업로드 및 수정</h1>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {/* 엑셀 데이터를 테이블로 표시 */}
            {excelData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            {/* 엑셀 데이터의 첫 번째 행을 기준으로 열 제목 표시 */}
                            {Object.keys(excelData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.keys(row).map((key) => (
                                    <td key={key}>
                                        {/* 각 셀을 인풋으로 변경하여 수정 가능하게 함 */}
                                        <input
                                            type="text"
                                            value={row[key] || ''} // 값이 undefined일 경우 빈 문자열로 처리
                                            onChange={(e) => handleEdit(rowIndex, key, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* 데이터 저장 버튼 */}
            {excelData.length > 0 && (
                <button onClick={handleSave}>Save Changes</button>
            )}
        </div>
    );
}

export default ExcelUpload;
