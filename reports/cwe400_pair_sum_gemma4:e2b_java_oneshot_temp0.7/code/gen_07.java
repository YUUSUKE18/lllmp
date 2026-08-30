import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();
        String line;
        
        // 2行目以降の整数を読み込む
        while ((line = br.readLine()) != null) {
            if (line.trim().isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(line.trim()));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の個数を数える (O(N^2) または O(N log N) で達成可能だが、N^2がシンプル)
        // ここでは、2つの要素 a_i と a_j が a_i + a_j = target となる組の数を数える。
        // 2行目以降の整数が1行に1個ずつ並んでいるという記述から、読み込んだリスト全体を使って
        // 任意の2つの要素の和を数える、と解釈する。
        // もし「2行目以降の各行が1つの整数」という意味であれば、リストの要素がそれらになる。
        
        // 読み込んだ全ての整数ペアの和をチェックする (インデックスが異なる2つの組)
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        // 標準出力へ結果を出力
        System.out.println("pairs=" + count);
    }
}
