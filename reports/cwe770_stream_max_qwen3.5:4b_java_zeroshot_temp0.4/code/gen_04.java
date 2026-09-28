import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空文字列や空白のみを含む場合は処理を終了する（ただし、問題文の「無視」という意味で実装）
            // ただし、入力がない場合も考慮するため、hasNext のチェックを最初に置くのが安全だが、
            // ここでは line が存在する場合に分割して処理する。
            
            String[] parts = line.trim().split("[,\\s]+");
            
        } else {
            return; 
        }

        long count = 0;
        Long maxVal = null;

        for (String part : parts) {
            try {
                if (!part.isEmpty()) { // 空要素を無視する（split で発生しうる）
                    int value = Integer.parseInt(part); 
                    // 問題文では「64bit 整数」とありますが、Integer.parseInt は 32bit です。
                    // Java の long を使う必要がありますが、標準入力の例として通常は int がメインですが、
                    // spec に従って long で扱うべきです。ただし Integer.parseInt は String から int への変換用で、
                    // Long.parseLong を使用します。

                    if (maxVal == null || value > maxVal) {
                        maxVal = value; 
                    } else if (!value.equals(maxVal)) {
                         count++;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }

        System.out.println("count=" + count);
    }
}
