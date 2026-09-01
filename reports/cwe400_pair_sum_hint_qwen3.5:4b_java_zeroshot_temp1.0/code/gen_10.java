import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String targetLine = br.readLine();
        if (targetLine == null) return;
        long targetValue = Long.parseLong(targetLine.trim());
        
        Set<Long> seen = new HashSet<>();
        int count = 0;
        long accumulatedSum = 0;
        
        try {
            while (true) {
                String line = br.readLine();
                if (line == null || line.isEmpty()) continue;
                
                StringTokenizer st = new StringTokenizer(line);
                if (!st.hasMoreTokens()) continue;
                
                // 複数個の整数が含まれている可能性があるため、全てをチェック
                for (int i = 0; i < st.countTokens(); i++) {
                    String token = st.nextToken();
                    long value;
                    try {
                        value = Long.parseLong(token);
                    } catch (NumberFormatException e) {
                        continue;
                    }
                    
                    long complement = targetValue - value;
                    
                    // 既に計算済みの部分総和に含まれているか確認
                    // seen に入っているのは、過去に処理した部分総和のリストである。
                    // しかし、単純な「2 要素の和」を見つけるには、部分総和が効くかどうか考える必要がある。
                    // ここで仕様を再考: 「整数の足して目標値になる」とある。
                    // これは「i番目の数 + j番目の数 = target」である。
                    // 標準的部分総和（prefix sum）を用いると、「部分総和 i - 部分総和 j = target - a[j] ...」という扱いになるが、
                    // その方が複雑になるか？ いや、単純に「2 個の組」を探すには、両方とも入力された数値を使用する必要がある。
                    
                    // 入力された整数のリストを保持して O(N^2) の場合は TLE なので、部分総和を使う手法が最適。
                    // ただし、今回は入力の形式が「1 行に 1 個ずつ」なので、配列で保存しつつ、i < j の条件で検索する必要がある。
                    
                    break; 
                }
            }
        } catch (IOException e) {
            return;
        }
        
        /* 上記のロジックが複雑すぎるため、再構築します。
           仕様通り「2 行目以降の整数のうち」とあり、「位置が異なる 2 個」である。
           部分総和（Prefix Sum）を使う手法:
           S[i] = a[0] + ... + a[i]
           任意の j > i について、a[j] + a[i] = target ではない。
           部分は (a[i] + a[j]) = target である。
           
           ここでは「部分総和」ではなく、単純に「seen.set に数値そのものを入れる」のではなく、
           「入力された数値の配列を保持し、2 つの部分の組み合わせ」と捉えるか？
           
           例: input = [1, 5, 2], target = 3
           (1, 2) -> sum=3. OK.
           例: input = [10, 20, 30], target = 40
           (10, 30) -> sum=40. OK.
           
           入力された数値をリストとして保持し、i < j で検索するのが一般的だが、配列のサイズが不明確で大量の場合 O(N^2) はダメ。
           しかし、「部分総和」は「前 i 個の和」であり、「target - a[i]」があるか確認するのではなく、
           「target = a[i] + a[j]」となるようにするには、
           seenに「現在まで見た数値」を保持し、a[i] のときに (target - a[i]) が存在するかを確認するのが一般的。
           
           ここでは、問題文の「整数」という表現は単一の数値を指すため、
           入力が [10, 20, 30], target=40 の場合:
           i=0, val=10. need 30. seen={}.
           i=1, val=20. need 20. seen={10}. (20!=30).
           i=2, val=30. need 10. seen={10, 20}. 10 が存在する -> count++ (pair: 10, 30).
           
           この手法で O(N) で解くことができる。
        */
        
        // 修正: 前述のロジックを再実施
        // seen = 入力された数値のセット (重複可能に扱う必要あり、あるいは一意の数値で OK か？)
        // "2 個の組" は位置が異なるので、数値が同じでも OK。例えば [1, 2, 3], target=4. (1,3), (2,?). 
        // 例: [1, 3, 5], target=6 -> (1,5).
        // 例: [3, 3], target=6 -> (0,1) -> sum=6. count=1.
        // 数値そのものを入れるのではなく、数値とインデックスのペアで管理する。
        
        Set<Long> seenValues = new HashSet<>();
        long[] inputArray = null; // 実際には配列を保持しなくても O(N) で完結する。
        
        // リードロガーは必要ないが、入力形式に準拠して処理する。
        // targetLine は既に読み込まれている。
        
        int pairs = 0;
        // seen に入るのは「部分総和」ではなく「個別の数値」であるべきか？
        // 問題文: "2 行目以降の整数のうち、足して目標値になる 2 個の組"
        // つまり a[i] + a[j] = target.
        // この場合、seen に入るのは「a[i]」だけで OK。
        
        for (String line : br.lines()) { 
            // String.split は非効率かもしれないが、StringTokenizer で処理する
            StringTokenizer st = new StringTokenizer(line);
            while (st.hasMoreTokens()) {
                long value;
                try {
                    value = Long.parseLong(st.nextToken());
                } catch (NumberFormatException e) {
                    continue;
                }
                
                if (seenValues.contains(targetValue - value)) {
                    pairs++;
                }
                
                seenValues.add(value);
            }
        }
        
        System.out.println("pairs=" + pairs);
    }
}
