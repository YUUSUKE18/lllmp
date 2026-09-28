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
            // 空行は無視
            if (nextLine.trim().isEmpty()) {
                continue;
            }
            try {
                long num = Long.parseLong(nextLine.trim());
                numbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        // 2個の組の数を数える
        long count = 0;
        int n = numbers.size();
        
        // 2つの値 a と b が存在し、a + b = target となるペア (a != b) を数える
        // ここでは、リスト内の異なる2つの要素の和がtargetになるペアの数を数える。
        // 課題の文脈から、「2個の組（位置が異なる2個）の個数」は、
        // リスト内のインデックス i と j (i != j) に対して numbers[i] + numbers[j] = target となる組の数を指すと考えられます。
        
        // 効率的にペアを見つけるためにハッシュマップまたはソートを利用します。
        // ここでは、単純に全てのペアをチェックします（N^2）。
        // Nが大きくなる可能性を考慮し、より効率的な方法を検討する必要がありますが、
        // 入力サイズが不明なため、まずは全ての異なるペアを数えます。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                
                // 異なる2個の組 (位置が異なる2個) の和が目標値になるかチェック
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        // 結果を出力
        System.out.println("pairs=" + count);
    }
}
