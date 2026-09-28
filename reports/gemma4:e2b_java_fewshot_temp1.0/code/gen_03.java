import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();

        if (line == null) {
            System.out.println("count=0 sum=0");
            return;
        }

        String[] parts = line.split(",");
        Set<Integer> distinctNumbers = new HashSet<>();
        long sum = 0;

        for (String part : parts) {
            // 空文字や前後の空白を除去して整数に変換を試みる
            String trimmedPart = part.trim();
            if (!trimmedPart.isEmpty()) {
                try {
                    int number = Integer.parseInt(trimmedPart);
                    distinctNumbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }

        long count = distinctNumbers.size();
        for (int num : distinctNumbers) {
            sum += num;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
