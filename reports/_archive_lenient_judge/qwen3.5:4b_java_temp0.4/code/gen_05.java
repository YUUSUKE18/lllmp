import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空白を除去し、文字列分割して整数リストを作成
            String cleanedLine = line.replaceAll("\\s+", "");
            String[] parts = cleanedLine.split(",");
            
            BigInteger sum = new BigInteger("0");
            int count = 0;
            
            for (String part : parts) {
                if (!part.isEmpty()) {
                    try {
                        long value = Long.parseLong(part.trim()); // 整数として解析
                        
                        // 重複チェックと合計計算
                        // ただし、仕様は「個数」と「合計」を求めるとあるが、
                        // 「重複を除いた整数について」という条件があるため、
                        // 同じ値の要素をカウントするかどうかを確認する必要があります。
                        
                        // ここでは、「同じ数字だけを集計（count=1, sum=value）」とする解釈で進めます。
                        // あるいは「入力された全ての数」に対して count を累加し、sum を累加するか？
                        // 「重複を除いた整数について」という表現は、一意の値ごとに処理することを意味します。
                        
                        boolean isDuplicate = false;
                        for (int i = parts.length - 1; i >= 0; i--) {
                            String currentPart = parts[i];
                            if (!currentPart.isEmpty() && !isDuplicate) { // 最後にチェックする必要があるため、順序を逆にするかセットを使うのが一般的だが、ここでは単純なループで実装。
                                try {
                                    long val = Long.parseLong(currentPart.trim());
                                    if (val == value) {
                                        isDuplicate = true;
                                        break;
                                    }
                                } catch (NumberFormatException e) {} // 無視する要素は処理しないため、このブロック内では有効な整数のみを扱う。
                            }
                        }
                        
                        // より簡単な実装: Set を使って重複をチェックし、一意の値ごとにカウントと合計を更新
                    } catch (NumberFormatException e) {
                        continue; // 文字列が整数でない場合は無視する
                    }
                }
            }
            
            // 上記の実装は少し複雑になりすぎたため、再考します。
        } else {
            return; 
        }

        /* --- 修正されたロジック --- */
        
        Scanner scanner2 = new Scanner(System.in);
        if (scanner2.hasNextLine()) {
            String line = scanner2.nextLine();
            
            // セットを使って重複を除く（Set は自動的に重複を除去する）
            java.util.Set<Long> uniqueNumbers = new java.util.HashSet<>();
            
            for (String token : line.split(",")) {
                if (!token.trim().isEmpty()) {
                    try {
                        long num = Long.parseLong(token.trim());
                        // 64bit integer の範囲内と仮定し、Set に追加する（重複は自動的に除外される）
                        uniqueNumbers.add(num);
                        
                        BigInteger sumVal = new BigInteger(String.valueOf(num));
                        for (long n : uniqueNumbers) {
                            if (n == num) break; // 一意の値ごとに処理するため、一度だけ加算
                        }
                    } catch (NumberFormatException e) {
                        continue; 
                    }
                }
            }
            
            BigInteger totalSum = new BigInteger("0");
            int count = uniqueNumbers.size();
            
            for (long n : uniqueNumbers) {
                try {
                     // 整数を String に変換して BigInteger を作成し、合計に加算する。
                    // ただし、元の数値が long で扱える範囲内なので直接加算可能だが、BigInteger のため string 経由で安全にする。
                    totalSum = totalSum.add(new BigInteger(String.valueOf(n)));
                } catch (NumberFormatException e) {
                    continue; 
                }
            }
            
            System.out.println("count=" + count + " sum=" + totalSum);
        } else {
             // 空の場合は出力しないか、または指定通り処理。仕様上「整数列」とあるので入力がある前提だが、安全のために空の場合の対応も考慮する。
             if (scanner2.hasNextLine()) System.out.println("count=0 sum=0");
        }

    }
}
