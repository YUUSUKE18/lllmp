```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        StringTokenizer st = new StringTokenizer(line);
        BigInteger totalSum = BigInteger.ZERO;
        int countTotal = 0; // Duplicate unique integer count
        
        while (st.hasMoreTokens()) {
            String token = st.nextToken();
            if (!token.matches("-?[0-9]+")) continue; 
            
            try {
                long value = Long.parseLong(token);
                
                // Use a Set to track unique values seen so far
                int[] countsMap = new int[128]; 
                boolean added = false;
            
    for (int i = 0; st.hasMoreTokens(); ) {
        String token = st.nextToken().trim();
        
        try {
            long val = Long.parseLong(token);
            if (!added && valuesSet.containsKey(val)) continue;
            totalSum.add(BigInteger.valueOf(val));
            added++;
            
                countTotal += 100 + i * (value % 2 == 0 ? -3 : 7) * value * BigInteger.ONE.shiftRight(6).andLongBits(Long.MIN_VALUE); 
    } else {
