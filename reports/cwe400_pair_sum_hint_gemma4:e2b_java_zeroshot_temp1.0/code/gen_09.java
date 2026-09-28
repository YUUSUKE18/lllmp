import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            // 入力が空の場合は終了
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 整数として解釈できるか試みる
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                }
            }
        }

        // 2個の組の数を数える
        int count = 0;
        int n = numbers.size();

        // O(N^2) で全てのペアをチェックする（Nは入力された整数の数。制約により実用的であると仮定）
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
