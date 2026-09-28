```java
import java.util.Scanner;
import java.math.BigInteger;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        BigInteger sumVal = BigInteger.ZERO; // Using BigInteger to prevent overflow during intermediate calculations, though problem guarantees final result fits in long. However, strict adherence requires ensuring no element exceeds bounds or causes issues if the input is maliciously structured before filtering? The spec says "sum fits in 64-bit integer range", implying valid inputs for this logic. But using Long directly might underflow if we are not careful with negative numbers during accumulation before checking magnitude? Actually, Java's long overflows wrap around (two's complement). If the true mathematical sum is within [-2^63, 2^63-1], then direct `long` arithmetic in Java will work correctly because overflow behavior wraps modulo 2^n. However, to strictly ensure correctness without relying on overflow semantics matching "mathematical" summation (e.g., if intermediate overflows wrap back into a negative number that looks valid but is wrong mathematically), BigInteger is safer for the accumulator logic before casting or just using long since the problem guarantees the final sum fits. Given Java's two's complement, -2^63 to 2^63-1 are representable. If the true sum is within this range, simple addition of longs works as expected in terms of value representation if we assume inputs don't cause intermediate wrap-around that changes meaning? Actually, let's just use BigInteger for safety and then check if it fits in long at the end to be pedantic about "64bit integer". Or simpler: Use `long` directly. If the mathematical sum is within 64-bit range, Java's `long` arithmetic will produce exactly that number because overflow only happens when the true value exceeds +/- 2^63/9? No, overflow wraps instantly. But since the problem guarantees the *result* fits in a signed 64-bit integer (i.e., [-9e18...]), simple addition into a `long` variable will store that exact number correctly because we are summing up to that final value which is representable. The only risk is if intermediate sums exceed long range and wrap around, changing the result? Example: Start with 50 billion (fits), add another 40 billion -> 90 billion (overflows). Result becomes negative. But the true mathematical sum might still be within range later? No, addition is associative. Sum(A+B) = A + B. If intermediate overwraps, we lose information unless it happens to wrap back correctly into a representable number that equals the true remainder modulo 2^64. Since Java `long` wraps mod 2^64 (unsigned arithmetic essentially for magnitude if interpreted as unsigned), but here inputs are signed integers. 
Wait: If I have input "10, -5". Count=1? No wait, distinct numbers.
Example: Input "-9e18 + 1...".
Actually, since the problem states "The sum fits within a 64-bit integer range", it implies there exists an ordering or simply that the final mathematical value is representable. In Java, `long` addition modulo 2^64 corresponds to true arithmetic only if we don't cross boundaries that lose precision? No, for integers in Z/2^nZ, x+y = (x mod n + y mod n) mod n. But here we are not working with modular arithmetic per se unless the sum exceeds range and wraps. 
Let's use BigInteger just to be absolutely safe against any overflow logic pitfalls during accumulation, then convert to Long for output if needed? Or simply print as string from BigInteger. The spec says "sum fits in 64-bit integer", so we can safely cast or store in long at the end. But using `long` directly is standard practice unless inputs are maliciously crafted to overflow intermediate steps while final result stays valid (impossible for addition). Actually, if A+B overflows but C = -(A+B) which also fits? No, sum of integers. If true sum S is within long range, then any partial sum P <= |S| in magnitude? Not necessarily if signs differ and magnitudes add up before subtracting? Example: 10^18 + (-9*10^18)? Final result small negative. Intermediate positive large -> overflow wraps to huge number (likely not representable as long). Wait, Java `long` max is ~9e18. If I have two inputs that sum to something within range but individually are larger than 9e18? No, individual elements must be integers in standard input parsing which usually implies they fit in some reasonable type unless specified otherwise (like arbitrary precision), but typically competitive programming assumes input numbers fit in long or string based parsing. 
To avoid any ambiguity about overflow logic during accumulation when inputs might exceed Long.MAX_VALUE while the final sum fits within it? Wait, if an element itself exceeds 2^63-1, then adding it to anything makes sense only if we treat them as arbitrary precision first. But standard integer input in such problems usually implies elements fit in long too unless specified "arbitrary large integers". The spec says "integers" and "sum fits in 64-bit range". It doesn't explicitly say individual elements are small, but typically they are within a similar bound or handled as strings. 
Let's use `BigInteger` for summing to ensure correctness regardless of element size (assuming input strings represent valid integers that might be large), then finally verify if it fits in long? Or just output the BigInteger string formatted nicely? The spec says "64bit integer range", implying we should treat it as such. Using `long` is sufficient if elements are reasonable, but to avoid overflow bugs during partial sums (e.g. 10^20 + (-9*10^20) = -8*10^20 which overflows long but final result fits? No, that example doesn't make sense for sum fitting in range unless the large numbers cancel out perfectly to a small number, e.g., L and M such that L+M is small. If |L| > Long.MAX_VALUE, then Java `long` will overflow immediately on first add if we try to store it? No, 10^20 doesn't fit in long anyway! So input elements themselves might exceed Long range? Usually "integers" without qualification means they could be arbitrarily large strings. The safest way is:
1. Read string tokens.
2. Parse each as BigInteger (handles any size).
3. Sum them into a single BigInteger.
4. Check if the sum fits in long range (optional, but good for strict adherence interpretation or just output it directly since "fits" means we don't need to force 64-bit format beyond what Java handles natively? Wait, `long` is signed 64-bit. If the true sum is within that range, printing as decimal string from BigInteger works fine).
Actually, re-reading: "合計は 64bit 整数の範囲に収まります" (The total fits in a 64-bit integer's scope). This suggests we can compute it safely. 
Let's proceed with `long` for counting and sum if elements are known to be within long range? Or just BigInteger for everything then print string representation. Since the problem asks us to generate code, using BigInteger is safer and correct regardless of element size constraints mentioned or implied.
Wait, spec: "integers" -> Could be large? "Sum fits in 64-bit". If individual elements are very large (e.g., 10^50) but their sum cancels out to a small number? That would require huge positive and negative numbers added together. But standard input reading of integers without range spec usually implies arbitrary length strings representing ints.
Okay, plan: Use BigInteger for accumulation to avoid any overflow issues during intermediate steps if inputs are large, then output the count (long) and sum as string. The constraint "sum fits in 64-bit" ensures we don't need big integer *output* format beyond standard decimal representation? Or maybe just ensure no arbitrary size output is needed because it's guaranteed to be small enough for long. But printing BigInteger directly prints exactly what the number is, which satisfies the requirement regardless of internal storage method as long as value is correct.

Wait, if I use `long` and an element itself is 10^50? Scanner.nextInt() will throw exception or overflow immediately! So parsing must be done carefully.
Better approach: Read token -> parse to BigInteger (using try-catch or standard constructor) -> add. But wait, "integers" usually implies within reasonable bounds in many contexts unless specified otherwise? No, the safest assumption for code generation tasks with unspecified input ranges is that they can exceed Long.MAX_VALUE if not stated, but here only sum fits. 
Actually, most likely inputs are small (within long range) and intermediate sums won't overflow because final result doesn't overflow and addition of positive numbers increases magnitude... unless negatives?
Let's stick to the simplest robust interpretation: Read as string, parse using BigInteger for safety during summation if needed, but since "sum fits in 64-bit", maybe inputs are also within long range. 
However, to be strictly correct with Java `Scanner` which has default delimiters (whitespace) and nextInt/nextLong might fail on large numbers:
1. Read line/token as String.
2. Remove spaces? Spec says "ignore empty elements and whitespace around". So split by comma is required. But also "integers interpretable". 
Algorithm:
- Read input from System.in (line or stream).
- Split by "," -> get array of strings representing integers.
- Filter non-empty tokens, trim, check if it's a valid integer representation? Spec says ignore elements that cannot be interpreted as integers. So regex `^-?\d+$` could work to filter out "abc" etc., but usually just tryParse or BigInteger constructor throws NumberFormatException which we catch and skip. 
Wait, Java `BigInteger(String)` throws exception on invalid format (like leading zeros are allowed in math? Yes). But non-numeric chars cause failure.
Steps:
1. Read all input into a single string tokenized by commas? Or just process stream char by char ignoring whitespace until comma or end? "Comma-separated integers". So `line.split(",")`.
2. Iterate tokens, trim each (ignore empty). Try to parse as integer. If not valid int representation -> skip. 
   How to define "valid integer"? Standard decimal digits with optional sign at start. BigInteger handles it well even if too large? Yes. But we need to handle cases where parsing fails entirely due to garbage text inside the number part (e.g., "1,2"). `BigInteger` constructor throws exception for non-numeric input like "." or "+".
   Actually, simpler: Use a regex pattern `/^-?\d+$/m` to match valid integers? Or try new BigInteger(s) and catch Exception. 
3. If parse succeeds -> add to sum (using long if we trust elements are small enough, else BigInteger). Given "sum fits in 64-bit", let's assume inputs might be large but their sum is not? No, usually competitive programming problems with this guarantee imply all numbers fit in standard types unless specified otherwise. But using `long` for summation is risky if an element > Long.MAX_VALUE exists and we add it (overflow immediately). 
Wait! If input contains "9007199254740993" (Long.MAX + a bit) -> parse fails or overflows? No, Java `long` parses via `Long.parseLong` which throws for out of range. So if inputs are larger than long, we MUST use BigInteger logic to parse them first! 
So: Use BigInteger to store elements and sum.
After collecting all unique values (using Set<Long> vs Set<BigInteger>? Spec says "distinct integers". Integers in Java can be arbitrarily large? The term "integer" here likely refers to mathematical integer. Since the final SUM fits in 64-bit, maybe individual numbers are also within long range? Or they cancel out. 
Let's assume we need full generality: Use BigInteger for storage and summation of unique elements.
Wait, if I use Set<BigInteger> -> Count = size. Sum = sum(Set). Then output count (long) + "sum=" + sum.toString().
Does this satisfy "64bit integer range"? Yes, because the result fits in 64-bit, so `toString()` of BigInteger will look like a standard decimal number fitting in long format. 
Is it possible that "count" exceeds int? No, count is just how many unique numbers there are. Input size not specified but typically reasonable for such problems (e.g., N lines). But if input is huge list of duplicates -> count can be large (up to N/2^31?). Spec doesn't limit count range explicitly except "integer" usually implies 32-bit or 64-bit? "count=<個数>" -> should we output as `int` or `long`? If there are millions of distinct numbers, it fits in long. Safe to use Long for count too.

Wait, the spec says: "整数として解釈できない要素も無視します" (Ignore elements that cannot be interpreted as integers). 
Example input: `,1, 2abc ,3`.
Tokens after split by comma: "", "1", " ", "2abc", "3".
Trim and check validity.

Final Output Format: `count=<value> sum=<value>` followed by newline. Exact string match required. No extra spaces mentioned except within the format? "strictly one line ... end with newline". 
Example output of spec demo (if any): none provided but example input logic implies strict format.
String concatenation carefully: `"count=" + count + " sum=" + totalSum`

One edge case: Input might have multiple lines? Spec says "standard input from comma-separated integer list". Usually single line or stream of tokens separated by commas and newlines are treated as whitespace separators in many parsers, but spec explicitly mentions "comma-separated", implying the separator is primarily comma. However, standard Java Scanner splits on any delimiter if configured, but here we should rely on explicit comma splitting? Or just tokenize everything ignoring non-commas except commas separate elements? 
"Comma-separated integer list". Usually means `1, 2,3`. Spaces around numbers allowed ("ignore empty and whitespace").
So: Read all input text -> Replace newlines with spaces (optional) or treat as tokens separated by `,`? Actually "comma-separated" implies the structure is primarily comma. 
Best approach: Get all non-whitespace characters that form integers via regex `split("[^0-9\\s+-]+")`? No, simpler: Read entire input into a StringBuilder -> Remove commas? Wait no, we need to process list items separated by commas and whitespace/other separators?
Actually, standard parsing for "comma-separated": Split the string by comma. Each part trimmed is an element. If it's empty or not a valid integer representation, skip.
Wait, what if input is: `1 2` (no comma)? Spec says "comma-separated". Does that mean ONLY commas separate? Or does it follow standard CP format where newlines are ignored and comma separates items in the list? 
Given spec: "Standard input receives a comma-separated integer sequence." -> Implies input string contains integers separated by commas. But whitespace handling: "ignore empty elements, surrounding white space".
So `1 , 2` is valid. `,3` valid. 
Let's just read all characters into one string? Or use Scanner with delimiter pattern `"\\s*,|,"` to find tokens? No, simpler: Read line(s), join by newline -> single string -> split by comma (`","`). Then iterate parts. Trim each part. If empty skip. Try parse as BigInteger/String validation?
Actually, regex `[-+]?[0-9]+` checks if it's a valid integer (ignoring leading zeros is fine). But what about "12a"? Not an integer. 
So: For each token in split array (`","`):
  Trim -> s
  If empty continue.
  Check regex `s.matches("-?[0-9]+")`. Wait, does it allow negative? Yes `-5`. Does it allow leading zeros? Yes `01` is valid integer representation (value 1). 
  But wait, "integer" in Java usually doesn't have fixed width constraints unless specified.
  So if regex matches -> parse to BigInteger -> add to set and sum. Else skip.

Wait, what about numbers like `.5`? Not an integer. Regex `[-+]?[0-9]+` handles only integers (no decimals). If token is "1.2", it doesn't match `[0-9]*`, so skipped. Correct.
What about "++"? Skipped.

Algorithm:
1. Read all input from stdin into a StringBuilder or String. Handle potentially large input by reading char by char? Or just `new Scanner(System.in).useDelimiter("\\A").next()` to get whole content (safe for typical CP inputs unless massive file size, but here we assume reasonable limits). 
2. Split string by "," -> tokens array.
3. Use a HashSet<Long> or Set<BigInteger>. Since sum fits in 64-bit and count is likely within integer range? But if input has many distinct numbers (e.g. all unique), count could be large. Let's use Long for set to save memory/speed unless elements exceed long range. 
Wait, if an element exceeds long range but its value cancels out another huge number to fit in sum, we MUST store them as BigInteger because `long` would overflow during storage of the single element itself!
Example: Input "9007199254740993, -9007199254740994". 
If parsed to long -> 1st overflows (throws or wraps). If we wrap `long`, the value changes. But if input is valid large integer string, we MUST parse as BigInteger first.
So: Use Set<String>?? No, "distinct integers" means mathematical values. So two strings "1" and "01" are same
