import java.util.*;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマ区切りの整数列を解析し、重複を除いた値を取得する集合を作成
        Set<Long> distinctNumbers = new HashSet<>();
        
        for (String part : line.split(",")) {
            String trimmedPart = part.trim();
            
            try {
                long num = Long.parseLong(trimmedPart);
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        int count = distinctNumbers.size();
        
        BigInteger sumBig = new BigInteger("0");
        for (Long num : distinctNumbers) {
            sumBig = sumBig.add(BigInteger.valueOf(num));
        }
        long sum = sumBig.longValueExact(); // 合計は仕様通り 64bit に収まるとされるため、longCast

        System.out.println("count=" + count + " sum=" + sum);
    }
}
