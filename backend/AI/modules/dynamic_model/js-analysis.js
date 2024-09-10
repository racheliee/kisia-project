const { JSDOM } = require("jsdom");

// JSDOM을 이용해 가상의 브라우저 환경 생성
const { window } = new JSDOM(`<!DOCTYPE html><body></body>`);

global.window = window;
global.document = window.document;

// 이제 브라우저 전용 코드를 Node.js에서 실행 가능
document.body.style.backgroundColor = "blue"; // 에러 없이 실행

(function (sandbox) {
  function MyAnalysis() {
    const fs = require("fs");
    let currentResult = {};
    let evalDepth = 0;

    function resetCurrentResult(scriptName) {
      evalDepth = 0;
      currentResult = {
        file: scriptName,
        functionCalls: 0,
        evalCalls: 0,
        unaryOperations: 0,
        binaryOperations: 0,
        propertyGets: 0,
        propertyPuts: 0,
        readOperations: 0,
        writeOperations: 0,
        conditionChecks: 0,
        instrumentCodePreCount: 0,
      };
    }

    function saveResultsToCSV() {
      const csvHeaders =
        "File, Function Calls, Eval Calls, Unary Operations, Binary Operations, Property Gets, Property Puts, Read Operations, Write Operations, Condition Checks, Instrument Code Pre Count\n";
      const csvContent = [
        currentResult.file,
        currentResult.functionCalls,
        currentResult.evalCalls,
        currentResult.unaryOperations,
        currentResult.binaryOperations,
        currentResult.propertyGets,
        currentResult.propertyPuts,
        currentResult.readOperations,
        currentResult.writeOperations,
        currentResult.conditionChecks,
        currentResult.instrumentCodePreCount,
      ].join(",");

      try {
        if (fs.existsSync("./analysis_results.csv")) {
          fs.appendFileSync(
            "./analysis_results.csv",
            csvContent + "\n"
          );
        } else {
          fs.writeFileSync(
            "./analysis_results.csv",
            csvHeaders + csvContent + "\n"
          );
        }
        console.log("CSV 파일이 성공적으로 저장되었습니다!");
      } catch (err) {
        console.error("CSV 파일 저장 중 오류 발생:", err);
      }
    }

    this.onReady = function (cb) {
      resetCurrentResult("Unknown Script");
      cb();
    };

    this.scriptEnter = function (iid, instrumentedFileName, originalFileName) {
      if (instrumentedFileName === "eval") {
        evalDepth++;
        return;
      } else if (instrumentedFileName === "evalIndirect") {
        currentResult.evalCalls += 1;
        return;
      }

      resetCurrentResult(originalFileName || instrumentedFileName);
      console.log(
        "스크립트 시작: " + instrumentedFileName + " " + originalFileName
      );
    };

    this.invokeFunPre = function (
      iid,
      f,
      base,
      args,
      isConstructor,
      isMethod,
      functionIid,
      functionSid
    ) {
      currentResult.functionCalls += 1;
      if (f.name === "eval" || f.name === "unescape") {
        currentResult.evalCalls += 1;
      } else if (f === eval) {
        currentResult.evalCalls += 1;
        console.log("Eval 호출: ", args);
      }
    };

    this.unaryPre = function (iid, op, left) {
      currentResult.unaryOperations += 1;
    };

    this.binaryPre = function (
      iid,
      op,
      left,
      right,
      isOpAssign,
      isSwitchCaseComparison,
      isComputed
    ) {
      currentResult.binaryOperations += 1;
    };

    this.getFieldPre = function (
      iid,
      base,
      offset,
      isComputed,
      isOpAssign,
      isMethodCall
    ) {
      currentResult.propertyGets += 1;
    };

    this.putFieldPre = function (
      iid,
      base,
      offset,
      val,
      isComputed,
      isOpAssign
    ) {
      currentResult.propertyPuts += 1;
    };

    this.read = function (iid, name, val, isGlobal, isScriptLocal) {
      currentResult.readOperations += 1;
    };

    this.write = function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      currentResult.writeOperations += 1;
    };

    this.conditional = function (iid, result) {
      currentResult.conditionChecks += 1;
    };

    this.instrumentCodePre = function (iid, code, isDirect) {
      currentResult.instrumentCodePreCount += 1;
    };

    this.scriptExit = function (iid, wrappedExceptionVal) {
      if (evalDepth == 0) {
        saveResultsToCSV();
      }
      evalDepth--;
      currentResult.evalCalls += 1;
    };
  }

  sandbox.analysis = new MyAnalysis();
})(J$);
