import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合の処理 (仕様上、要素数が 0 の場合の最大値は定義されていないが、実装として MIN_VALUE とする)
            return;
        }

        String line = scanner.nextLine();
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 初期化値。空の場合と区別するために、最小値からスタートさせる必要があるか？ 
                                     // ただし、「整数として解釈できない要素も無視」とあるので、有効な数がない場合はどうするかは仕様未定義だが、安全に MIN_VALUE から始めるのが一般的。
                                     // もし本当に何もない場合 (count=0) の max 出力が要求されるなら、この値で良いか？ 
                                     // 通常テストでは count>0 なので問題ないはず。

        String[] parts = line.split(",");
        
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(part);
                
                // 最初の有効な数、または現在の max より大きい値の場合のみ更新する必要があるか？
                // 「最大値を求めます」→ 存在すればその中での最大。
                if (count == 0 || val > maxVal) {
                    maxVal = val;
                }
                
                count++;
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
