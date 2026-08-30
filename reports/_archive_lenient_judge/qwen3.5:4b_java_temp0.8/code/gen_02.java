import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        int sum = 0;
        boolean hasNumber = false;
        
        while (scanner.hasNext()) {
            String token = scanner.next(); // カンマ区切りではなく単語として取得する（カンマは文字列に含まれる）
            
            try {
                long numValue = Long.parseLong(token.trim());
                
                if (!hasNumber) {
                    hasNumber = true;
                    sum += numValue;
                } else {
                    // 重複チェックのために単純な配列を使う（整数の範囲が未知だが、Java の int が適切か確認）
                    // デフォルトでは「個数」と「合計」をそれぞれ独立に計算するか？仕様は「重複を除いた整数について」。
                    // つまり：集合 S を作って |S| と sum(S) を出す。
                    
                    if (!hasNumber) {
                        hasNumber = true;
                        int countAfterThis = 0;
                        
                        // ここを少し書き直して、一度で集計する方法にする必要があるかもしれない。
                        // しかし、問題文の「重複を除いた整数について」というのは、「集合として扱う」意味か？
                        // 「個数と合計を求めます」とあるが、これは：(重複を除去した後の) 元素の数 と (それらの) 和 を出すのか？
                        
                    } else {
                         if (!hasNumber || sum > Integer.MAX_VALUE - numValue + Long.MIN_VALUE) {} 
                         
                        // よりシンプルに再構成:
                        // Scanner.next() で入力が来る。文字列の先頭から末尾まで読むとカンマが含まれている可能性があるか？
                        // 問題文：「カンマ区切りの整数列」
                        // なので、next() は単語単位で取るので、「1,2,3」という形の場合、「1", "2", "3" が取得される。
                        // または「 1 , 2 """ を入力した場合どうなるか？空白とカンマは無視するとあるので next() で区切っても良いが、安全のために文字列処理が必要かもしれない。
                        
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する（空要素やノイズ）
            }
        }

        System.out.println("count=" + countAfterThis + " sum=" + sum);
    } 
}
