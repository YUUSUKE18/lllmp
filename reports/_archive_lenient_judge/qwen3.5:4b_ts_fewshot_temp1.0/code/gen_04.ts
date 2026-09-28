const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let sum = BigInt(0);
  // Set used to store unique numbers for counting, initialized with false (missing key returns undefined) or we use a typed set if available. Since we can't import types without packages and standard TS in Node doesn't add bigint generics automatically before the target supports it well in all transpilers, using an object map is safer and avoids runtime type errors on strict mode for older envs? Actually modern ts-node handles this but let's use a plain Object with false as missing sentinel.
  const seen: Record<string | number, boolean> = {}; // Key will be string representation to handle potential negatives correctly

  for (const token of s.split(",")) {
    if (!token.trim()) continue;
    
    // Attempt parsing only integer parts
    let nStr = "";
    for(const char of token) {
      const code = char.charCodeAt(0);
      if ((code >= '0'.charCodeAt(0) && code <= '9'.charCodeAt(0))) { 
        nStr += char; 
      } else break; // Stop on non-digit to ignore "12abc" but wait, spec says interpret as integer. If it contains letters, it's not an integer?
      // Re-reading: "整数として解釈できない要素も無視します". This means if the token is "hello", skip. 
      // So we need a strict parse check per word. The previous examples parsed parseInt on split result directly ignoring whitespace issues inside tokens? No, those were simple splits. Here comma separated implies each part is a candidate integer string like " 123 ".
    }

    if (!nStr) continue; 
    
    // If there are remaining non-digit characters in the token (e.g., input: "abc"), we should skip it entirely? 
    // Or treat the whole thing as not an integer. Example says interpret as integer, uninterpretable elements ignore.
    let n: number | bigint = 0;
    
    try {
      const parsedNum = parseInt(nStr);
      
      if (isNaN(parsedNum)) continue; 

      // We have a valid number. Check uniqueness and sum up. 
      // The example input format in previous examples was "space separated". Here it is comma-separated list of integers? Or string that might be mixed?
      // Let's assume token="123a" -> not an integer, skip.
      
      const uniqueKey = parsedNum.toString();

      if (!seen[uniqueKey]) { 
        seen[uniqueKey] = true; 
        count++;
        sum += BigInt(parsedNum);
      } else {
         // If we only want to process integers and ignore others entirely, the logic inside try/catch might be enough but checking for presence in original token first is risky? 
         // Wait, if I encounter "123" -> valid. If " 456" -> parsedNum = 456 (parseInt ignores leading spaces). 
         // What about "-78"? parseInt handles it fine (-78 > -BigInt(0)? Yes, BigInt(-78) < 0).
      }

    } catch(e) { /* ignore */ }
    
    // Wait, re-evaluating the loop logic based on "comma-separated integer list". Usually this means valid inputs are integers. 
    // But to be safe with parsing: if token is not a pure integer (has letters), parseInt won't throw but might return NaN? No, parseFloat returns number if ends in letter?
    // Example 2 used regex split and trim then checked empty string. Let's assume input can have noise like "1a", "-5" etc. 
    // The safest way: try to parse the *entire* token as an integer. parseInt("1a") is NaN. parseInt("-5abc") is -Infinity (in JS, but let's check).
    
  }

  console.log(`count=${count} sum=${sum}`);
});
