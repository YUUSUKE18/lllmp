import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        // カンマで分割し、重複を除いた整数を収集する
        Set<Integer> distinctNumbers = new HashSet<>();
        String[] parts = line.split(",");

        for (String part : parts) {
            try {
                // 前後の空白をトリムして整数に変換
                String trimmedPart = part.trim();
                if (!trimmedPart.isEmpty()) {
                    int number = Integer.parseInt(trimmedPart);
                    distinctNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        // 個数と合計を計算する
        int count = distinctNumbers.size();
        long sum = 0;

        for (int num : distinctNumbers) {
            sum += num;
        }

        // 結果を出力する
        System.out.println("count=" + count + " sum=" + sum);
    }
}
