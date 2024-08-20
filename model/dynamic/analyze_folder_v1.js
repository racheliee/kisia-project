const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

// 분석할 폴더 경로 설정
const folderPath = "./dynamic_temps";
const errorLogPath = "./error_logs.csv";
// 스크립트 실행 전에 폴더 내의 파일 목록을 저장
const initialFiles = new Set(fs.readdirSync(folderPath));

// 폴더 내의 파일 목록을 읽고, 파일명을 기준으로 정렬
const files = fs.readdirSync(folderPath).sort();

// csv 파일에 에러 기록을 위한 함수
function logErrorToCSV(fileName, errorMessage) {
  const csvHeaders = "File, Error Message\n";
  const csvContent = `${fileName}, "${errorMessage.replace(/"/g, '""')}"\n`;

  try {
    if (fs.existsSync(errorLogPath)) {
      fs.appendFileSync(errorLogPath, csvContent);
    } else {
      fs.writeFileSync(errorLogPath, csvHeaders + csvContent);
    }
    console.log(`Error logged for ${fileName}`);
  } catch (err) {
    console.error("Error saving to CSV:", err);
  }
}
files.forEach((file) => {
  if (path.extname(file) === ".js") {
    const filePath = path.join(folderPath, file);
    console.log(`Analyzing ${filePath}`);

    const result = spawnSync(
      `node ../jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ./Myanalysis_v1.js ${filePath}`,
      { stdio: "pipe", shell: true }
    );

    // 에러 발생 시 에러 메시지 저장
    if (result.error || result.status !== 0) {
      const errorMessage = result.stderr.toString() || result.error.message;
      logErrorToCSV(filePath, errorMessage);
    } else {
      console.log(`Analysis completed for ${filePath}`);
    }
  }
});

// 스크립트 실행 후 폴더 내의 파일 목록을 가져옴
const finalFiles = new Set(fs.readdirSync(folderPath));

// 스크립트 실행 후 새로 생성된 파일들을 찾아 삭제
finalFiles.forEach((file) => {
  if (!initialFiles.has(file)) {
    const filePath = path.join(folderPath, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted newly created file: ${filePath}`);
  }
});

console.log(
  "Script execution completed, and newly created files have been deleted."
);
