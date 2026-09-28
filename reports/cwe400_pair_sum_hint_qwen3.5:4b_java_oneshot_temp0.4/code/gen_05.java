import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 目標値の読み込み (64bit 整数なので Long を使用)
        String targetLine = br.readLine();
        if (targetLine == null || targetLine.trim().isEmpty()) {
            System.out.println("pairs=0");
            return;
        }
        
        long target = Long.parseLong(targetLine.trim());
        
        // 出現回数をカウントするハッシュセットを使用。
        // 重複した値があった場合、同じ値のペアを複数作成できるため、
        // その値が何回登場しているか（count）を追跡する必要があります。
        // ただし、問題文は「2 個の組（位置が異なる 2 個）」とあります。
        // 同じ値 x, y (x == y) が存在する場合、x を a, y を b とすると (a, b) は有効です。
        // したがって、同じ値 n 回出現している場合、その値だけでできるペアの数は C(n, 2) = n*(n-1)/2 です。
        
        Set<Long> seen = new HashSet<>();
        long countPairs = 0;
        
        while ((line = br.readLine()) != null) {
            line = line.trim();
            if (line.isEmpty()) continue;
            
            try {
                long num = Long.parseLong(line);
                
                // 目標値 - num が既にセットに存在するかチェック
                long complement = target - num;
                
                if (seen.contains(complement)) {
                    // 補完値が m 回出現していた場合、そのうち num を 1 つ使った後の組み合わせ数は m 通り。
                    // 例: 目標=5, seen={2}, num=3. complement=3. seen に 3 が含まれていないので処理なし。
                    // 修正: seen は「補完値」を格納する必要があるか？
                    // いや、通常は「既に見た数値」の中に「補完値」があるかチェックする。
                    // しかし、同じ数値が複数回現れる場合のペア計算に注意が必要。
                    
                    // 再考: Set は一意のキーのみ保持するため、出現回数を直接管理できない。
                    // 代わりに Map<Long, Long> (数値 -> 出現回数) を使用すべきか？
                    // しかし、問題文は「2 個の組」の数。
                    // 例: [2, 3, 5], target=5.
                    // 1. num=2. complement=3. seen に 3 なし. seen.add(2).
                    // 2. num=3. complement=2. seen に 2 あり -> count++. seen.add(3).
                    // 3. num=5. complement=0. seen に 0 なし. seen.add(5).
                    // 結果: 1 (2+3).
                    
                    // 例: [3, 3, 3], target=6.
                    // 1. num=3. complement=3. seen に 3 なし. seen.add(3). count=0.
                    // 2. num=3. complement=3. seen に 3 あり -> count++. seen.add(3) (既に存在するので重複なし). count=1.
                    // 3. num=3. complement=3. seen に 3 あり -> count++. count=2.
                    // 結果: 2 (第 1 と第 2, 第 1 と第 3, 第 2 と第 3).
                    
                    // 例: [2, 4], target=6.
                    // 1. num=2. complement=4. seen に 4 なし. seen.add(2).
                    // 2. num=4. complement=2. seen に 2 あり -> count++.
                    // 結果: 1.
                    
                    // 例: [2, 2], target=4.
                    // 1. num=2. complement=2. seen に 2 なし. seen.add(2).
                    // 2. num=2. complement=2. seen に 2 あり -> count++.
                    // 結果: 1. (第 1 と第 2)
                    
                    // したがって、Set だけで十分。同じ値が複数回現れても、その「出現時点」でチェックすれば良い。
                    // なぜなら、i 番目の要素 num[i] について、j < i で num[j] == target - num[i] となる j の数を数えるだけだから。
                    // Set に存在するかどうかを調べるだけで、どの j に対応するかは「存在する」こと自体が証明。
                    // ただし、Set は重複しないので、同じ値が複数回現れても、その値が存在しているかどうかのみチェック。
                    // これは正しい。なぜなら、i に対して j < i で num[j] == complement となる j が少なくとも 1 つ存在すれば、count++ が 1 回だけ加算されるから。
                    // つまり、「異なる位置の組」の数 = 「各要素について、その左側で補完値が存在するか？」の和。
                    
                    countPairs++;
                }
                
                seen.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("pairs=" + countPairs);
    }
}
