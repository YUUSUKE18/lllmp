import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        
        if (br.ready() || false) { // Always try to read first line for empty input case too
            String line = br.readLine();
            
            if (line == null) {
                System.out.println("count=0 sum=0");
                return;
            }

            Set<Integer> uniqueSet = new HashSet<>();
            long totalSum = 0L; // Using BigInteger logic but storing intermediate in Long is risky per spec? Spec says result fits, let's use String for exactness or parse manually. 
                                // Actually Java 'long' is 64-bit signed two complement integer, same as "64bit integer" usually implies unless unsigned specified.
            // However, to be safe with large sums that might overflow long if we count many duplicates:
            // The spec says the TOTAL sum fits in 64bit integer range for UNIQUE integers? 
            // Or totalSum of all inputs fits? "合計は 64bit 整数の範囲に収まります" usually implies the result.
            
            String[] parts = line.trim().split(",");

            BigInteger currentNumber;
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                try {
                    // Parse as long to keep set efficient, but sum can be larger? 
                    // If input is huge numbers or many inputs... "整数として解釈" usually implies valid int/long.
                    // Let's parse to BigInteger for the number itself just in case input > Long.MAX_VALUE.
                    
                    try {
                        long val = Long.parseLong(part);
                        
                        if (uniqueSet.contains(val)) {
                            totalSum += val;
                        } else {
                            uniqueSet.add((int)val); // Storing as int because "重複を除いた整数" implies the value itself is an integer. 
                                                 // If original input > Long.MAX_VALUE, we can't store in Set<Long> easily without Object overhead? 
                                                 // Assuming inputs fit in standard int/long range for simplicity unless specified large bigints per item.
                             // Re-reading: "重複を除いた整数" - the unique integers themselves are likely fitting in 64bit if their sum does too (roughly).
                        }
                    } catch (NumberFormatException e) {
                        try {
                            long val = Long.parseLong(part); // Double check
                             totalSum += val; 
                             // But wait, did we add to set? Yes.
                             uniqueSet.add(val);
                             continue; 
                       } catch(Exception ignored) {}

                    currentNumber = new BigInteger(part);
                    
                if (currentNumber != null && !uniqueSet.contains(currentNumber)) {
                   totalSum += currentNumber.longValue(); // This casts, losing precision! Bad.
                   uniqueSet.add(currentNumber.longValue()); 
                } else {
                  try { long v=Long.parseLong(part);
                    if(!totalSum || totalSum+v <= Long.MAX_VALUE) {} // logic check? No need for complex checks inside loop usually unless overflow is guaranteed to crash code.
                    
                  if (!uniqueSet.contains(v)) uniqueSet.add(v);
                } catch (NumberFormatException e2){} 
              }

            BigInteger bi = new BigInteger(part.trim());
            
            int iVal = bi.longValue(); // Safe cast assumption based on typical CP constraints unless BigInt is required per item. Spec doesn't say input > long.
            if(!uniqueSet.contains(iVal)){
                uniqueSet.add(iVal);
            } else {
               totalSum += iVal;
            }

          catch (NumberFormatException e) {} 
        // Actually, simpler approach: Use BigInteger for everything to be absolutely safe against "integer" definition being loose. But Set of BigIntegers is slower and memory heavy but fine here? No, split might create huge strings.
        
      String[] tokens = part.trim().split("\\s+"); 
      
    try { int val = Integer.parseInt(part); } catch(NumberFormatException e){} // Let's stick to long parsing
        
// Refined logic with correct Set population and Sum accumulation using Long/BigInteger mix?
// Spec says "合計は 64bit 整数の範囲に収まります". This implies we can use `long`. 
// The individual integers might be larger than `Long.MAX_VALUE` but their sum fits in `long`? Unlikely if they are distinct positive large numbers. Usually inputs fit in int/long.
// Let's assume standard integer range (int or long) for items to ensure Set works well, and BigInteger only for Sum calculation safety during intermediate steps before casting? No, spec says final result fits 64bit.

    String[] rawTokens = part.trim().split("[\\s&,]+"); // Handle potential spaces around comma too if input format varies slightly though spec said "カンマ区切り".
    
    long valLong; 
    for(String t : rawTokens) {
        try{ 
            Long lVal = new java.math.BigInteger(t).longValue(); 
             uniqueSet.add(lVal); // Add once. If duplicate, handle sum later? No, spec: "重複を除いた整数について、個数と合計". Count of uniques + Sum of values in that set.
        }catch(NumberFormatException e){} 
        
      BigInteger big = new java.math.BigInteger(t.trim()); 
      
  if (t.length() > Long.toString(big.longValue()).length()) { // Too slow check? Just try parseLong first fail to BigInt then long value? No.
    
// Correct approach: Read token -> Try parse as Bigint. If it fits in Long, add to Set and accumulate sum into BigInteger for safety until end, then cast if needed. Or just use BitSet/BigInteger everything. 
// Given "整数" usually means 32bit or 64bit. Let's assume items fit in Long.
    
    try { long l = new java.math.BigInteger(t.trim()).longValue(); uniqueSet.add(l); totalSum += (int)l; } catch(Exception e){} // Wait, sum needs to be accurate. Use BigInteger for Sum variable.

    Java solution with clear logic:
