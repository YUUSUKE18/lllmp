import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        // 有効な整数を収集する List（重複を含む）を作る
        Set<Integer> distinctNumbers = new HashSet<>();
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int num = Integer.parseInt(token.trim());
                if (!distinctNumbers.add(num)) { // set に追加しなかった場合のみ（既に存在する場合）処理をしないが、ここでは単純に集計用リストを作るより直接 Count/Sum を計算する必要があるため少し方針を変更。
                    // 上記のロジックは「重複を除いた整数」について個数と合計を求めるという要件を満たすために適さない可能性があるため再考。
                    // 要件：『重複を除いた整数』について、個数（その一意な値が何回出現するかではなく、唯一となる要素の数？）と合計を求めます。
                    // これは少し曖昧です。「重複を除いた」の意味として「ユニークな値の集合」と解釈すると、「個数はユニークな値の数」、"sum はそれらの和" となります。
                    // または「入力列に含まれる整数のうち、その数が複数あるものを一つに統合し（デュープリケーションを除外して）、その一意の値について出現回数を数える」のか？
                    // 通常、「重複を除いた」という表現は Set に相当する処理を指します。
                    // その場合「個数」＝ユニークな数の数、"sum" ＝それらの和となります。
                    break; 
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視
            }
        }

        long count = distinctNumbers.size();
        long sum = 0L;
        
        for (Integer num : distinctNumbers) {
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
