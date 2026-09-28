import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        BigInteger count = BigInteger.ZERO;
        BigInteger sum = BigInteger.ZERO;
        
        if (line != null) {
            for (String part : line.trim().split(",")) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                String[] kv = part.split(":");
                if (kv.length != 2) continue;
                
                try {
                    BigInteger val = new BigInteger(kv[0].trim());
                    BigInteger times = new BigInteger(kv[1].trim());
                    
                    count = count.add(times);
                    sum = sum.add(val.multiply(times));
                } catch (NumberFormatException e) {
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
