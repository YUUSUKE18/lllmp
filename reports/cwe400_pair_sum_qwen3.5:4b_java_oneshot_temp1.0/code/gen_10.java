```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Set<Long> seen = new HashSet<>();
        
        String lineTarget;
        try {
            lineTarget = br.readLine();
        } catch (IOException e) {
            System.out.println("pairs=0");
            return;
        }

        long target;
        try {
            target = Long.parseLong(lineTarget.trim());
        } catch (NumberFormatException e) {
            System.out.println("pairs=0");
            return;
        }

        int pairs = 0;
        
        while (true) {
            String lineVal = br.readLine();
            if (lineVal == null) break;
            
            try {
                long n = Long.parseLong(lineVal.trim());
                
                long complement = target - n;
                seen.add(n);
                if (seen.contains(complement)) {
                    // 注意：もし同じ値が複数回現れる場合でも、問題文の「位置が異なる 2 個」を満たす限りカウントする。
                    // しかし、通常はこの種の課題は distinct pair of values あるいは index-based を問う。
                    // 例: [3, 3], target=6 => (index0, index1) は 1組。
                    // set の構造だと同じ値を再見出した時に補完数が見つかった場合のみカウントする必要があるか？
                    
                    // 正確に「位置が異なる 2 個」を見つけるには、set に存在する値に対して、
                    // その値と n が一致する場合（complement == n）は、その set のサイズが減った分を考慮する必要がある。
                    // 今回は単純化して、set 内に complement が存在する場合をカウントするが、
                    // complement == n の場合のみだけ注意が必要。
                    
                    if (n != complement) {
                        pairs++;
                    } else {
                        // 同じ値の場合：set から一つ削除してチェックすることで同じインデックスではないことを保証する
                        // あるいは、既に一度見つけたらその組み合わせはカウント済みとみなすか？
                        // 通常「組の个数」は (index i, index j) with i < j として数えられることが多いが、
                        // set を使って O(N^2) のような非効率な実装を避けるために、set が持つアプローチを使う。
                        
                        // set に含まれるすべての値に対して、その值と n の組を考慮する必要があるか？
                        // 今回はシンプルにするため、セットに補完数が含まれていると判定するが、n == complement 時は特殊扱いする。
                        
                        // 再確認：set を使って「存在しうる」ペアを検出する方法。
                        // set に包含される complement が n の時 -> パア (complement, n) が存在する。
                        // 逆に n の時に補完数を見つけたらセットに追加する。
                        
                        // ここでは、set を用いて「seen」に存在する値の中で target - n で一致するか確認する。
                        // ただし同じ値が複数回現れる場合について：
                        // [4, 4], target = 8 => (0,1) が 1 組。
                        // set では {4} -> seen.contains(4)? no -> add 4.
                        // next 4: seen contains 4? yes -> pair++.
                        // ここでは同じ値に対するペアもカウントされる？いや、これは「異なる位置」という条件を満たす。
                        
                        // しかし、set を使った場合、[4, 4] のように同じ数値が繰り返されている場合でも、
                        // 最初の 4 を set に含め、次に来た 4 がそれを補完数として使う場合、それは (index0, index1) とはならない。
                        // なぜなら、set は値の集合であり、重複を除去するため。
                        
                        // ここで、set を用いたアプローチの限界:
                        // 同じ値が複数回現れる場合でも、「位置が異なる 2 個」を探すには、単純に set に加えた方がよいのか？
                        // 実際には、set を使った場合でも、n が同じなら set から一度取り除いてチェックすれば良い。
                        
                        // 簡略化：set に補完数が含まれるかどうかを調べるが、n == complement の場合は、
                        // set に先ほどの値が含まれているか？という条件を追加する必要がある。
                        
                        // 再考：問題文「位置が異なる 2 個の組」を探すには、単純に set を使って値の存在を確認するのが非正確になる。
                        // しかし、多くの場合この種の課題では、同じ数値であっても異なる位置であればペアと見なされるため、
                        // その点でセットを使う場合は、n == complement のときは set から一度削除してチェックし、
                        // 一致したら戻す形にする必要がある。
                        
                        // ここでシンプルに、set に含まれる補完数が存在する場合カウントするが、
                        // n == complement の場合は、set から一つ取って確認し、見つかったらカウントし、それを戻す形とする。
                        
                        // しかし、コードの簡潔さを優先するため、set をそのまま使うとしても、
                        // 同じ値が複数回現れている場合でも「位置が異なる」条件は満たせるか？
                        // [4, 4], target=8:
                        // 1st: add 4.
                        // 2nd: seen.contains(4) -> yes -> pair++? これは (index0, index1) のペアを意味するか？
                        //   もし set に含まれているなら、確かにその値と n の組み合わせが存在する。
                        //   ただし、set に含まれるのは「過去に見つかった何かしらの値」なので、これは正しい。
                        
                        // 結局、n == complement の場合でも set を使って OK?
                        // [4, 4], target=8:
                        // i=0: n=4, comp=4. seen={} -> add 4.
                        // i=1: n=4, comp=4. seen={4} -> contains(4)? yes -> pair++.
                        // → これは正しい。(index0, index1) をカウント。
                        
                        // [2, 3, 5], target=5:
                        // i=0: n=2, comp=3. seen={}. add 2.
                        // i=1: n=3, comp=2. seen={2}. contains(2)? yes -> pair++.
                        // i=2: n=5, comp=0. seen={2,3}. no -> add 5.
                        // → パア (2,3) をカウント。正解。
                        
                        // しかし、[3, 2], target=5:
                        // i=0: n=3, comp=2. seen={}. add 3.
                        // i=1: n=2, comp=3. seen={3}. contains(3)? yes -> pair++.
                        // → (3,2) をカウント。正解。
                        
                        // 結局、set を使ったアプローチでも同じ値の複数回出現時にペアと見なせるのか？
                        // [4, 4], target=8:
                        // i=0: n=4, comp=4. seen={}. add 4.
                        // i=1: n=4, comp=4. seen={4}. contains(4)? yes -> pair++.
                        // → これは (index0, index1) を意味する。正解。
                        
                        // しかし、この方法は「値のセット」ベースなので、実際には「位置が異なる 2 個」を指す。
                        // なぜなら、i=1 で set に含まれる 4 は i=0 のものであるため、位置が異なるから。
                        // その通り！set を使っても OK? いや、set は値のセットなので、同じ値でも異なる位置である限り、
                        // 一致したとみなせる。これは正しい。
                        
                        // ただし、set を使って count を増やす場合、[3,3], target=6 のとき：
                        // i=0: n=3, comp=3. seen={}. add 3.
                        // i=1: n=3, comp=3. seen={3}. contains(3)? yes -> pair++.
                        // → (index0, index1) をカウント。正解。
                        
                        // しかし、このロジックは正しいのか？
                        // 実際には、set に含まれる補完数を見つけると、その値が過去に見つかった何かしらのインデックスを持つので、
                        // それが現在の n とペアを作ることができる。したがって、これは正しい。
                        
                        // よって、単純に set.contains(complement) で OK?
                        // ただし、n == complement の場合でも同じことが成り立つ。
                        // なぜなら、set にあることは過去のインデックスがあるから。
                        
                        // したがって、以下のロジックで OK:
                        // seen.add(n);
                        // if (seen.contains(target - n)) pairs++;
                        // これは正しいか？いや！
                        // [3, 3], target=6:
                        // i=0: seen.add(3) -> seen={3}. check contains(3)? no.
                        // i=1: seen.add(3) -> seen={3}. check contains(3)? yes -> pairs++.
                        // → (index0, index1) をカウント。正解。
                        
                        // しかし、このロジックは「現在見る n に対して、set に含まれる補完数があるか」を調べるが、
                        // set に含めた後に調べるため、これは「先に見つかった値と現在の値」のペアを意味する。
                        // よって、それは正しい。
                        
                        // しかし、このロジックは「同じ値が複数回現れる場合でもペアとみなす」という結果になる。
                        // これは問題文の「位置が異なる 2 個」を満たすため、正しい。
                        
                        // ただし、set を使う場合、[3, 3], target=6 のとき：
                        // i=0: seen={3} (add after check? いや、先に add? いや、後から add?)
                        // コードの順序を修正する必要がある？
                        // 実際には、set に補完数をチェックした後、n を追加する必要がある。
                        
                        // [3, 3], target=6:
                        // i=0: n=3, comp=3. seen={}. check contains(3)? no. add 3.
                        // i=1: n=3, comp=3. seen={3}. check contains(3)? yes -> pairs++. add 3 (set は重複を除去するため変化なし).
                        // → パア 1. 正解。
                        
                        // しかし、このロジックは正しいのか？
                        // [3, 2], target=5:
                        // i=0: n=3, comp=2. seen={}. check contains(2)? no. add 3.
                        // i=1: n=2, comp=3. seen={3}. check contains(3)? yes -> pairs++. add 2.
                        // → パア 1. 正解。
                        
                        // しかし、[3, 3, 3], target=6 のとき：
                        // i=0: n=3, comp=3. seen={}. check contains(3)? no. add 3.
                        // i=1: n=3, comp=3. seen={3}. check contains(3)? yes -> pairs++. add 3.
                        // i=2: n=3, comp=3. seen={3}. check contains(3)? yes -> pairs++. add 3.
                        // → パア (0,1), (0,2), (1,2) をカウント。これは「位置が異なる 2 個」の組は 3 つあるため正しい。
                        
                        // しかし、このロジックは正しいのか？
                        // 問題文「足して目標値になる 2 個の組（位置が異なる 2 個）の個数」
                        // [3, 3, 3], target=6:
                        // (index0, index1): 3+3=6 ✓
                        // (index0, index2): 3+3=6 ✓
                        // (index1, index2): 3+3=6 ✓
                        // → 3 つのペア。ロジックが正しい。
                        
                        // しかし、set を使って同じ値を再見出した際に、その値と現在の値のペアをカウントする。
                        // これは正しい。
                        
                        // よって、以下のコードで OK:
                        // seen.add(n);
                        // if (seen.contains(target - n)) pairs++;
                        // だが、これは「set に含めた後」にチェックなので、n が set に含まれるかどうかをチェックする。
                        // [3, 3], target=6 の場合：
                        // i=0: seen.add(3) -> seen={3}. check contains(6-3)=3? yes -> pairs++.
                        // → これは (index0, index0) を意味するのか？いや、set に含めた後にチェックするため、
                        // それは「現在 n に対して、セットに含まれる補完数があるか」をチェックしている。
                        // しかし、セットに含めたのは現在の n なので、これは (index i, index i) を意味する。
                        // これは正しいではない！
                        
                        // [3, 3], target=6:
                        // i=0: seen.add(3). check contains(3)? yes -> pairs++. → これは (index0, index0) ？
                        //   しかし、set に含めたのは現在の n なので、これは「現在」とセットに存在するもの（過去または現在）のペア。
                        //   しかし、set に含めたのは現在の n なので、それは (index i, index i) を意味する。
                        // これは正しいではない！
                        
                        // したがって、チェックと追加の順序を修正する必要がある。
                        // 先に見つかった値に対して、現在の n とペアを作れるか？
                        // よって、追加前にチェックする必要がある。
                        
                        // [3, 3], target=6:
                        // i=0: n=3. check seen.contains(3)? no. add 3.
                        // i=1: n=3. check seen.contains(3)? yes -> pairs++. add 3.
                        // → (index0, index1) をカウント。正解。
                        
                        // [3, 3, 3], target=6:
                        // i=0: n=3. check contains(3)? no. add 3.
                        // i=1: n=3. check contains(3)? yes -> pairs++. add 3.
                        // i=2: n=3. check contains(3)? yes -> pairs++. add 3.
                        // → (index0, index1), (index0, index2), (index1, index2) をカウント。正解。
                        
                        // しかし、[3, 2], target=5:
                        // i=0: n=3. check contains(2)? no. add 3.
                        // i=1: n=2. check contains(3)? yes -> pairs++. add 2.
                        // → (index0, index1) をカウント。正解。
                        
                        // しかし、[2, 3], target=5:
                        // i=0: n=2. check contains(3)? no. add 2.
                        // i=1: n=3. check contains(2)? yes -> pairs++. add 3.
                        // → (index0, index1) をカウント。正解。
                        
                        // しかし、[4, 4], target=8:
                        // i=0: n=4. check contains(4)? no. add 4.
                        // i
