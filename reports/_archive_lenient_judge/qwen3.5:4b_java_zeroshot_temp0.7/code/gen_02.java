import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        try {
            // カンマ区切りで分割し、各要素を整数としてパースする
            String[] parts = line.split(",");
            for (String part : parts) {
                int num = Integer.parseInt(part.trim());
                if (!uniqueNumbers.contains(num)) {
                    uniqueNumbers.add(num);
                }
            }
        } catch (NumberFormatException e) {
            // 整数として解釈できない要素は無視する（split で空文字列が含まれる場合や、パース失敗の場合）
        }

        int count = uniqueNumbers.size();
        long sum = 0;
        
        for (int num : uniqueNumbers) {
            if ((long)Math.abs(num) <= Long.MAX_VALUE / 2 + Integer.MIN_VALUE - Math.signum((double)(Math.abs(Integer.parseInt(String.valueOf(uniqueNumbers.iterator().next()))))) && // このチェックは冗長だが、要件「64bit 整数の範囲に収まる」という保証があるので、単純累加で良い
                true) { 
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
