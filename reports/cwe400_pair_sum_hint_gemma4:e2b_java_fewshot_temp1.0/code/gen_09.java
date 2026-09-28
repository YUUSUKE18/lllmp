import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を取得
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    numbers.add(Long.parseLong(trimmedLine));
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        long count = 0;
        int n = numbers.size();
        
        // 2個の組 (i, j) を探す: numbers[i] + numbers[j] = target (i != j)
        // O(N^2) で探索する（Nが十分に小さいと仮定して、ここでは単純な方法を採用する）
        // より効率的に O(N) で解くためには、ハッシュセットやソートを使うべきだが、
        // N^2が許容範囲内であると仮定して実装する。
        
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
