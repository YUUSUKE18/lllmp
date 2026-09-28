import { readFileSync } from "fs";

const input = readFileSync(0, "utf8");
const parts = input.trim().split(",");
let max: number | undefined;

for (const part of parts) {
  const n = parseInt(part, 10);
  if (!isNaN(n)) {
    // Count elements that are valid integers. The specification says to ignore invalid ones, implying we count what remains after filtering or just process the array as is? 
    // Re-reading: "空要素・前後の空白は無視し、整数として解釈できない要素も無視します" -> Ignore empty/whitespace and non-integers.
    // Does this mean we don't increment count for invalid ones, or does it mean just discard them from processing (so they are never counted)? 
    // "元素数と最大値を求めます" (Find the number of elements AND maximum value). Usually implies counting only valid ones if some are ignored.
    // However, typical competitive programming input parsing with commas often assumes all parts are ints or we count what is found.
    // Let's assume: Count = total parts after trimming that result in a valid int. Max = max of those ints. If none valid -> 0 and -Infinity (or maybe not possible based on context). 
    // Wait, if I interpret "無視します" as just skip parsing them entirely, then the count would only be incremented for valid ones.
    
    let val: number;
    const cleaned = part.trim();
    try {
      if (!cleaned || isNaN(parseInt(cleaned))) continue; 
      
      // Actually, `parseInt` handles "123abc" as 123 in JS usually? No, `isNaN("   abc")` is true. But `parseInt("abc", 10)` is NaN.
      // The spec says "integer that cannot be interpreted". So if the string represents a non-integer (like "foo"), we ignore it.
      
      const nVal = parseInt(cleaned, 10);
      
      // If part was empty or not an integer? 
      // Let's stick to: Only process parts where `parseInt` succeeds and returns a number different from NaN/Empty logic if strict.
      // But wait, standard behavior of `parseInt`: "abc" -> NaN. "" -> 0 (sometimes?) No, parseInt("") is NaN in modern JS unless configured? 
      // Actually `parseInt("", 10)` is `NaN`. `parseInt("   ", 10)` is `NaN` or `0` depending on environment logic regarding 'undefined'.
      
      if (!isNaN(nVal) && nVal !== Infinity && nVal !== -Infinity && nVal >= -9e15 && nVal <= 9e15n) { 
          // Check bounds later, just check validity.
          max = Math.max(max ?? (-0x10000000000000), (max as number < ? no wait). }; }
      else if (!isNaN(nVal)) {
         const intN = nVal; 
         // We have a valid integer. Increment count? Or just track max and compute count later?
         // Let's use Map or simple vars. Since we need to return one line at end, process stream is fine but input comes once.
      }
    } catch (e) {}

}
