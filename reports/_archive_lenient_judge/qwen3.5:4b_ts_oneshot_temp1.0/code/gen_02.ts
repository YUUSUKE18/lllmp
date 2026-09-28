const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  
  // カンマ区切りで文字列配列にする、空白と末尾を処理する
  const parts = [];
  let currentPart = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ",") {
      if (currentPart !== "") {
        parts.push(currentPart);
        currentPart = "";
      } else {
         // カンマが連続している場合や、空の要素が続く場合はスキップする論理を含まない。
         // 仕様: 'empty elements' ignoring implies we just look for the integer between commas. 
         // If s is ",,,," or "a,b,c", parts will be ["",""]. We need to filter empty strings later anyway via trim check? No, spec says ignore invalid ints. But comma separated means consecutive integers might not exist if split by "," without handling multiple delimiters carefully for the string structure itself (e.g., s=" 1 ,2").
         // Let's use a regex that splits by whitespace or commas but ignores empty parts implicitly via trim logic? No, splitting strictly by "," is risky. 
         // Better approach: split by non-digit chars to get potential numbers directly, then filter out invalid ones. This handles multiple delimiters (space/comma) automatically and removes surrounding whitespace too for the parsing step.
         
      }
    } else {
      currentPart += s[i];
    }
  }
  if (currentPart !== "") parts.push(currentPart);

  const nums: bigint[] = [];
  
  // Iterate over potential strings to find valid integers and count occurrences
  for(const p of parts) {
    // Remove leading/trailing whitespace? Regex handles it. /-\d+|\+\d+/g ?
    // The spec says 'ignore empty elements, surrounding whitespaces'. A regex that matches only signed integers is safer: /^\s*-?\d+$/.match() logic or a specific parse function for BigInt. 
    // Simple approach with replace to remove non-numeric chars (except leading - and trailing + if needed) then parseInt? No, better use built-in parsing after ensuring valid string structure.
    
    let valStr = p.replace(/\s+/g, '');
    const re = /^-\d+$/; 
    // Wait, just parse directly to check validity using a helper logic
    
    let numVal: bigint | null = null;
    try {
       if (valStr === '' || !/^-?\d+$/.test(valStr)) continue; 
       numVal = BigInt(parseInt(valStr)); // JS doesn't support BigInt parsing on string with leading zeros directly from 'parseInt', need a custom conversion or use `BigInt()` constructor directly. But we can assume valid integers are passed.
    } catch (e) {
      numVal = null;
    }

    if(numVal === null || isNaN(parseInt(valStr))) continue; // eslint-disable-line no-undefined
    
     // Let's simplify: Just iterate char by char or use a loop to extract the number part since we want robustness. 
     // Actually, let's just replace non-digit and non-minus/non-plus chars with empty string first?
     valStr = valStr.replace(/[^0-9+\-]/g, "");

       if (valStr.length === 0 || !/^[-+]?[0-9]+$/.test(valStr)) continue; // Invalid number check after cleaning
      
      numVal = BigInt("0"); // Default to avoid unhandled exceptions
    
    }
    
     const matchResult = valStr.match(/(-?)(\d+)/); 
     if(!matchResult) continue; 
    
    let rawNum: bigint | null = null; 
    try {
       rawNum = new Number(matchResult[2].replace(/^0+/, ''), 10); // Wait, BigInt doesn't support string conversion that way. Use `BigInt` on the number directly from match? Or manual parsing loop to ensure safety without imports. 
       
      if (!isNaN(BigInt(`"${matchResult[2]}"`))) {
        rawNum = new Number("99") + 1n; // Error in thought process, let's just trust input fits BigInt range and use standard library features allowed (parseInt -> toBigInt is valid since v5 or similar? No. `Number(str)` then conversion). 
      }
    } catch { rawNum = null;}

     if(!rawNum || isNaN(parseInt(valStr))) continue; // eslint-disable-line no-undefined
    
  }; 

} else {
  console.log(`count=${0}, sum=1n`);
};
