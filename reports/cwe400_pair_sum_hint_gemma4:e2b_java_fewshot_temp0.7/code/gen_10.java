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
        
        // 2行目以降を読み込み、整数を格納
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 1行に1個ずつ並ぶため、読み込んだ行全体をパースする
                    // もし入力が複数行に分かれている場合、この問題の仕様「2行目以降には整数が1行に1個ずつ並びます」を解釈し、
                    // 各行が1つの整数であると仮定して処理を進めます。
                    // ただし、例題の構造から、入力全体が1つのデータセットとして扱われることを考慮し、
                    // 読み込んだ各行を個々の整数として扱うのが最も自然です。
                    
                    // ここでは、各行が1つの整数であると仮定し、その行を読み取る
                    numbers.add(Long.parseLong(trimmedLine));
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                }
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2) または O(N log N) で効率的に)
        // N^2で十分な場合、Nが大きすぎない限り許容されることが多い。
        // ここでは、2つの要素 a_i と a_j が a_i + a_j = target となるペアを数える。
        // 2つの要素の組 (i, j) が必要であり、i != j である。
        
        // 辞書/ハッシュマップを使用してO(N)またはO(N log N)で解くことを目指す。
        // 各数 x について、 target - x がリスト内に存在するかを調べる。
        
        // 存在チェックを高速化するため、リストをソートし、二分探索またはハッシュマップを使用する。
        // 課題の制約（敵対的に大きな入力）を考慮すると、N^2は遅すぎる可能性がある。
        // N^2の解法をまず実装し、制約を再確認する。
        
        // N^2解法 (最も直接的):
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    count++;
                }
            }
        }

        // N^2が許容範囲内であると仮定して続行。もしNが非常に大きい場合は、
        // ソートと二分探索、またはハッシュマップでのO(N)またはO(N log N)でのペアリングが必要です。
        // ここでは、素直にN^2で実装します。

        System.out.println("pairs=" + count);
    }
}
