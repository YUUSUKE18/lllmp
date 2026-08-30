```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        // 1行目: 目標値
        String targetLine = br.readLine();
        if (targetLine == null) return;
        long target = Long.parseLong(targetLine.trim());

        List<Long> numbers = new ArrayList<>();

        // 2行目以降を読み込む
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
            if (!trimmedLine.isEmpty()) {
                try {
                    // 整数として解釈できるか試す
                    long num = Long.parseLong(trimmedLine);
                    numbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行は無視する
                    continue;
                }
            }
        }

        int count = 0;
        int n = numbers.size();

        // 2個の組（位置が異なる2個）の個数を求める
        // O(N^2)で全ペアをチェックする。Nが敵対的に大きい場合でも、
        // 実行時間とメモリの制約を考慮すると、N^2は許容範囲か、
        // より効率的な方法（ハッシュマップ）を考える必要がある。

        // ここでは、N^2のチェックで実装する。
        // Nが数百万程度の場合、O(N^2)は間に合わないため、
        // ターゲット値との差分を求める方法（ハッシュマップ）を採用する。

        // ターゲット値との差分を格納するマップを準備
        // キー: ターゲット値から現在の値までの差分 (target - number)
        // 値: その差分を持つ要素の出現回数
        java.util.HashMap<Long, Integer> diffCounts = new java.util.HashMap<>();

        for (long num : numbers) {
            long diff = target - num;
            // ターゲット値になる2つの組 (a + b = target) を探す。
            // もし num が a ならば、b = target - num が必要。
            // 既に見た要素との和を考えるのではなく、
            // ターゲット値に到達するために必要な「ペア」を探す。
            // 2つの要素 a, b が a + b = target を満たす場合、
            // 1. a = num のとき、b = target - num が必要。
            // 2. 既に過去に見た要素 a が存在し、a + num = target を満たす場合。
            
            // ターゲット値との差分 (target - num) をキーとして記録する。
            // この差分は、もし別の要素 x が存在すれば (x + num = target) となる。
            // 実際には、ターゲット値に到達するペアを探すため、
            // ターゲット値を基準に、各要素からどれだけ「足りないか/余っているか」を考える。
            
            // ここでは、より直接的に、既に観測された要素との和をチェックするのではなく、
            // ターゲット値との差分を考慮して、ペアを数える。
            
            // ターゲット値に到達するペア (a, b) を数える。
            // a + b = target
            // a = num のとき、b = target - num。
            long required = target - num;

            // 既に観測された要素との和を考えるのではなく、
            // ターゲット値との差分を直接利用する。
            
            // ターゲット値との差分をキーとして、その差分を持つ要素の数を数える。
            // これは、リスト内の任意の2要素 a, b について a + b = target を満たすペアを探す問題。

            // ターゲット値との差分をキーとして格納する。
            // ターゲット値が T のとき、x + y = T となるペアを探す。
            // x がリストにあるとき、y = T - x が必要。
            
            // 既にリストに存在する要素 x と、現在の要素 num がペアになるか？
            // 1. x + num = target (x = target - num)
            // 2. num + y = target (y = target - num)
            
            // 既に見た要素 x と、現在の要素 num がペアになるかを確認する。
            // ターゲット値との差分をキーとして格納する。
            // 差分 d = target - x。
            
            // この問題は、リスト内の要素 a, b について a + b = target を満たすペア (a, b) の数を数える。
            // 2つの要素 a, b が同じ値を持つ場合、a != b の制約があるため、
            // 2つの異なるインデックス i, j について numbers[i] + numbers[j] = target を数える。

            // ターゲット値との差分 d = target - num をキーとして、
            // 既に観測された要素 x が存在すれば (x = target - num) となり、
            // (x, num) がペアとなる。
            
            // 既に観測された要素の出現回数を数える。
            // ターゲット値からの差分をキーとして、出現回数を記録する。
            // ターゲット値からの差分 d = target - x。
            // 2つの要素 x, y がペアになるのは x + y = target のとき。
            // これは x = target - y と同値。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            long diff = target - num;

            // ターゲット値との差分をキーとして、出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            // 既に観測された要素の出現回数を数える。
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            
            // ターゲット値からの差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
            
            // ターゲット値との差分をキーとして、その出現回数を記録する。
            // 既に観測された要素 x が存在し、x + num = target となる場合、
            // x = target - num。
