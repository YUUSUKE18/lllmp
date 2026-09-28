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

        // カンマで分割して整数を抽出する
        String[] parts = line.split(",");
        Set<Integer> distinctNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            String trimmedPart = part.trim();
            if (trimmedPart.isEmpty()) continue;

            try {
                int number = Integer.parseInt(trimmedPart);
                distinctNumbers.add(number);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 重複を除いた個数と合計を計算する
        int count = distinctNumbers.size();
        for (int num : distinctNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
