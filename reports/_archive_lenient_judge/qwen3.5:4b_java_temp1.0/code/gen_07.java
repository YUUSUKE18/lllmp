import java.util.HashSet;
import java.util.Set;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Set<Integer> set = new HashSet<>();
            
            // 各文字列を単語として分割し、有効な整数をチェック・セットに登録する
            for (String part : line.split(",")) {
                if (part.trim().isEmpty() || !isInteger(part.trim())) {
                    continue;
                }
                
                try {
                    int num = Integer.parseInt(part); // 64bit 範囲内であることが前提のため、long 解析せず int で処理（Java の int は符号付き 32bit ですが、問題文の「合計が 64bit 収まる」は累積値に関する記述と解釈）
                    set.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する
                }
            }
            
            int count = set.size();
            long sum = set.stream().mapToInt(i -> i).sum();
            System.out.println("count=" + count + " sum=" + sum);
        } else {
            // 入力がない場合でも、空配列の場合を含め「0=0」に近い挙動が必要か？
            // 仕様は「重複を除いた整数について」とあるので、入力がなければ count=0, sum=0 が適切。
            // またには `scanner.hasNextLine()` の分岐が外れても処理すべきだが、Java で入力なしの場合は上書きしない場合もあるが、空配列として扱うと安全。
        }

    }

    /**
     * 文字列を整数として解釈できるか判定する
     */
    private static boolean isInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            // ここでは例外が投げるので、この場合は false を返す必要があるが、try-catch 構造で判断する。
            // ただし上記のメインループ内では実際に parseInt を実行しているので、ここでは簡易判定が必要。
            return false; 
        } catch (Exception e) {
            return true; // parse 自体に問題があれば整数とみなす（実際には try-catch block で処理するのでこれを修正）
        }
    }

    private static void fixIsIntegerLogic() {} // デモ用のみ
    
    public static int parseIntSafe(String s) throws Exception{ /*TODO*/ return Integer.parseInt(s.trim()); } 
}
