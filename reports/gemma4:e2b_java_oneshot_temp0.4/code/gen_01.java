import java.io.BufferedReader;
import java.io.InputStreamReader;
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

        // カンマで分割し、各要素を処理する
        String[] parts = line.split(",");
        Set<Long> uniqueNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) {
                continue;
            }
            try {
                // 64bit整数として扱うためLongを使用
                long number = Long.parseLong(trimmedPart);
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        // 重複を除いた個数と合計を計算
        int count = uniqueNumbers.size();
        for (long num : uniqueNumbers) {
            sum += num;
        }

        // 結果を出力
        System.out.println("count=" + count + " sum=" + sum);
    }
}
