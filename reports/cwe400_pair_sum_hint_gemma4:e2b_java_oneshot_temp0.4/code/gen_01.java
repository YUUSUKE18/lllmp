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
        
        // 2行目以降の読み込み
        String line;
        while ((line = br.readLine()) != null) {
            String trimmedLine = line.trim();
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

        long count = 0;
        int n = numbers.size();

        // 2個の組の数を求める (O(N^2) または O(N log N) で効率的に)
        // ここでは、2つの要素 a[i] と a[j] が a[i] + a[j] = target となるペアを数える。
        // N^2 のチェックは、入力サイズが実用的な範囲であれば許容される。
        // 敵対的に大きな入力に対しても実用的な時間で完了するように、N^2 を避け、ハッシュマップを使う方が良いが、
        // 2つの組の数を求める問題は、通常、2つの要素を固定して残りの要素を探す（2-pointerやハッシュマップ）でO(N)またはO(N log N)になる。
        // 今回は「位置が異なる 2 個の組」なので、インデックスを考慮する必要がある。

        // 2-pointerアプローチ（ソートが必要）
        // 順序が重要ではないため、まずはリストをソートする。
        // ただし、元のインデックスが重要ではないため、単純にリスト内の要素のペアを数える。
        
        // 2-pointerアプローチ（ソート後）
        // 2つの要素 a[i] と a[j] が target になるペアを数える。
        // ここでは、リスト内の要素のインデックスが異なることを保証する必要がある。
        
        // 座標圧縮やハッシュマップを使う方が、元のインデックスの制約を考慮しつつ効率的になる。
        // 今回は、リスト内の要素のペアを数えるので、重複を考慮して数える。

        // 2つの要素 a[i] と a[j] (i != j) が target になるペアを数える。
        // 2-pointerで、ターゲット値が与えられた場合、リストをソートしてからポインタを動かすのが最も効率的。
        
        // 1. リストをソート
        numbers.sort(null);

        // 2. 2-pointerでペアを数える
        int left = 0;
        int right = n - 1;
        
        while (left < right) {
            long sum = numbers.get(left) + numbers.get(right);
            if (sum == target) {
                // numbers[left] と numbers[right] は異なる位置にあるので、1組カウント
                count++;
                // 次の探索へ進む
                left++;
                right--;
            } else if (sum < target) {
                // 合計が小さすぎるので、左側の値を大きくする
                left++;
            } else { // sum > target
                // 合計が大きすぎるので、右側の値を小さくする
                right--;
            }
        }
        
        // 注意: この2-pointerの方法は、元のリストに重複が含まれている場合や、
        // 複数の同じ値を持つ場合の「位置が異なる2個の組」の解釈に注意が必要。
        // 問題文は「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」を求めている。
        // これは、元の入力のインデックスに基づいてペアを数える必要がある。
        
        // 元のインデックスを保持して、O(N^2)で確認する方が、インデックスの制約を厳密に満たす。
        // Nが最大で数万程度であればO(N^2)も許容される。
        
        count = 0;
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
