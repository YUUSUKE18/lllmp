import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を目標値として読み込む
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            // 目標値が読み込めない場合は終了
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            try {
                String trimmedLine = nextLine.trim();
                if (!trimmedLine.isEmpty()) {
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
                continue;
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組の個数を求める
        // O(N^2) の全探索で十分。Nが実用的な範囲内であれば十分高速。
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
