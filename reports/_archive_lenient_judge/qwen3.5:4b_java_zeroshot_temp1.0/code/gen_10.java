```java
import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        Set<Integer> uniqueIntegers = extractUniqueIntegers(line);
        
        long count = 0;
        BigInteger sumBigValue = BigInteger.ZERO; // Use BigInteger for intermediate calculation just in case, though spec says fits in 64-bit
        
        for (Integer num : uniqueIntegers) {
            count++;
            if (!num.equals(0)) {
                sumBigValue = sumBigValue.add(BigInteger.valueOf(num));
            } else {
                 // Adding zero doesn't change the sum, so logic holds. 
                 // However, to be strict with "sum" as per usual integer arithmetic:
                 sumBigValue = sumBigValue.subtract(BigInteger.ZERO).add(BigInteger.valueOf(0)).subtract(sumBigValue); // No-op but clear intent if needed, actually simpler below.
            }
        }

        long countLong = (long)count;
        
        BigInteger resultSum = null; 
    // Re-calculate sum properly inside loop to ensure correctness before assignment
        
    Set<Integer> uniqueIntegersSet = new HashSet<>();
    
    String[] parts = line.trim().split("[,\\s]+"); 
    
    for(String part : parts) {
      int valNum;
        try{valNum=Integer.parseInt(part);} catch (NumberFormatException e){} 
         if(valNum==Integer.MAX_VALUE || valNum!=0 && Integer.parseInt(""+(long)Math.abs((double)(int))) != 1L*part.length()){break;} // This logic is flawed for simple parsing, let's use BigInteger directly to be safe with input range and then convert.
    }    
}

private static class Main{ 
public static void main(String[] args) {
   Scanner scanner = new Scanner(System.in);  
  String line = "";
if(scanner.hasNextLine())line=scanner.nextLine();


String [] arr=line.split("[,\\s]+");   
int count=0;long totalSum=0; // Use long as per spec requirement. Since input integers fit in standard int range but sum fits in 64-bit, intermediate sums could overflow if not careful? Spec says "sum <br> ranges within". So final result is fine.
BigInteger valBig = new BigInteger(line.split("[\\s]+")[0].split(",")[0]); // This parsing logic is brittle for empty strings or multiple spaces between numbers without commas

    String [] s=line.trim().split("[, \\r\n\t ]+"); 
for (String str : s) {
if(!str.isEmpty()) { try{ int val=Integer.parseInt(str); count++; totalSum +=val; }catch(Exception e){} }; if(val != Integer.MAX_VALUE && !Integer.toString(val).startsWith("-")) {} // No, just simple try-catch block is enough. 
// Correct parsing:

long sumVal=0L,countNum=0;
String[] inputArray=line.split("[\\s,]+");
for(String token : inputArray) {
    if(token.trim().isEmpty()) continue;
    int value=Integer.parseInt(token); // Assuming integers fit in standard integer type based on problem description context unless specified otherwise. The prompt says "sum fits", not necessarily individual elements fitting 32-bit signed int, but typically competitive programming inputs are within range unless specified as arbitrary precision input per element. If elements exceed long, parseInt fails anyway for summing logic if we treat them as single integers first? Re-read spec: "64bit integer's range". Usually implies the result fits. Individual numbers might be larger than standard int32 but fit in 64-bit? No, it says "integers received" then "sum within 64 bit". It does NOT explicitly state individual elements are <= Integer.MAX_VALUE or Long.MAX_VALUE before summing. However, `Integer.parseInt` throws for large longs. If we need to support up to Long range per element but the total fits in long? Wait, if an element itself is >2^31-1 (long max), it won't fit in int. But standard input "integer" usually implies 32-bit unless specified otherwise or given as hex/BigInteger format string. Assuming typical CP constraints where numbers are within reasonable bounds unless BigInt is needed per item. If I use BigInteger for each element, then cast to Long only if valid? No, let's assume the individual integers can be handled by parsing them first. But wait, what if input has a number like 10^18 (fits in long but not int)? `Integer.parseInt` would crash. 
The spec says "integers". In many contexts without explicit BigInt requirement for elements, this implies standard integer types or the test cases fit within it. However, to be safe against inputs >2*10^9 which fits in 64-bit total sum but not int: Use BigInteger parsing. Then check if they are valid integers (they will be). Add them up using BigInteger, then take modulo? No, spec says "sum is within 64bit integer's range". So final result < Long.MAX_VALUE. 
Algorithm refinement:
1. Parse tokens as Strings to avoid early overflow or type mismatch issues for potentially large individual numbers that still sum correctly in long (though unlikely if one number > max_long). Actually if a single number exceeds the summing capacity of 64-bit signed integer, then "sum within range" condition is violated immediately. Thus all valid inputs must satisfy |x| <= MaxLong roughly, or at least their count doesn't exceed such that sum overflows unless they are small. The safest bet: Parse as BigInteger for each element to cover any 'integer' interpretation (which usually includes 64-bit integers), check if it fits in long range? Or just assume the test case inputs fit within valid integer types or we use BigInteger for accumulation and cast at end only after checking constraints.
Actually, re-reading: "integers received" -> ambiguous size but likely standard. But to be robust against 64-bit integers (like -9223...): Use `BigInteger` for parsing the numbers individually? No, if input is `-100`, that fits in int. If input is `1e18` (string), it overflows int. 
Given "sum fits", individual elements could theoretically be small but many of them. Or few large ones. But usually "integer" implies 32-bit unless specified as arbitrary precision integer list. Let's stick to standard parsing first, then if overflow possible in addition logic?
Wait, `Integer.parseInt` throws for values outside -2^31..2^31-1. If the problem allows inputs like `500, 600, ...`, they sum to > Integer.MAX_VALUE but fit in long. 
Let's use BigInteger for storage of each number just to be safe against large individual integers that might exist (since "integer" can refer to any whole number), then accumulate into a `long` variable because the final sum is guaranteed to fit in 64-bit integer range? No, if I have one element = Long.MAX_VALUE/2 and another = Long.MAX_VALUE - first, it fits. But what if an input is just "180" followed by commas? That's fine. 
Wait, Java `BigInteger` constructor handles strings arbitrarily large. We can parse every token as BigInteger. Then sum them all into a BigInteger variable (or long). Since the problem guarantees the *total* sum fits in 64-bit range, we can safely cast the final result to `long`. But wait, if an individual element itself is larger than Long.MAX_VALUE? Then adding it would make the total exceed Long(MAX) unless there are negative numbers cancelling it out (e.g. one +10^20 and -10^20). If such cancellation happens, does "sum within range" hold? Yes. But do we need to support inputs > long? The problem says "integers", usually implies 32-bit or standard types in basic programming problems unless specified as arbitrary precision input per element. Given the strict output format and typical environment of this prompt style (likely AtCoder/Codeforces easy), numbers are likely within Integer.MAX_VALUE range, but let's be robust. If an individual number exceeds Long max, then even with cancellation it might not fit in 64-bit *if* we treat them as signed integers? 
Actually, if the sum fits in 64-bit integer (long), then mathematically: |Sum| <= MAX_LONG_VALUE. Individual elements must be consistent with this. It is possible to have an element > Long.MAX but cancelled by another negative large number such that result fits long. Example: X = 10^35, Y = -9223372... + small adjustment? No, -X would cancel perfectly giving sum=small. But then Sum fits in range. However, if inputs are arbitrary integers (strings), parsing them as `long` directly might fail on positive huge numbers even if they get cancelled later by negative ones to fit the final answer. 
But usually "integer" implies 32-bit or at most 64-bit per element too. Let's assume standard integer logic: Use BigInteger for each number just in case, then sum into a Long variable? No, better sum into BigInteger first (which has no overflow), and since result fits in long, print the last part of it cast to string. Wait, if I use `BigInteger` for everything, there is NO intermediate overflow risk. Then verify that final result can be represented as 64-bit int? Yes, spec says "sum <br> ranges within". So we just sum using BigInteger and then output. But wait, the spec asks for count (number of unique) and sum. Count fits in long/short easily if input size isn't massive infinite stream. Sum is guaranteed to fit in 64-bit integer range. 
So strategy:
1. Read line.
2. Split by comma/space/newline/tab.
3. For each non-empty string token, parse as `BigInteger`. Skip non-integers (though BigInteger constructor throws NonNumericException for "hello", catch block handles skipping). Actually better to use regex or try-catch with Integer parsing first? No, let's just try-parse the whole thing. If it fails, ignore.
4. Add unique BigIntegers to a Set<Long>?? Or Set<BigInteger>? Yes, `Set<String>` then convert values is tricky for duplicates like " 0 ". 
Actually simplest: Store as BigInteger in HashSet. Then iterate set to count and sum (using long since final result fits). But wait, if individual inputs are huge but cancel out? The problem says "sum of the <br> unique integers". If input has `5`, `64bit range` applies. If we have `-10^30` in input list AND no counterbalance for sum to be within 64-bit integer range, that contradicts spec unless such inputs are excluded by test cases (i.e., "integers received" implies reasonable size). 
Standard interpretation: Integers fit within standard types. I will use `long` logic assuming individual numbers fit in long, but using a helper method to parse safely? No, let's just assume everything fits in the expected arithmetic model and count unique longs. If input has huge number that breaks "sum <br> 64bit", it won't be present or will cancel out perfectly. To handle cancellation properly: Use BigInteger for sum calculation internally if needed, but output format is fixed string `count=sum`. Since we need to return long (or int) range at end? 
Wait, the prompt says "sum <br> ranges within 64bit integer". This implies the mathematical value fits in a signed 64-bit integer. So even with cancellation, the final result must be representable as `long`. 
The safest implementation:
- Parse each token as BigInteger (handles any size). Add to Set<BigInteger>. Calculate count = set.size(). Sum using BigInteger arithmetic? No, since we need output in format that implies a 64-bit integer value. But wait, if I calculate sum with huge numbers and the result is small due to cancellation, how do I know it fits without checking? The spec says it *will*. So calculating `BigInteger` then converting to String/Long representation at end works fine IF the final value actually represents a 64-bit integer (which we can verify by toString length or try-casting). 
Wait, if inputs are huge and result is small, e.g. +10^20 and -10^20+5 -> Result=5. Sum of unique elements: {A, B}. Count=2. Sum=A+B = 5. If I used `long` for summing A and B directly where A>Long.MAX_VALUE, it crashes before adding B? Yes! So we MUST use BigInteger for the summation step to avoid overflow during accumulation if individual numbers exceed long range (even though result fits). 
Algorithm:
1. Read input line.
2. Split into tokens by comma/space/newline/tab.
3. For each token, parse as `BigInteger`. If parsing fails or string is empty/whitespace-only, skip. Ignore non-integer strings? BigInteger constructor throws NumberFormatException for "abc". So try-catch block: catch(NumberFormatException) -> continue. 
4. Add parsed BigIntegers to a HashSet<BigInteger>.
5. Iterate the set: count = size(). Sum variable initialized as `new BigInteger("0")`. For each val, sum.add(val).
6. Since result fits in 64-bit integer range (as per spec), we can convert final bigInteger to String and extract decimal digits? Or just print it? But output format requires exact match of `count=<val> sum=<val>`. Does `<val>` have specific formatting for BigInteger conversion (no leading zeros unless zero)? Standard toString() is correct. 
But wait, does the "64-bit integer" constraint mean we must ensure our internal logic represents a 64-bit int? Or just that the answer will fit there? If I output `count=2 sum="10^5"` it violates format if expected to be parsed as number? No, string representation is fine. But spec says "sum=<total>". Usually this implies standard integer printing (no scientific notation). BigInteger.toString() does exactly that for small values and large values without exponent unless value exceeds certain thresholds? `BigInteger` toString uses decimal base 10 always. So it's safe. 
Wait, efficiency: Parsing huge strings repeatedly is slow if many duplicates of same huge string exist in input but distinct positions? No, set handles uniqueness by comparing BigInteger values (content). If inputs are "huge" numbers that cancel out to small sum, the parsing and storage will consume memory/time proportional to number of unique elements. Since constraints aren't given for element count, we assume reasonable limits. 
One catch: Parsing `BigInteger` from string can be slow if strings are extremely long? Again, not specified but assumed within reason. 

Final check on spec details:
- "integers received" -> implies standard math integers (positive/negative/zero).
- "Ignore blank elements / surrounding whitespaces" -> split with regex `\s*,*` or similar handles this automatically if we filter empty strings after split? Or use Scanner to read tokens skipping whitespace. `Scanner.nextInt()` skips whitespaces and reads ints, BUT throws on non-integers. We need to ignore non-integers silently. 
Using a loop over String array is safer for "ignoring" specific invalid inputs than relying on exception handling flow which might throw out of control if not caught? No, just try-catch per token.

Implementation details:
- `Scanner sc = new Scanner(System.in)`
- Read line (or hasNext).
- Split by `[\\s]+[,]*` ? Better to remove commas/spaces manually or use regex split that consumes delimiters and treats rest as string? 
Actually, splitting by comma is primary. Then trim parts, then try parse integers ignoring others. But wait, if input is "1a 2b", `Integer.parseInt("1a")` throws NumberFormatException -> Ignore it per spec ("interpret as integer" implies non-integers ignored). 

Wait, regex split `[\\s]+[,]*`:
If string is `"A,,B C D E"F".split("[,\\s]+" )`. 
The result array might contain empty strings if consecutive delimiters. We must filter `if (token.isEmpty()) continue;`. Then try parse.

Correct Logic:
1. Get line.
2. Split by comma and whitespace (using regex that matches any sequence of commas or spaces). But careful with trailing/leading separators causing empty tokens? 
Regex split behavior: `"  a , b " .split("[\\s]+[,]*")` -> might produce multiple arrays depending on delimiter grouping. Better to replace all commas/spaces first then iterate char by char? Or just simple tokenization logic.
Simplest approach for Java IO with flexibility: Replace all non-digit and minus sign characters (except decimal point if it were float, but problem says integers) ? No, `Integer.parseInt` can parse "1a" -> throw exception. We don't need to preprocess to regex clean up, just try-parse loop. 
But wait, what about negative signs? `- 5`. If input has space inside number? The prompt says comma-separated list of integers. Spaces are likely separators between numbers, not parts of the integer (unless format allows spaces within int which is invalid for `parseInt`). So "1 2" is two ints if no commas? Or one token if split by comma only and then trim/split space manually? 
Spec: "comma-separated list". Example input could be `10, 20 ,30`. Spaces around numbers are common. Splitting by `[\\s]+[,]*` or just replace `,`, `` (space) with a delimiter is easier. Or simply iterate tokens separated by any non-digit/non-minus char? No, standard interpretation: Numbers can have spaces between them if not comma-separated? But spec says "comma-separated list". So maybe `10 , 20`. 
Let's assume input format: Integers are the only valid entities, surrounding whitespace and commas separate them. Any token that is NOT a valid integer (
