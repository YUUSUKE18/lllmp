import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String line = br.readLine();
        if (line == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(line.trim());
        
        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込む
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(trimmedLine);
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        int count = 0;
        int n = numbers.size();
        
        // 2個の組の数を数える (O(N^2)だが、制約が不明なため、ここでは単純な全探索で対応する)
        // 実際には、2つの要素 a_i と a_j が a_i + a_j = target となるペアを数える必要がある。
        // 課題の解釈：「2個の組（位置が異なる 2 個）の個数」
        // これは、リスト内の2つの要素 a_i と a_j (i != j) について a_i + a_j = target となるペアの数を求めることを意味する。
        
        // 2つの要素 a_i と a_j (i != j) について a_i + a_j = target となるペアを数える。
        // 効率的に数えるため、ハッシュマップまたはソートを利用する。
        
        // ここでは、リスト内の要素のペア (i, j) で i != j かつ numbers[i] + numbers[j] == target となるものを数える。
        // 課題の文脈から、これは「2つの異なるインデックスを持つ要素の和が目標値になるペアの数」を意味すると解釈する。
        
        // O(N^2) の全探索で解く (Nが大きすぎないことを前提とする)
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
