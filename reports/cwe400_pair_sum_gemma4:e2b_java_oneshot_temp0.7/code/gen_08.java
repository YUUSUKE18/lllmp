import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1行目を読み込み、目標値を設定
        String targetLine = br.readLine();
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());
        
        List<Long> numbers = new ArrayList<>();
        
        // 2行目以降を読み込み、整数を収集
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 1行に複数の整数が入っている場合も想定し、スペースで分割して処理
                    String[] parts = trimmedLine.split("\\s+");
                    for (String part : parts) {
                        try {
                            numbers.add(Long.parseLong(part));
                        } catch (NumberFormatException e) {
                            // 整数として解釈できない部分は無視
                        }
                    }
                } catch (Exception e) {
                    // その他の予期せぬエラーは無視
                }
            }
        }

        // 2個の組の数を計算
        long count = 0;
        int n = numbers.size();
        
        // 2個の組 (a, b) が target になる条件は a + b = target であり、a != b である。
        // 実際には、リスト内の要素のうち、2つを選んで合計が target になるペアの数を数える。
        // 問題文の解釈として「リスト内の2つの異なる要素を選んで足したものが目標値になるペアの個数」と解釈します。
        
        // 2つの異なる要素 (numbers[i], numbers[j]) について numbers[i] + numbers[j] = target となるペアを数える。
        // i != j のペアを数える。
        
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
