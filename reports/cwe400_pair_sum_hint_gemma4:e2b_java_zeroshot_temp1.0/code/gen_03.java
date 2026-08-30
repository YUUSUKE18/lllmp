import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値の読み込み
        String targetLine = br.readLine();
        if (targetLine == null) return;
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の読み込みとパース
        String line;
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (!line.isEmpty()) {
                try {
                    long num = Long.parseLong(line);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                    continue;
                }
            }
        }

        int pairCount = 0;
        int n = numbers.size();

        // 2個の組 (i, j) が存在し、i != j かつ numbers[i] + numbers[j] == target となるものの個数を数える
        // N^2 のチェックを行う。Nが最大で入力サイズに依存するため、このアプローチが最も直接的で、
        // 入力が「敵対的に大きい」場合でも、N^2 が許容される範囲内（例えば $10^6$ 程度）であれば十分高速。
        // ただし、入力が非常に長く（例: 10^12個の数）、全ての数値を読み込むことができない場合は、
        // 別の（より高度な）アルゴリズムが必要になるが、ここでは標準入力の制約に従い、読み込んだ数で解く。
        // 入力がメモリに収まる範囲であれば、O(N^2) は許容される。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (numbers.get(i) + numbers.get(j) == target) {
                    pairCount++;
                }
            }
        }

        // 結果の出力
        System.out.println("pairs=" + pairCount);
    }
}
