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
        
        // 2行目以降を読み込み、整数を格納
        String nextLine;
        while ((nextLine = br.readLine()) != null) {
            String trimmedLine = nextLine.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 1行に複数の整数が並ぶ可能性があるため、スペースで分割して読み込む
                    String[] parts = trimmedLine.split("\\s+");
                    for (String part : parts) {
                        if (!part.isEmpty()) {
                            numbers.add(Long.parseLong(part));
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                }
            }
        }

        // 読み込んだ整数の中から、足して目標値になる2つの組の数を数える
        long count = 0;
        int n = numbers.size();
        
        // 2つの要素の和が目標値になるペアを探す (O(N^2)で十分だが、より効率的にO(N)またはO(N log N)を目指す)
        // ここでは、2つの要素 a と b が a + b = target となるペアを数える。
        // numbersリストは、入力された全ての整数を順番に格納している。
        
        // 2つの要素 a[i] と a[j] (i != j) について a[i] + a[j] = target となるペアを数える。
        // 効率のため、ハッシュマップ（またはソート）を使用する。
        
        // 今回の課題の解釈：「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数を求めます。」
        // これは、リスト内の任意の2つの要素 (numbers[i], numbers[j]) について i != j かつ numbers[i] + numbers[j] = target となるペアの数を求めることを意味する。
        
        // 集合として扱うため、出現回数を数える。
        // N^2のチェック（O(N^2)）
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
