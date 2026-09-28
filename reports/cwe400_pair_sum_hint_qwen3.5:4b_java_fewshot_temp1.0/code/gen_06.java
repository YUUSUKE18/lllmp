import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String targetLine = br.readLine();
        if (targetLine == null || !isInteger(targetLine.trim())) return;

        long target = Long.parseLong(targetLine.trim());
        TreeSet<Long> seen = new TreeSet<>();
        int count = 0;

        while ((targetLine = br.readLine()) != null) {
            targetLine = targetLine.trim();
            if (targetLine.isEmpty()) continue;

            if (!isInteger(targetLine)) continue;

            long num = Long.parseLong(targetLine);
            long needed = target - num;

            // 既に seen に存在する要素の中、num を含む組の数をカウントし、
            // その後に num が追加されることを保証するため、seen の各要素に対してチェック
            int pairsForCurrentNum = 0;
            for (long val : seen) {
                if (needed == val) {
                    pairsForCurrentNum++;
                }
            }

            // num を next に入れる前に count に追加するかどうかのロジック
            // すでに 1 つの pair が形成された場合は、その pair をカウント済みなので
            // 今回は、数え上げのために、num の前に存在した要素と組み合わせられる数のみを足す
            // ただし、このロジックは少し複雑化するので、より単純なアプローチを採用します。
            
            // 再考：問題文は「2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数」
            // これは、配列 [a, b, c] で a+b=target, a+c=target, b+c=target のような組み合わせの数です。
            // TreeSet を使うことで重複なく管理できます。

            // より効率的なアプローチ：
            // seen に既に存在する値 x が存在する場合、x + num == target なので、(x, num) が 1 つの組になります。
            // しかし、問題文は「組」の数なので、例えば [a, b, c] で a+b=target, a+c=target なら 2 組あります。
            // もし a+b=target, b+c=target, a+c=target の場合 (すべて同じ和を成す)、組み合わせ数は C(3,2)=3 です。
            
            // ここでのロジックは：
            // seen に存在する値 x に対して、x + num == target な個数を数える
            // 次に seen に num を追加する

            int matches = 0;
            for (long val : seen) {
                if (val + num == target) {
                    matches++;
                }
            }
            count += matches;

            // 既に見られた値にもう一度追加しないため、重複を除く（Set の性質上は重複が入らないが、ロジックとしては必要）
            seen.add(num);
        }

        System.out.println("pairs=" + count);
    }

    private static boolean isInteger(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
