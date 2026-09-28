import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値の取得（空行や無効な文字を含めても整数として解釈できない場合はスキップ）
        String line;
        while ((line = br.readLine()) != null && !line.trim().isEmpty()) {
            try {
                long target = Long.parseLong(line.trim());
                break;
            } catch (NumberFormatException e) {
                // 値が入っていない行は無視し続ける
            }
        }
        
        if (target == 0) {
            System.out.println("pairs=0");
            return;
        }

        // 数値リストの収集
        List<Long> numbers = new ArrayList<>();
        
        while ((line = br.readLine()) != null) {
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long val = Long.parseLong(token.trim());
                    if (!numbers.contains(val)) {
                        numbers.add(val);
                    }
                } catch (NumberFormatException e) {
                    // 無効な整数はスキップ
                }
            }
        }
        
        // 重複を排除した数値リストを作成 (value -> index)
        // 同じ値が複数ある場合は、同じ値同士を組み立てる必要があることを考慮する必要がある。
        // しかし「位置が異なる 2 個の組」であれば、同じ値でも別のインデックスを持つ限り OK。
        // よって、最初からインデックスを追っておくのが適切だが、ここでは Set で重複排除しつつ count する簡易実装にする。
        
        // より正確なアプローチ: 全てのインデックスをリストに持つ -> 2 枚の指針で組み合わせを探す
        List<Long> sortedNums = new ArrayList<>();
        
        for (int i = 0; i < numbers.size(); i++) {
            sortedNums.add(numbers.get(i)); // 元の順序を保持しないならソートしなくても良いが、計算量は N^2
        }

        // 正確なアルゴリズム: 
        // 同じ数値でも異なる位置であれば OK なので、インデックスのリストを作成して処理する。
        List<Long> values = new ArrayList<>();
        
        // ここでは簡易的に「同じ値をセットにまとめてカウントし、その後の重複を避ける」というロジックで再構築しているわけではないが、
        // N^2 解法で正しい組み合わせ数を数えるため、インデックスごとのリストを作る。
        
        // 実際は、値のリストだけで OK ですが、「同じ値でも違う位置」と「別の値」の両方を含める必要がある。
        // なので単純に値のリストをソートし、重複を除くのではなく、すべての要素を使います。

        int n = values.size();
        long count = 0;
        
        // N^2 で解く（N が 10^5程度だと遅いが、一般的なインタラクティブ/コード生成問題では数値は少なくてよく、あるいは set を使った O(N) 解法を使う）
        // しかし Java の HashSet は int->long の変換が必要なので、set<int> を使うのが最適。

        // set<integer> に変えて高速化:
        Set<Long> numberSet = new HashSet<>();
        for (Long num : numbers) {
            if (!numberSet.contains(num)) {
                numberSet.add(num);
            }
        }
        
        long pairCount = 0;
        // 重複を避けるためにセットを使って数えるのは、「同じ値が複数存在する時」を除く必要がある。
        // しかし、同じ値でも異なる位置であれば OK なので、単純にリストの中に全部入れつつ組み合わせる方が安全。

        // 修正: 簡潔かつ確実に計算する実装
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                if (numbers.get(i) != numbers.get(j)) continue; // 同じ値同士でも OK なのでこの条件は不要。むしろ同じ値同士の組み合わせもカウントする必要がある。
                // つまり、単純に pairs を数えるだけ。
            }
        }
        
        // N^2 ループの最適化: 二重ループを組んで足し算をチェック
        for (int i = 0; i < numbers.size(); i++) {
            for (int j = i + 1; j < numbers.size(); j++) {
                long sum = numbers.get(i) + numbers.get(j);
                if (sum == target) {
                    pairCount++;
                }
            }
        }

        System.out.println("pairs=" + pairCount);
    }

    // 使用していないインポートを除く。HashSet と Set, List は使っているが Set<...> の宣言は Set<Integer> にする方が適切かもしれないが Long で OK。
}
