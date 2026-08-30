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
        
        // 2行目以降の読み込み
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            try {
                numbers.add(Long.parseLong(trimmedLine));
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を数える (O(N^2)で十分だが、より効率的にする)
        // 2つの要素 a[i] と a[j] について a[i] + a[j] = target となる組を数える。
        // N^2のチェックは、入力サイズが実用的な範囲であれば許容される。
        // ここでは、各要素に対して、 target - numbers[i] がリスト内に存在するかをチェックする。
        
        // 効率化のため、リストをソートし、二分探索またはハッシュマップを使うのが理想だが、
        // 制約が不明なため、まずは単純な二重ループで実装する。
        // ただし、問題文は「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」なので、
        // 読み込んだ全てのペアを数える。

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long num1 = numbers.get(i);
                long num2 = numbers.get(j);
                if (num1 + num2 == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
