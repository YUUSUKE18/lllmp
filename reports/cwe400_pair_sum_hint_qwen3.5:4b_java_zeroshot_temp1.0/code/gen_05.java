import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = reader.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }

        BigInteger targetVal;
        try {
            targetVal = new BigInteger(targetLine.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        Set<BigInteger> seen = new HashSet<>();
        BigInteger count = BigInteger.ZERO;
        
        String line;
        while ((line = reader.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // 1 行に複数の整数がある場合も処理する必要があるか？
            // 仕様は「2 行目以降には整数が 1 行に 1 個ずつ並びます」とあるので、
            // 基本的に 1 つずつですが、冗長な解析（スペース区切り）にすれば安全です。
            String[] parts = line.trim().split("\\s+");
            
            for (String part : parts) {
                if (!BigInteger.ZERO.equals(new BigInteger(part))) { // 0 が含まれる場合のみチェック？不自然なので全部扱う
                   // 整数として解釈できない行も無視します。
                   try {
                       BigInteger val = new BigInteger(part);
                       
                       // targetVal - val の差をセットに存在するか確認
                       BigInteger complement = targetVal.subtract(val);
                       if (seen.contains(complement)) {
                           count = count.add(BigInteger.ONE);
                       }
                       
                       seen.add(val);
                   } catch (NumberFormatException e) {
                       // 数値ではない場合はスキップ
                   }
                }
            }
        }
        
        System.out.println("pairs=" + count);
    }
}
