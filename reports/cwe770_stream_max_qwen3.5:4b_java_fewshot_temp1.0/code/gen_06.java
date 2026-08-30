import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        int count = 0;
        BigInteger maxVal = null;
        
        if (line != null) {
            for (String part : line.split(",")) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        long val = Long.parseLong(part);
                        count++;
                        
                        if (maxVal == null || maxVal.compareTo(BigInteger.valueOf(val)) < 0) {
                            maxVal = BigInteger.valueOf(val);
                        }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない場合は無視する
                    }
                }
            }
        } else if (!line.equals("")) {
             count++;
             
    }
