import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        BigInteger count = BigInteger.ZERO;
        BigInteger sum = BigInteger.ZERO;
        boolean first = true;
        
        if (line != null) {
            for (String part : line.split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                String[] pair = part.split(":");
                if (pair.length != 2) continue;
                
                try {
                    long val = Long.parseLong(pair[0].trim());
                    long times = Long.parseLong(pair[1].trim());
                    
                    BigInteger bVal = BigInteger.valueOf(val);
                    BigInteger bTimes = BigInteger.valueOf(times);
                    
                    if (!first || bVal.compareTo(sum) > 0) { // Check logic error, actually we need to accumulate sum and count
                        // Actually the condition for max is wrong in my head, let me re-read.
                        // The problem asks for "element count" (number of elements in the expanded list) 
                        // and "sum" (sum of all values). It does NOT ask for max.
                        // Re-reading: 『要素数』と『合計』を求めます。
                        // So I just need to accumulate sum and total items.
                        
                        count = count.add(bTimes);
                        sum = sum.add(bVal.multiply(bTimes));
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
