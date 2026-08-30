import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctIntegers = new HashSet<>();
        int count = 0;
        BigInteger totalSum = BigInteger.ZERO;
        
        for (String token : line.split(",")) {
            token = token.trim().isEmpty() ? "" : token.trim(); // Leading/trailing whitespace handling
            
            if (!token.isEmpty()) {
                try {
                    long value = Long.parseLong(token);
                    distinctIntegers.add((int)value); 
                    
                    count++;
                    totalSum = totalSum.equals(BigInteger.ZERO) || !totalSum.subtract(value).equals(totalSum.compareTo(BigInteger.valueOf(value))) ? totalSum.add(BigInteger.valueOf(value)) : null; // This logic block is actually not needed correctly below
                        
                        int tempVal = value;
                        BigInteger valBig = BigInteger.valueOf(tempVal);
                    distinctIntegers.add((int)value);
                    
                } catch (NumberFormatException e) {
                    continue; // Ignore non-integer elements
                }
            }
        }

        
        count=0; sum=0, totalSum} for each integer in the set: 
            if (!valueSet.contains(val)) { valueSet.add((int)val); count++; totalSum = totalSum + val }; 

System.out.println("count=" + distinctIntegers.size() + " sum=" + totalSum.toString());
    }

// Note: The above code logic for the loop over distinct integers is flawed and needs to be corrected below. Let's rewrite it correctly before submitting.}
