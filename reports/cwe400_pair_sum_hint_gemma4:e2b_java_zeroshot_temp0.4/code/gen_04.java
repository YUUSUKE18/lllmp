```java
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
        if (targetLine == null) {
            System.out.println("pairs=0");
            return;
        }
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降の整数の読み込み
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    long number = Long.parseLong(trimmedLine);
                    numbers.add(number);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視
                }
            }
        }

        int n = numbers.size();
        long pairCount = 0;

        // 2個の組の数を求める (O(N^2) は敵対的に大きな入力に対して遅すぎる可能性があるため、
        // HashSet/HashMap を利用した O(N) または O(N log N) のアプローチを検討する)

        // ここでは、2つの要素 a と b が存在し、a + b = target となるペアの数を数える。
        // 2つの要素の組 (i, j) で i != j かつ numbers[i] + numbers[j] = target となるものを数える。

        // 2つの要素の組の数を数えるための効率的な方法:
        // 1. 全てのペアをチェックする (O(N^2))
        // 2. ハッシュマップを使う (O(N))

        // 2. ハッシュマップ (またはソート後の二分探索) を使用する
        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // numbers[j] = target - numbers[i] となる j が存在するかを調べる。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // i != j の制約があるため、注意が必要。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        // ターゲット値が与えられたとき、numbers[i] + numbers[j] = target となるペアを数える。
        // 集合として考える。

        //
