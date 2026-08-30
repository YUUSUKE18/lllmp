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
        
        // 2行目以降を読み込み、整数を収集
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            // 空行は無視
            if (nextLine.trim().isEmpty()) {
                continue;
            }
            try {
                // 整数として解釈を試みる
                long num = Long.parseLong(nextLine.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        // 2個の組の数を計算
        long count = 0;
        int n = numbers.size();
        
        if (n >= 2) {
            // O(N^2)で全ペアをチェックする（Nが実用的な範囲内であれば許容される）
            // 問題の制約が不明確ですが、一般的な競プロの制約を考慮し、N^2で解くことを試みます。
            // もしNが非常に大きい場合（例: 10^6以上）、より効率的なソートベースのO(N log N)やハッシュマップベースのO(N)が必要になります。
            // ここでは、与えられた入力の構造（2行目以降に1行1個）から、入力サイズが許容範囲内であると仮定し、単純なチェックを行います。
            
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (numbers.get(i) + numbers.get(j) == target) {
                        count++;
                    }
                }
            }
        }
        
        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
