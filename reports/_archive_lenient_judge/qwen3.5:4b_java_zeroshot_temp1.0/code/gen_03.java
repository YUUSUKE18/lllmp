```java
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String input = scanner.next().toLowerCase(); // 空白を区切りとして next() が呼ばれるので、各トークンを読み込む
            
            //カンマが含まれる場合や、数字以外の文字を含む場合はスキップする必要があるが、next()はスペースで分割されるため、
            // インプット形式によっては「1,2,3」のような連続した文字列が入ってくる可能性がある。
            // 仕様によると「カンマ区切りの整数列」とあるので、「1, 2, 3」「1 ,2,3» などを含む可能性あり。
            // next() の代わりに整った読み込みにする必要があるかもしれないが、まずは入力されるものに応じて判断。
            
            String token = scanner.next(); 
        }

// Wait, my previous logic with while hasNext and .next() assumes whitespace separated tokens only.
// But the input can be comma-separated like "1,2,3". Scanner.defaultDelimiter is by default whitespace.
// So if user inputs "1, 2", next gives "1," then scanner.next? No, because there is no space after comma in some cases or spaces exist.
// I should use a custom delimiter for the whole input line OR handle commas manually within tokens or split everything at once by default separator (comma).

        // Let's fix the reading strategy properly: The input format says "カンマ区切りの整数列" but doesn't strictly say separated only by comma, no spaces.
        // Actually it likely means like "1, 2,3". 
        // To ensure we handle everything correctly (including removing blank parts and ignoring non-integer strings):

        scanner = new Scanner(System.in);
        Set<Integer> set = new HashSet<>();
        
        String inputLine = ""; 
        while(scanner.hasNext()) {
            if(inputLine.isEmpty()){ inputLine += scanner.next().toString() + ","; } // Accumulating weirdly? No.
            
            // Correct approach: treat all tokens and commas together, or read raw string from System.in until EOF using a single custom tokenizer that splits by anything not 0-9-. (No, we need to parse numbers)
        }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>(); // stores unique ints
        
        int lineCount=0; // just count? no. 
        String inputData = ""; 
        
        if(!sc.hasNext()){ return;} 
    }

// Final correct logic to ensure robustness: The scanner default delimiter is whitespace, but the problem statement implies comma separation might be dense or mixed with spaces (e.g., "1 , 2").
// If we assume standard behavior where input could look like "1,,3" or "1, 2", simply reading all remaining content as a single string and splitting by [^\d-] logic? 
// No. Simpler: Read the whole input into one string (if possible) or parse token-by-token carefully.
// Let's just read everything that isn't whitespace or non-number characters except valid digits/dots/signs, assuming comma is separator.

        // Robust way for Java without external libs other than Scanner/System.in/HashSet:
    public static void main(String[] args) throws Exception { 
        java.util.Scanner scanner = new java.util.Scanner(System.in); 
        // Since the input format isn't strictly defined (comma only vs comma+space), we will treat everything as a sequence of characters.
        // But actually, Scanner with delimiter "\s" is standard. 
        // However, if "1," comes in without space after it? scanner.next() returns "1". Then next tries to read something else but there's nothing left unless another integer follows.
        
        // Let's use a custom loop or just manually parse the stream. 
        // A simple way: Use Scanner with delimiter pattern "[^0-9\-]?" (optional minus, no other chars allowed) ? No.
        
        // Let's rewrite to handle arbitrary input string properly by using default split logic on everything?
    }

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> set = new HashSet<>();
        
        int count = 0; 
        // We need to read until EOF. Since input may not be tokenized by whitespace only (e.g., "1,2"),
        // we will try to construct numbers from the current tokens or just manually parse if needed?
        // Actually, a safer bet is: Read ALL remaining content into one string (by reading line-by-line and concatenating) then process.

        StringBuilder sb = new StringBuilder(); 
        while(scanner.hasNextLine()){
            String line = scanner.nextLine();
            sb.append(line);
        }

        String fullInput = sb.toString().trim(); // remove leading/trailing whitespace
        
        if(fullInput.isEmpty()) return; 
        
        // Now split by commas and iterate. Or even better, replace all non-digit minus with delimiters? 
        // We can use regex to find numbers directly from the string without relying on comma-only splitting (handles mixed formats).
        java.util.regex.Matcher m = fullInput.matcher(java.util.regex.Pattern.compile("[+-]?(\\d+)"));
        
        while(m.find()){
            String sVal = m.group(); 
            try {
                int val = Integer.parseInt(sVal); // 64-bit range? Yes, Integer is 32 bit. 
                // Wait! "合計は 64bit 整数の範囲に収まります" refers to the SUM (total), not necessarily individual values fitting in long?
                // But usually integers are signed. If input numbers themselves exceed Long.MAX_VALUE but sum fits? Unlikely unless very large inputs.
                // However, problem says "整数として解釈できない要素も無視します", which implies valid ints only. 
                // Standard integer types: int is 32 bit (max ~2e9), long is 64 bit (~9e18). 
                // Since sum fits in 64-bit, individual values likely fit too if they are typical "integers".
                // But to be safe for input like "-5", use Long instead? Or just parse as String and check.
                // The problem says integers - usually implies standard integer range unless specified otherwise (e.g., BigInt). 
                // If the user inputs a number larger than Integer.MAX_VALUE, it might overflow int parsing if not careful, but Java's Long.parseLong handles up to 2^63-1 which fits sum?
                // No wait. The problem asks for "integers". In most contexts, unless specified as arbitrary precision or BigInteger, 
                // and the constraint is on SUM fitting in long/long range (which could be small inputs but huge count?), actually if individual numbers can exceed Integer.MAX_VALUE, we need to use Long.
                
                // Let's assume input values fit within standard integer types OR that using "Integer.parseInt" might throw exception for large ones? 
                // But usually competitive programming problems say "integer" meaning 32-bit unless context implies long. Here sum is constrained to 64-bit, not elements. 
                // Safest approach: Use Long.parseLong(). It covers more range and fits within the problem's implied bounds (since if input was >Long.MAX_VALUE it wouldn't be standard 'int').
                
            } catch(NumberFormatException e){ /* Ignore */ continue; }
            
        long val = Integer.parseInt(sVal); 
    // Wait, I need to re-parse. My previous logic inside while loop:

// Let's refactor the parsing part clearly in one go.
long currentNumValue = Long.parseLong(m.group()); 
        
set.add((int)currentNumValue? No wait if inputs exceed int range we must keep them as longs or handle error. 
Wait, "整数" usually means signed 32-bit integer unless specified otherwise (like C++'s long). But in Java context without specific constraint on element magnitude, and only sum is constrained to 64bit...
Usually this implies elements might be larger than int but the total count*avg fits? No. 
Let's assume standard integers fit into Long range for safety since we are adding them up anyway. If they were BigInteger, parsing all would require explicit handling of overflow before conversion to sum, which is complex without BigInt support (which exists in java.math package).
"標準ライブラリのみ使う" -> java.lang.Math etc allowed? Yes. But "java.util.*" for Set/Scanner/Huffman/Set? Java 7+ has BigInteger if needed. 
But typically "整数" means int or long range unless specified as arbitrary length strings. Given the strictness of output format and typical constraints, let's assume elements fit in Long (or even Integer) but use Long to accumulate safely into a 64-bit variable since sum is guaranteed to be within it.
Wait, if an individual element exceeds Long.MAX_VALUE, its string representation would still parse fine with BigInteger? 
If the problem meant "standard integers" as C++ int or Python's default arbitrary (unbounded) ints... but in Java without explicit BigInt usage constraint, using `Long` is safer for elements unless they are massive strings.
Let's assume valid input numbers fit within Long range because parsing them into a variable type would require BigInteger if not specified otherwise? 
No, the problem says "integer" -> let's treat as 32-bit int or similar. But to avoid overflow on sum we use `long` for accumulation and storage of distinct values (if possible). If input value exceeds Long.MAX_VALUE, it cannot be stored in long either.
Assuming standard integer range is likely too small if "integer" meant strictly -2^31..2^31-1 but the user inputs something larger? 
Let's use `BigInteger` just to be absolutely safe for element parsing (since they call it 'integers', and 64-bit constraint applies only to sum). This ensures correctness even if elements are large.

// Final Plan:
// Read all text -> Remove non-digit/non-minus characters except valid separators? No, regex "[+-]?(\\d+)" works for any integer string representation (including commas removed implicitly by pattern skipping them?). 
// Wait, the input is "comma-separated". e.g., "100 , 200". Regex [+-]?[0-9]+ handles it if we replace non-matching chars with nothing or iterate?
// Better: Use `Scanner` again to extract tokens, but since regex finds numbers in stream directly.

        // Using Scanner's default behavior is not enough for "1, 2" -> next() gets "1,", then throws exception parsing int from string ending with comma. 
        // My previous logic of reading all input into a single String and using Regex to find patterns works best here regardless of delimiters (comma or spaces).

// Re-implementing inside Main class cleanly:
} else { /* Not needed */ } 

// Let's restart the code structure from scratch with clear steps.
    public static void main(String[] args) throws Exception { 
        java.util.Scanner sc = new java.util.Scanner(System.in); 
        
        // Read entire input as one string to handle arbitrary formatting (commas, spaces mixed)
        StringBuilder sb = new StringBuilder(); 
        while(sc.hasNextLine()){
            String line = sc.nextLine();
            if(!line.trim().isEmpty()){
                for(int i=0; i<line.length(); i++){
                    char c=line.charAt(i); // check logic later? No. Just append.
                    sb.append(c);
                } 
            }else { continue;}
        }

        String fullInput = sb.toString(); 
        
// Now parse numbers from the string "1,200" or "-5" etc using Regex pattern for integers only
java.util.regex.Pattern p = java.util.regex.Pattern.compile("-?[0-9]+"); // Match integer digits (optional minus) 
// Note: Java 7+ supports BigInteger via Math.multiplyExact? No. We need to sum them up and output count/sum format.
        Set<Long> distinctNumbersSet = new HashSet<>(); // Use Long for safety against large inputs if needed, or Integer if strictly "int". Let's use Long to match the sum requirement (64-bit range). 
// Actually, since sum fits in 64 bit integer, and input elements are integers...
// If I encounter a number larger than long? Unlikely given problem constraints usually imply reasonable inputs. 
// But let's stick with `BigInteger` for element parsing just to be ultra safe if the test cases use large numbers (since "integer" can sometimes mean unbounded in some contexts).
Set<java.math.BigInteger> distinctNumbers = new HashSet<>(); 

long sumValue; // Wait, 64bit integer -> long. But elements? 
// Let's try parsing as BigInteger first to be safe for input representation, then convert to long if within range or throw error? No problem guarantees output format only.
// The constraint "sum fits in 64 bit" implies the SUM is not overflowed beyond Long.MAX_VALUE. If individual element was > Long.MAX/2 and count >=1, sum would be huge unless negative cancels it out (unlikely for distinct positive/negative mix). 
// Assuming inputs fit within `long` or small enough so that BigInteger parsing -> long conversion works without losing value? No, if input is large but only one item exists, sum fits.
// Let's use Long to store elements and Summation logic directly in Long since we can cast from String using Long.parseLong which handles up to 9e18. 
// If an element exceeds that range, then even with BigInteger it might not fit in long (if problem says "integer" strictly). But if sum fits in long, maybe input elements also fit?
// Let's use `BigInteger` for parsing the individual values just in case they are large but their algebraic sum stays within 64-bit. 
// Wait, can we store BigInteger inside Sum variable which is Long? Yes: (sum as String) -> ParseLong only if result fits long? No, problem says "sum <fits 64bit>". So the calculated sum will fit in Long.
// Thus every element added must be representable such that total <= MAX_VALUE + MIN_VALUE of range? 
// We can use BigInteger for intermediate calculation to ensure we don't lose precision during accumulation before checking if it fits long (or just trust problem statement).

Set<java.math.BigInteger> distinct = new HashSet<>();
long countLong; // no, need string representation or integer object. Count is number of distinct elements -> int. Sum can be BigInteger then converted to String? No "output sum" implies numeric value. 
// But if it fits in 64-bit, we can output as decimal string which `System.out.println` handles naturally for long/bigInteger?
// Wait, problem: Output format is strictly count=<number> sum=<number>. 
// If I calculate BigInteger and print, does it satisfy "fits in 64bit integer"? Yes. The constraint says the result fits. 

Set<Integer> distinctNums = new HashSet<>(); // Let's assume elements are standard integers (Integer.MAX_VALUE/Min).
java.util.Scanner sc2 = new java.util.Scanner(sc); 
// Actually, better: Use Scanner with delimiter pattern? No need if we process whole string.

        String[] parts = fullInput.split("[^0-9\\-]+"); // Split by anything NOT digit or minus sign (removes comma and spaces automatically)
        
        for(String part : parts){
            try { 
                BigInteger biVal = new java.math.BigInteger(part);
                if(biVal.signum() == 0 && !biVal.toString().isEmpty()){ continue; } // empty string? No, split might give null or duplicates.
                
                distinct.add(new java.math.BigInteger(String.valueOf(biVal).replace(",", ""))); // Just in case input has commas inside numbers like "1234" -> ok, but what about "1 2"? Handled by regex splitting.
            } catch(Exception e){ continue; } 
        }

// Correct split logic: Remove non-alphanumeric characters except digits and minus? No. The string is a sequence of integers separated by commas.
// Example input: "-10,5 , -3" -> Splitting by "[^\\d-]+" gives ["", "10", "5", "", "-3"] 
// Better use Pattern Matcher directly without splitting array logic if split fails on empty strings.

        Set<BigInteger> s = new HashSet<>();
        java.util.regex.Matcher m2 = fullInput.matcher(java.util.regex.Pattern.compile("[+-]?\\d+")); 
        
        while(m2.find()) {
            String token = m2.group().replace(",", ""); // remove internal commas if any (though split handles better, regex finds contiguous digits) 
            BigInteger val;
            try{
                val = new java.math.BigInteger(token); // parse ignoring potential surrounding spaces? Regex [+-]?\\d+ captures integer parts. But wait, what about negative sign handling in string input like "--5"? No standard format allows double minus unless parsing error. Assume valid tokens or ignore invalid. 
            } catch(Exception e){ continue; }
            
            s.add(val); // add to set of BigIntegers
            
        }

// Now compute count and sum using BigInteger arithmetic (safe) then convert result back to long if possible, else output as is? 
// Constraint says "sum fits in 64 bit integer". So we can cast the final bigInt to Long safely.
long distinctCount = s.size(); // size returns int

BigInteger totalSumBig = java.math.BigInteger.ZERO;
for(BigInteger val : s){ 
    totalSumBig = totalSumBig.add(val); 
}

// Verify if sum fits in long? Problem says it does, so we trust that. But wait, BigInteger.toString() is needed for output format "sum=<...>".
System.out.println("count=" + distinctCount + " sum=" +
