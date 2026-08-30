```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=0");
            return;
        }

        long count = 0;
        long max = Long.MIN_VALUE;
        
        // 引数として最初の最大値を定義する。整数の範囲が負の場合、初期値は最小値よりも小さい必要があるが
        // Java のlongではLong.MIN_VALUEを使う場合でも「-2^63」という値が入力されてもそれを更新しちゃうので、
        // "最初の要素まで待つ" あるいは "初項として第一つの有効な整数を代入する" で処理します。

        String[] parts = line.split(",");
        
        if (parts.length > 0) {
            boolean firstValueFound = false;
            
            for (String part : parts) {
                // カンマ区切りではなく空白も含まれる可能性、またはカンマ自体の余白を扱うため trim を行う。
                String trimmedPart = part.trim(); 
                
                try {
                    long n = Long.parseLong(trimmedPart);
                    
                    if (!firstValueFound) {
                        max = n; // 最初の要素を設定
                        count++;
                        firstValueFound = true;
                    } else {
                        if (n > max) {
                            max = n;
                        }
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視する。空文字や "abc" などを含む行はスキップされるはずだが、
                    // split("，") で区切る際は空白が含まれてくる可能性も考慮し、trim で対処済み。
                    continue;
                }
            }
        } else {
            max = 0;
        }

        System.out.println(count + " count=" + (count == 1 ? String.valueOf(max) : max)); // ここに訂正: コードのロジックを修正します。正しい出力形式を作るコードを作成してください
