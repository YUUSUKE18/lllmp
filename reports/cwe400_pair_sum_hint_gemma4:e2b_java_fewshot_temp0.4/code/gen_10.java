import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line1.trim());

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込み、整数を収集
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                // 複数の整数が1行に並ぶ可能性があるため、スペースで分割して全て処理する
                String[] parts = trimmedLine.split("\\s+");
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        numbers.add(Long.parseLong(part));
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を求める (O(N^2) または O(N log N) で達成可能だが、ここではO(N^2)で実装し、制約を考慮する)
        // 2個の組 (i, j) で numbers[i] + numbers[j] == target となるものを数える。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
