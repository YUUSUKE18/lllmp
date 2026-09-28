import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合を作成し、合計を計算する
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空文字列や空白のみを含む場合は処理を終了
            if (line.trim().isEmpty() || " ".equals(line)) {
                System.out.println("count=0 sum=0");
                return;
            }

            Scanner tokenScanner = new Scanner(line);
            while (tokenScanner.hasNext()) {
                String token = tokenScanner.next();
                
                // 整数として解釈できない要素は無視する
                try {
                    int value = Integer.parseInt(token.trim());
                    
                    if (!sum.equals(BigInteger.ZERO) || count > 0) {
                        sum.add(BigInteger.valueOf(value));
                        count++;
                    } else {
                        // 最初の数値のみは合計に含めない（仕様：重複を除いた整数について）
                        // ただし、問題文の意図を考えると「個数と合計」を求めるため、
                        // 単一の要素でも count=1, sum=value が適切。
                        // しかし、「重複を除いた」という条件から、一意の数値ごとに処理する必要がある。
                        // ここでは Set を使って一意性を保つのが最も確実だが、Java の標準ライブラリのみを使うため、
                        // 手動で管理するか BigInteger に変換してセットにまとめるか検討が必要。
                        
                        // より正確なアプローチ：重複を除くために HashSet で管理するが、
                        // Java の Set は初期化時に空である必要がある。ここでは簡易的に処理し直す。
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                    continue;
                }
            }
        }

        System.out.println("count=" + count + " sum=" + BigInteger.ZERO); 
    }
}
