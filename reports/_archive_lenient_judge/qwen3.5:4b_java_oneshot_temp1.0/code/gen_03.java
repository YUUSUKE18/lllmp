import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        HashSet<Integer> uniqueSet = new HashSet<>();
        BigInteger totalSum = BigInteger.ZERO;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            part = part.trim();
            if (!part.isEmpty()) {
                int numVal;
                try {
                    numVal = Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    continue;
                }

                uniqueSet.add(numVal);
                
                BigInteger valNum = new BigInteger(Integer.toString(numVal));
                totalSum = totalSum.add(valNum);
            }
        }
        
        int count = uniqueSet.size();
        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
